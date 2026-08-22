// Come impostare un controller 

// Fase 1: importo le librerie necessarie
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using template_servizi.Common;
using template_servizi.DTO;
using template_servizi.Models;
using template_servizi.Query;
using template_servizi.Repository;

// Fase 2: definisco il namespace del controller

namespace template_servizi.Controllers
{
    // Fase 3: definisco il controller
    [ApiController]
    [Route("[controller]")]
    public class UtenteController : ControllerBase // creo una classe UtenteController che eredita da ControllerBase, che fornisce le funzionalità di base per gestire le richieste HTTP e restituire risposte.
    {
        // Fase 4: definisco le dipendenze del controller 
        private readonly IUtenteRepository _utenteRepo; // creo un campo privato _utenteRepo di tipo IUtenteRepository, che rappresenta il repository per accedere ai dati degli utenti.
        private readonly IConfiguration _configuration; // creo un campo privato _configuration di tipo IConfiguration, che rappresenta la configurazione dell'applicazione, utile per leggere le impostazioni come la stringa di connessione al database o le chiavi segrete per i token JWT.
        private readonly ILogger<UtenteController> _logger;

        // Fase 5: definisco il costruttore del controller
        public UtenteController(

            IUtenteRepository utenteRepo // ricevo il repository come parametro del costruttore, in modo da poterlo utilizzare per accedere ai dati degli utenti.
            , IConfiguration configuration // ricevo la configurazione come parametro del costruttore, in modo da poterla utilizzare per leggere le impostazioni dell'applicazione.
            , ILogger<UtenteController> logger // ricevo il logger come parametro del costruttore, in modo da poterlo utilizzare per registrare messaggi di log e tracciare eventuali errori o informazioni utili durante l'esecuzione del controller.
            )

        {
            _logger = logger;
            _utenteRepo = utenteRepo;
            _configuration = configuration;
        }

        

        // Fase 6: definisco le azioni del controller 
        [HttpPost] // definisco un'azione HTTP POST per creare un nuovo utente
        [Route("SalvaUtente")] // definisco la route  
        public async Task<IActionResult> SalvaUtente([FromBody] UtenteSaveModel model) // voglio creare utentesavemodel per salvare un nuovo utente 
        {
            try
            {
                // Validazione base dei dati in ingresso
                if (model == null || string.IsNullOrWhiteSpace(model.Username))
                {
                    return BadRequest(new { success = false, message = "Dati utente non validi" });
                }

                // Controllo se l'username esiste (permessi di update se è lo stesso ID)

                // 2. Controllo Unicità Username
                string username = model.Username.Trim();
                var utenteEsiste = _utenteRepo.OttieniPerUsername(username);

                if (utenteEsiste != null)
                {
                    // Se utenteEsiste.ID è DIVERSO dall'ID dell'utente in richiesta, 
                    // significa che l'username è già preso da un ALTRO utente.
                    if (model.ID <= 0 || utenteEsiste.ID != model.ID)
                    {
                        _logger.LogWarning("Tentativo username duplicato: ID Richiesta={ID}, ID Esistente DB={ID_DB}", model.ID, utenteEsiste.ID);
                        return Conflict(new { success = false, message = "Username già esistente" });
                    }
                }



                // GESTIONE HASH PASSWORD: 
                // Se la password è presente (es. nuova registrazione o cambio password), ne calcoliamo l'hash
                if (!string.IsNullOrWhiteSpace(model.Pw))
                {
                    model.Pw = Utility.Hash(model.Pw);
                }

                // Salva l'utente tramite il repository
                int? idUtente = _utenteRepo.Salva(model);

                if (idUtente == null || idUtente == 0)
                {
                    return StatusCode(500, new
                    {
                        success = false,
                        message = "Errore durante il salvataggio dell'utente"
                    });
                }


                return Ok(new
                {
                    success = true,
                    IDUtente = idUtente
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "SalvaUtente errore: {Message}", ex.Message);

                return StatusCode(500, new
                {
                    success = false,
                    message = ex.Message
                });
            }



        }

        // metodo per controllare se l'utente è Nascosto (1) o meno (0) con OttieniPerUsername, utile per la gestione della visibilità degli utenti nell'applicazione. Questo metodo restituisce un oggetto JSON con il risultato della verifica.
        // per il futuro se servirà
        //private CheckUtenteDTO CheckUtente(string? username)
        //{
        //    if (string.IsNullOrEmpty(username))
        //    {
        //        return new CheckUtenteDTO { Success = false, Message = "Token missing" };
        //    }

        //    // recupero l'utente tramite l'username 

        //    UtenteModel? User = _utenteRepo.OttieniPerUsername(username);

        //    if (User?.Nascosto == true)
        //    {
        //        return new CheckUtenteDTO { Success = false, Message = "Utente non trovato o cancellato" };
        //    }

        //    return new CheckUtenteDTO { Success = true, User = User};
        //}


        // ricerca utente
        [HttpGet] // definisco un'azione HTTP GET per ottenere un utente tramite l'username
        [Route("RicercaUtente")] // definisco la route per ottenere un utente tramite l'username
        public IActionResult RicercaUtente([FromQuery] UtenteQuery query)
        {
            try
            {
                var utenti = _utenteRepo.RicercaUtente(query);
                return Ok(new
                {
                    success = true,
                    data = utenti
                });

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "RicercaUtente errore: {Message}", ex.Message);
                return StatusCode(500, new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }



        // per implementazioni future, potrei aggiungere un metodo per cancellare un utente dal database, ma per ora lo lascio commentato.

        [HttpDelete]
        [Route("CancellaUtente/{ID}")]
        public Task<IActionResult> Cancella([FromRoute] int ID)
        {
            try
            {
                int? idCancellato = _utenteRepo.Cancella(ID);

                if (idCancellato == null || idCancellato == 0)
                {
                    var notFoundResponse = new
                    {
                        success = false,
                        message = "Utente non trovato o già cancellato"
                    };

                    return Task.FromResult<IActionResult>(
                        new JsonResult(notFoundResponse) { StatusCode = 404 });
                }


                var successResponse = new
                {
                    success = true,
                    IDUtente = idCancellato
                };

                return Task.FromResult<IActionResult>(
                    new JsonResult(successResponse) { StatusCode = 200 });

            }
            catch (Exception ex) // se non va a buon fine
            {
                _logger.LogError(ex, "CancellaUtente errore: {Message}", ex.Message);

                var errorResponse = new
                {
                    success = false,
                    message = ex.Message
                };

                return Task.FromResult<IActionResult>(
                    new JsonResult(errorResponse) { StatusCode = 500 });
            }

        }



    }

}

