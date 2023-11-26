IF SCHEMA_ID(N'ReviewSystem') IS NULL
	EXEC(N'CREATE SCHEMA [ReviewSystem];');
GO

DROP TABLE IF EXISTS ReviewSystem.Review;
DROP TABLE IF EXISTS ReviewSystem.GameTag;
DROP TABLE IF EXISTS ReviewSystem.VideoGame;
DROP TABLE IF EXISTS ReviewSystem.Book;
DROP TABLE IF EXISTS ReviewSystem.ActorMovie;
DROP TABLE IF EXISTS ReviewSystem.Movie;
DROP TABLE IF EXISTS ReviewSystem.Product;
DROP TABLE IF EXISTS ReviewSystem.[User];
DROP TABLE IF EXISTS ReviewSystem.Actor;
DROP TABLE IF EXISTS ReviewSystem.Director;
DROP TABLE IF EXISTS ReviewSystem.Genre;
DROP TABLE IF EXISTS ReviewSystem.Tag;
DROP TABLE IF EXISTS ReviewSystem.Developer;
DROP TABLE IF EXISTS ReviewSystem.ProductType;
DROP TABLE IF EXISTS ReviewSystem.Publisher;

CREATE TABLE ReviewSystem.Publisher
(
	PublisherID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	PublisherName NVARCHAR(50) NOT NULL -- Should this be unique? Would we want to allow multiple publishers to have the same name?
)

CREATE TABLE ReviewSystem.ProductType
(
	ProductTypeID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[Name] NVARCHAR(20) NOT NULL UNIQUE
)

CREATE TABLE ReviewSystem.Developer
(
	DeveloperID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	DeveloperName NVARCHAR(50) NOT NULL -- Should this also be unique?
)

CREATE TABLE ReviewSystem.Tag
(
	TagID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	TagName NVARCHAR(50) NOT NULL -- Should this be unique?
)

CREATE TABLE ReviewSystem.Genre
(
	GenreID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	GenreName NVARCHAR(50) NOT NULL -- Should this be unique?
)

CREATE TABLE ReviewSystem.Director
(
	DirectorID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	DirectorName NVARCHAR(50) NOT NULL -- Should this be unique?
)

CREATE TABLE ReviewSystem.Actor
(
	ActorID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ActorName NVARCHAR(50) NOT NULL -- Should this be unique?
)

CREATE TABLE ReviewSystem.[User]
(
	UserID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	Email NVARCHAR(50) NOT NULL, -- Should this be unique? Would we want unique combos of userid and email, or just unique emails? Should one user be able to make multiple accounts with one email?
	UserName NVARCHAR(30) NOT NULL, -- This also should be unique? Thinking about other systems, only one user can have a username, so the usernames would be unique.
	[Password] NVARCHAR(50) NOT NULL,
	IsAdmin BIT NOT NULL,

	UNIQUE( UserID, UserName ),
	UNIQUE( UserID, Email )
)

CREATE TABLE ReviewSystem.Product
(
	ProductID INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	ProductName NVARCHAR(100) NOT NULL,
	ProductTypeID INT NOT NULL,
	ReleaseDate DATETIME NOT NULL,
	[Description] NVARCHAR(2500) NULL, -- Should this be nullable or not?

	UNIQUE( ProductID, ProductTypeID ),
	UNIQUE( ProductName, ProductTypeID ),

	CONSTRAINT [FK_ReviewSystem_Product_ReviewSystem_ProductType] FOREIGN KEY(ProductTypeID)
	REFERENCES ReviewSystem.ProductType(ProductTypeID)
)

