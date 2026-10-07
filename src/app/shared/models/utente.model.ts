// utente.model.ts
export interface UserSaveDTO {
  ID: number;
  username: string;
  email?: string | null;
  pw?: string | null; // Opzionale: se vuota o null, il backend non deve cambiarla
  ruolo?: string;
  profilePicUrl?: string | null;
}