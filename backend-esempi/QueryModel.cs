namespace template_servizi.Query
{
    // il servizio Query Model rappresenta un modello di query che contiene una proprietà Query di tipo stringa, inizializzata come stringa vuota.
    // Questo modello può essere utilizzato per passare query o criteri di ricerca tra i componenti dell'applicazione.
    // La differenza con i servizi Models, che rappresentano entità o dati specifici, è che il Query Model si concentra sulla definizione di query o parametri di ricerca, mentre i Models rappresentano dati concreti e strutturati.

    // Per fare riferimento alle Stored Procedure, le Query fanno riferimento ai parametri della SP, mentre i Models agli attributi che vengono selezionati nella SP


    public class QueryModel
        
    {
        public string Query { get; set; } = string.Empty;

    }
}    