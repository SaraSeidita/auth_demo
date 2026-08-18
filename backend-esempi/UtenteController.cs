// Come impostare un controller 

// Fase 1: importo le librerie necessarie
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using template_servizi.Common;
using template_servizi.DTO;
using template_servizi.Models;
using template_servizi.Repository;

// Fase 2: definisco il namespace del controller

namespace template_servizi.Controllers
{
    // Fase 3: definisco il controller
    [ApiController]
    [Route("[controller]")]
    public class UtenteController : ControllerBase // creo una classe AuthController che eredita da ControllerBase, che fornisce le funzionalità di base per gestire le richieste HTTP e restituire risposte.
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
        public IActionResult SalvaUtente([FromBody] UtenteSaveModel model) // voglio creare utentesavemodel per salvare un nuovo utente 
        {
            try
            {
                // Validazione base dei dati in ingresso
                if (model == null || string.IsNullOrWhiteSpace(model.Username))
                {
                    return BadRequest(new { success = false, message = "Dati utente non validi" });
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


        // per implementazioni future, potrei aggiungere un metodo per cancellare un utente dal database, ma per ora lo lascio commentato.


    }

}

