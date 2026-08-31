USE [auth_demo]
GO

/****** Oggetto: Table [dbo].[utente]    Data dello script 31/08/2026 13:54:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[utente](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NULL,
	[Pw] [nvarchar](255) NULL,
	[ProfilePicUrl] [nvarchar](500) NULL,
	[Ruolo] [varchar](20) NOT NULL,
	[VersioneToken] [int] NOT NULL,
	[Nascosto] [bit] NOT NULL,
	[Email] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [username_unico] UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[utente] ADD  DEFAULT ('Admin') FOR [Ruolo]
GO

ALTER TABLE [dbo].[utente] ADD  DEFAULT ((1)) FOR [VersioneToken]
GO

ALTER TABLE [dbo].[utente] ADD  DEFAULT ((0)) FOR [Nascosto]
GO


