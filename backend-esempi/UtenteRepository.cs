using Microsoft.Data.SqlClient;
using System.Data;
using template_servizi.Common;
using template_servizi.DTO;
using template_servizi.Models;
using template_servizi.Query;
using template_servizi.Static;

namespace template_servizi.Repository
{
    public interface IUtenteRepository
    {
      
        public UtenteModel? OttieniPerUsername(string username);
        public UtenteModel? OttieniPerId(int idUtente);
        public UtenteModel? IncrementaVersioneToken(int idUtente);

        // nuovo metodo da implementare: la creazione o modifica dell'utente 
        int? Salva(UtenteSaveModel utente); // ritorna l'ID dell'utente salvato, o lo crea se non esiste, oppure lo aggiorna se esiste già. Se l'operazione fallisce, ritorna null.
        
        
        //int? Cancella(int ID); // per implementazione futura: ritorna l'ID dell'utente cancellato, oppure null se l'operazione fallisce.


    }


    public class UtenteRepository : IUtenteRepository
    {
        private readonly string? _conString;
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;

        public UtenteRepository(IConfiguration configuration)
        {
            _conString = configuration.GetConnectionString("ConnStr");
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

        //public int? Cancella(int ID)
        //{
        //    List<SqlParameter> paramList = new()
        //    {
        //        new SqlParameter("@ID", ID)
        //    };

        //    int? idCancellato = null;

        //    if (_conString != null)
        //    {
        //        idCancellato = SQLConnector.ExecuteScalarStoredProcedure<int>(
        //            "[dbo].[Videogioco_Cancella]", _conString, paramList);
        //    }

        //    return idCancellato;
        //}

    }

    // ora si passa a creare e implementare l'utente controller in un nuovo file UtenteController.cs, che sarà il controller per gestire le richieste relative agli utenti, come la creazione di un nuovo utente, l'ottenimento di un utente per username o id, e l'incremento della versione del token.


}

