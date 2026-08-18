using System.Text.Json.Serialization;

namespace template_servizi.Models
{
    public class UtenteModel // questa classe rappresenta un utente nel sistema, con proprietà per ID, username, password, ruolo e altre informazioni correlate
    {
        public int IDUtente { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Pw { get; set; } = string.Empty;
        public string Ruolo { get; set; } = "Admin"; // valore predefinito impostato su "Admin"
        public string? ProfilePicUrl { get; set; }
        public int VersioneToken { get; set; } = 1;

    }
}