CREATE TABLE ReviewSystem.Movie
(
	ProductID INT NOT NULL PRIMARY KEY,
	ProductTypeID INT NOT NULL,
	GenreID INT NOT NULL,
	DirectorID INT NOT NULL,

	CONSTRAINT [FK_ReviewSystem_Movie_ReviewSystem_Product] FOREIGN KEY(ProductID)
	REFERENCES ReviewSystem.Product(ProductID),

	CONSTRAINT [FK_ReviewSystem_Movie_ReviewSystem_ProductType] FOREIGN KEY(ProductTypeID)
	REFERENCES ReviewSystem.ProductType(ProductTypeID),

	CONSTRAINT [FK_ReviewSystem_Movie_ReviewSystem_Genre] FOREIGN KEY(GenreID)
	REFERENCES ReviewSystem.Genre(GenreID),

	CONSTRAINT [FK_ReviewSystem_Movie_ReviewSystem_Director] FOREIGN KEY(DirectorID)
	REFERENCES ReviewSystem.Director(DirectorID)
)

CREATE TABLE ReviewSystem.ActorMovie
(
	ProductID INT NOT NULL,
	ActorID INT NOT NULL,

	PRIMARY KEY ( ProductID, ActorID ),

	CONSTRAINT [FK_ReviewSystem_ActorMovie_ReviewSystem_Movie] FOREIGN KEY(ProductID) 
	REFERENCES ReviewSystem.Movie(ProductID),

	CONSTRAINT [FK_ReviewSystem_ActorMovie_ReviewSystem_Actor] FOREIGN KEY(ActorID)
	REFERENCES ReviewSystem.Actor(ActorID)
)

CREATE TABLE ReviewSystem.Book
(
	ProductID INT NOT NULL PRIMARY KEY,
	ProductTypeID INT NOT NULL, -- do we need this? Would not all books be the same product type.
	PublisherID INT NOT NULL,

	CONSTRAINT [FK_ReviewSystem_Book_ReviewSystem_Product] FOREIGN KEY(ProductID, ProductTypeID)
	REFERENCES ReviewSystem.Product(ProductID, ProductTypeID),
	
	CONSTRAINT [FK_ReviewSystem_Book_ReviewSystem_Publisher] FOREIGN KEY(PublisherID)
	REFERENCES ReviewSystem.Publisher(PublisherID)
)

CREATE TABLE ReviewSystem.VideoGame
(
	ProductID INT NOT NULL PRIMARY KEY,
	ProductTypeID INT NOT NULL,
	DeveloperID INT NOT NULL,

	CONSTRAINT [FK_ReviewSystem_VideoGame_ReviewSystem_Product] FOREIGN KEY(ProductID, ProductTypeID)
	REFERENCES ReviewSystem.Product(ProductID, ProductTypeID),
	
	CONSTRAINT [FK_ReviewSystem_VideoGame_ReviewSystem_Developer] FOREIGN KEY(DeveloperID)
	REFERENCES ReviewSystem.Developer(DeveloperID)
)

CREATE TABLE ReviewSystem.GameTag
(
	ProductID INT NOT NULL,
	TagID INT NOT NULL,

	PRIMARY KEY ( ProductID, TagID ),

	CONSTRAINT [FK_ReviewSystem_GameTag_ReviewSystem_VideoGame] FOREIGN KEY(ProductID)
	REFERENCES ReviewSystem.VideoGame(ProductID),

	CONSTRAINT [FK_ReviewSystem_GameTag_ReviewSystem_Tag] FOREIGN KEY(TagID)
	REFERENCES ReviewSystem.Tag(TagID)
)

CREATE TABLE ReviewSystem.Review
(
	ReviewID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ProductID INT NOT NULL,
	UserID INT NOT NULL,
	Rating INT NOT NULL,
	Review NVARCHAR(2500) NOT NULL,
	IsRecommended BIT NOT NULL,
	ReviewDate DATETIME NOT NULL,

	UNIQUE ( ProductID, UserId ),

	CONSTRAINT [FK_ReviewSystem_Review_ReviewSystem_Product] FOREIGN KEY(ProductID)
	REFERENCES ReviewSystem.Product(ProductID),
	
	CONSTRAINT [FK_ReviewSystem_Review_ReviewSystem_User] FOREIGN KEY(UserID)
	REFERENCES ReviewSystem.[User](UserID)
)