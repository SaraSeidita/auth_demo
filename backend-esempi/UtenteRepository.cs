using Microsoft.Data.SqlClient;
using System.Data;
using template_servizi.Common;
using template_servizi.DTO;
using template_servizi.Models;
using template_servizi.Query;
using template_servizi.Static;


// A differenza dell'auth repository e controller (che gestisce l'autenticazione, generazione e decodifica dei token), l'utente repository e controller gestiscono le operazioni CRUD (Create, Read, Update, Delete) sugli utenti nel database.
namespace template_servizi.Repository
{
    public interface IUtenteRepository // l'interfaccia IUtenteRepository definisce i metodi per accedere e manipolare i dati degli utenti nel database, come ottenere un utente per username o ID, incrementare la versione del token e salvare un utente (creazione o modifica).
    {
      
        public UtenteModel? OttieniPerUsername(string username);
        public UtenteModel? OttieniPerId(int idUtente);
        public UtenteModel? IncrementaVersioneToken(int idUtente);

        List<UtenteRicercaModel> RicercaUtente(UtenteQuery query); // ritorna un utente in base ai criteri di ricerca specificati nella query, oppure null se non viene trovato nessun utente corrispondente.

        // nuovo metodo da implementare: la creazione o modifica dell'utente 
        int? Salva(UtenteSaveModel utente); // ritorna l'ID dell'utente salvato, o lo crea se non esiste, oppure lo aggiorna se esiste già. Se l'operazione fallisce, ritorna null.

        int? Cancella(int ID); // se l'utente viene cancellato, ritorna l'ID dell'utente cancellato, altrimenti ritorna null.

        // ricerca utente
        


    }


    public class UtenteRepository : IUtenteRepository // mentre la classe implementa i metodi definiti nell'interfaccia, utilizzando SQLConnector per eseguire stored procedure nel database e restituire i risultati come oggetti UtenteModel o ID dell'utente salvato.
    {
        private readonly string? _conString;
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;

        public UtenteRepository(IConfiguration configuration)
        {
            _conString = configuration.GetConnectionString("ConnStr");
        }



        // ricerca utente 

        public List<UtenteRicercaModel> RicercaUtente(UtenteQuery query)
        {
            if (string.IsNullOrEmpty(_conString)) return new List<UtenteRicercaModel>();

            var paramList = new List<SqlParameter>
        {
            new SqlParameter("@Query", (object?)query.Query ?? DBNull.Value)
        };

                return SQLConnector.GetListFromStoredProcedure<UtenteRicercaModel>(
                    "[dbo].[Utente_Ricerca]",
                    _conString,
                    paramList
                );
        }

        public UtenteModel? OttieniPerUsername(string username)
        {
            if (_conString == null) return null;

            var paramList = new List<SqlParameter>
            {
                new SqlParameter("@Username", username)
            };

            return SQLConnector.GetDetailFromStoredProcedure<UtenteModel>(
                "[dbo].[usp_Utente_OttieniPerUsername]",
                _conString,
                paramList
            );
        }

        public UtenteModel? OttieniPerId(int idUtente)
        {
            if (_conString == null) return null;

            var paramList = new List<SqlParameter>
            {
                new SqlParameter("@IDUtente", idUtente)
            };

            return SQLConnector.GetDetailFromStoredProcedure<UtenteModel>(
                        
                "[dbo].[usp_Utente_OttieniPerId]",
                _conString,
                paramList
            );
        }

        public UtenteModel? IncrementaVersioneToken(int idUtente)
        {
            if (_conString == null) return null;

            var paramList = new List<SqlParameter>
            {
                new SqlParameter("@IDUtente", idUtente)
            };

            return SQLConnector.GetDetailFromStoredProcedure<UtenteModel>(
                
                "[dbo].[usp_Token_Incrementa_Versione]",
                _conString,
                paramList
            );
        }


        // qua implemento il metodo per creare un nuovo utente nel database
        public int? Salva(UtenteSaveModel utente)
        {
            List<SqlParameter> paramList = Utility.CreateParamsFromObj(utente);
            int? idRisultato = null;

            if (_conString != null)
            {
                var result = SQLConnector.ExecuteScalarStoredProcedure<object>(
                "[dbo].[Utente_Crea_Modifica]", _conString, paramList);

                if (result != null && result != DBNull.Value)
                {
                    // Convert.ToInt32 è magico: trasforma Decimal, Double o stringhe in int senza lamentarsi
                    idRisultato = Convert.ToInt32(result);
                }
            }

            return idRisultato;


        }

        // per implementazioni future, potrei aggiungere un metodo per cancellare un utente dal database, ma per ora lo lascio commentato.
        // gestisco la cancellazione di un utente dal database

        public int? Cancella(int ID)
        {
            List<SqlParameter> paramList = new()
            {
                new SqlParameter("@ID", ID)
            };

            int? idCancellato = null;

            if (_conString != null)
            {
                idCancellato = SQLConnector.ExecuteScalarStoredProcedure<int>(
                    "[dbo].[Utente_cancella]", _conString, paramList);
            }

            return idCancellato;
        }

    }

     

}

