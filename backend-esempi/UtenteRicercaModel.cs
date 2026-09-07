namespace template_servizi.Models
{
    public class UtenteRicercaModel
    {
        public int ID { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Ruolo { get; set; } = "Admin"; // valore predefinito impostato su "Admin"
    }
}
