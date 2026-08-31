using Microsoft.OpenApi.MicrosoftExtensions;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace template_servizi.Models
{
    public class UtenteModel // questa classe rappresenta un utente nel sistema, con proprietà per ID, username, password, ruolo e altre informazioni correlate
                             // tenere conto che i nomi delle proprietà devono corrispondere ai nomi dei campi restituiti dalle stored procedure del database, altrimenti la mappatura non funzionerà correttamente.
                             
    {
        public int ID { get; set; }
        public string Username { get; set; } = string.Empty;

        //// email
        [EmailAddress(ErrorMessage = "Formato email non valido")] // EmailAddress è una classe che valida o meno il formato email
        public string? Email { get; set; }

        public string Pw { get; set; } = string.Empty;
        public string Ruolo { get; set; } = "Standard"; // valore predefinito impostato su "Admin"
        public string? ProfilePicUrl { get; set; }
        public int VersioneToken { get; set; } = 1;
        public bool Nascosto { get; set; } = false; // valore predefinito impostato su false, perché l'utente non è nascosto di default. Quando viene "cancellato", allora risulta true. In questo modo, l'utente non viene eliminato fisicamente dal database, ma viene semplicemente nascosto e non sarà più visibile nelle query di ricerca.

    }
}

