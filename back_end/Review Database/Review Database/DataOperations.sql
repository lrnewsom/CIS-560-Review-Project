-- Adds a user
CREATE OR ALTER PROCEDURE AddUser
    @UserName NVARCHAR,
	@Password NVARCHAR,
	@Email NVARCHAR,
	@IsAdmin BIT
AS
BEGIN
    INSERT ReviewSystem.[User](UserName, [Password], Email, IsAdmin)
	VALUES
	(@UserName, @Password, @Email, @IsAdmin); 
END;
GO



-- Adds a Review
CREATE OR ALTER PROCEDURE AddReview
    @ProductID INT,
	@UserName NVARCHAR,
	@Rating INT,
	@Review NVARCHAR,
	@IsRecommended BIT
AS
BEGIN
    INSERT ReviewSystem.Review(Review, ProductID, UserID, Rating, IsRecommended, ReviewDate)
	SELECT @Review ,P.ProductID, U.UserID, @Rating, @IsRecommended, SYSDATETIME()
	FROM ReviewSystem.Review R
		INNER JOIN ReviewSystem.Product P ON P.ProductID = @ProductID 
		INNER JOIN ReviewSystem.[User] U ON U.UserName = @UserName
END;
GO



-- Create an Admin
CREATE OR ALTER PROCEDURE AddAdmin
    @UserName NVARCHAR
AS
BEGIN
	UPDATE U
	SET 
		IsAdmin = 'TRUE'
	FROM ReviewSystem.[User] U
	WHERE
		U.UserName = @UserName
END;
GO



--Add a book
CREATE OR ALTER PROCEDURE AddBook
    @PublisherName NVARCHAR,
	@ProductName NVARCHAR,
	@ReleaseDate DATETIME,
	@Description NVARCHAR
AS
BEGIN
	--Creates new publisher if unique
	INSERT ReviewSystem.Publisher(PublisherName)
	VALUES
	(@PublisherName)

	--Creates new product
	INSERT ReviewSystem.Product(ProductName,ProductTypeID,ReleaseDate,[Description])
	VALUES(@ProductName,1,@ReleaseDate,@Description)

	--Creates new book
	INSERT ReviewSystem.Book(ProductID,ProductTypeID,PublisherID)
	SELECT IDENT_CURRENT(N'ReviewSystem.Product'),1,P.PublisherID
	FROM ReviewSystem.Publisher P
	WHERE P.PublisherName = @PublisherName

END;
GO


--Add a VideoGame
CREATE OR ALTER PROCEDURE AddVideoGame
    @DevloperName NVARCHAR,
	@ProductName NVARCHAR,
	@ReleaseDate DATETIME,
	@Description NVARCHAR,
	@MainTag NVARCHAR
AS
BEGIN
	--Creates new developer if unique
	INSERT ReviewSystem.Developer(DeveloperName)
	VALUES
	(@DevloperName)

	--Creates new product
	INSERT ReviewSystem.Product(ProductName,ProductTypeID,ReleaseDate,[Description])
	VALUES(@ProductName,2,@ReleaseDate,@Description)

	--Creates new VideoGame
	INSERT ReviewSystem.VideoGame(ProductID,ProductTypeID,DeveloperID)
	SELECT IDENT_CURRENT(N'ReviewSystem.Product'),2,D.DeveloperID
	FROM ReviewSystem.Developer D
	WHERE D.DeveloperName = @DevloperName

	--Creates a new tag if new
	INSERT ReviewSystem.Tag(TagName)
	VALUES(@MainTag)

	--Attaches Main tag to gaame
	INSERT ReviewSystem.GameTag(ProductID,TagID)
	VALUES(IDENT_CURRENT(N'ReviewSystem.Product'),IDENT_CURRENT(N'ReviewSystem.Tag'))
END;
GO


--NEEDS TO RETURN A PRODUCTID
--Add a Movie
CREATE OR ALTER PROCEDURE AddMovie
    @DirectorName NVARCHAR,
	@ProductName NVARCHAR,
	@ReleaseDate DATETIME,
	@Description NVARCHAR,
	@LeadActor NVARCHAR,
	@GenreName NVARCHAR
AS
BEGIN
	--Creates new Director if unique
	INSERT ReviewSystem.Director(DirectorName)
	VALUES
	(@DirectorName)
	
	--Creates new Genre if unique
	INSERT ReviewSystem.Genre(GenreName)
	VALUES
	(@GenreName)

	--Creates new product
	INSERT ReviewSystem.Product(ProductName,ProductTypeID,ReleaseDate,[Description])
	SELECT @ProductName, PT.ProductTypeID ,@ReleaseDate,@Description
	FROM ReviewSystem.ProductType PT

	--Creates new Movie
	INSERT ReviewSystem.Movie(ProductID,ProductTypeID,DirectorID,GenreID)
	SELECT IDENT_CURRENT(N'ReviewSystem.Product'),PT.ProductTypeID,D.DirectorID, G.GenreID --HELP
	FROM ReviewSystem.Director D
		INNER JOIN ReviewSystem.Genre AS G ON G.GenreName = @GenreName
		INNER JOIN ReviewSystem.ProductType AS PT ON ProductTypeID = 3
	WHERE D.DirectorName = @DirectorName

	--adds new actor
	INSERT ReviewSystem.Actor(ActorName)
	VALUES(@LeadActor)

	--Attaches Main actor to movie
	INSERT ReviewSystem.ActorMovie(ProductID,ActorID)
	SELECT IDENT_CURRENT(N'ReviewSystem.Product'),A.ActorID
	FROM ReviewSystem.Actor A
	WHERE A.ActorName = @LeadActor

END;
GO



--Add an Actor to movie
CREATE OR ALTER PROCEDURE AddActor
	@MovieName NVARCHAR,
	@NewActorName NVARCHAR
AS
BEGIN

	--adds new actor
	INSERT ReviewSystem.Actor(ActorName)
	VALUES(@NewActorName)

	--Attaches Main actor to movie
	INSERT ReviewSystem.ActorMovie(ProductID,ActorID)
	SELECT P.ProductID, A.ActorID
	FROM ReviewSystem.Product P
		INNER JOIN ReviewSystem.Actor AS A ON A.ActorName = @NewActorName
	WHERE P.ProductName = @MovieName

END;
GO


--Write query to show all reviews a person has written