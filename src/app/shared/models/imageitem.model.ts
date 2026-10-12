// modello generico per rappresentare un oggetto immagine con percorso e attributo alt
// utile perché posso utilizzarlo sia per le icone, sia per le immagini di sfondo, sia altri tipi di file image

export interface ImageItem {
    src: string;
    alt: string;
}