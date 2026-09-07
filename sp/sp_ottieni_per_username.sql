
CREATE OR ALTER   PROCEDURE [dbo].[usp_Utente_OttieniPerUsername]
    @Username VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        ID,
        Username,
        Pw AS Pw,              -- Mappiamo 'Pw' su 'Password'
        ProfilePicUrl AS ImageProfile,
        Ruolo,
        VersioneToken
    FROM 
        dbo.Utente
    WHERE 
        Username = @Username;
END;
