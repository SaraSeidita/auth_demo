CREATE DATABASE auth_demo;

USE auth_demo


CREATE TABLE utente (
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NULL,
	[Pw] [nvarchar](255) NULL,
	[ProfilePicUrl] [nvarchar](500) NULL,
	[Ruolo] [varchar](20) NOT NULL,
	[VersioneToken] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Utente] ADD  DEFAULT ('Admin') FOR [Ruolo]
GO

ALTER TABLE [dbo].[Utente] ADD  DEFAULT ((1)) FOR [VersioneToken]
GO
