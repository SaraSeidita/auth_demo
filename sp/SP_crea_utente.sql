CREATE OR ALTER PROCEDURE [dbo].[Utente_Crea_Modifica]
	@IDUtente INT = NULL, 
	@Username NVARCHAR(50) = NULL,
	@Pw VARCHAR(255) = NULL, 
	@ProfilePicUrl VARCHAR(500) = NULL,
	@Ruolo VARCHAR(20) = NULL,
	@VersioneToken INT = NULL
AS 
BEGIN 
	SET NOCOUNT ON; 

	-- Verifico se l'utente esiste già
	IF @IDUtente IS NOT NULL 
	BEGIN 
		SELECT @IDUtente = [ID]
		FROM [dbo].[utente] 
		WHERE [ID] = @IDUtente
	END
	ELSE 
	BEGIN
		SELECT @IDUtente = [ID]
		FROM [dbo].[utente] 
		WHERE [Username] = @Username
	END

	-- Creo l'utente se non esiste 
	IF @IDUtente IS NULL 
	BEGIN 
		INSERT INTO [dbo].[utente] 
		(
			[Username], 
			[Pw], 
			[ProfilePicUrl], 
			[Ruolo], 
			[VersioneToken]
		)
		VALUES 
		(
			@Username,
			@Pw, 
			@ProfilePicUrl,
			@Ruolo,
			@VersioneToken
		);

		SET @IDUtente = SCOPE_IDENTITY();
	END
	ELSE 
	BEGIN 
		UPDATE u 
		SET 
			u.[Username]       = ISNULL(@Username, u.[Username]),
			u.[Pw]             = ISNULL(@Pw, u.[Pw]), 
			u.[ProfilePicUrl]  = ISNULL(@ProfilePicUrl, u.[ProfilePicUrl]), 
			u.[Ruolo]          = ISNULL(@Ruolo, u.[Ruolo])  
		FROM [dbo].[utente] AS u
		WHERE u.[ID] = @IDUtente;
	END

	-- Output  
	SELECT @IDUtente AS [IDUtente];
END
GO