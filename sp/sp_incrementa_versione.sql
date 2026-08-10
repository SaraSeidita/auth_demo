CREATE OR ALTER PROCEDURE [dbo].[usp_Token_Incrementa_Versione]

	@IDUtente INT 

AS

BEGIN 

	UPDATE dbo.utente
	SET VersioneToken = VersioneToken + 1 
	FROM dbo.utente
	WHERE ID = @IDUtente 

	SELECT * 
	FROM dbo.utente
	WHERE ID = @IDUtente 


END