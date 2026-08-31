using System.Text.Json.Serialization;

namespace template_servizi.Models
{
    public class UtenteSaveModel : UtenteModel // semplicemente, 
    {
        [JsonIgnore]
        public new bool Nascosto { get; set; } = false;
        [JsonIgnore]
        public string Ruolo { get; set; } = "Standard";
    }
}
