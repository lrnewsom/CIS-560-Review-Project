CREATE OR ALTER PROCEDURE GetProductReviews
    @ProductID INT
AS
BEGIN
    SELECT
        U.UserName AS Reviewer, 
        R.Rating,
		R.Review,
		R.IsRecommended,
		R.ReviewDate
    FROM
        ReviewSystem.Review R
		INNER JOIN ReviewSystem.Product AS P ON P.ProductID = R.ProductID
		INNER JOIN ReviewSystem.[User] AS U ON U.UserID = R.UserID
	WHERE
		P.ProductID = @ProductID
END;
GO



CREATE OR ALTER PROCEDURE GetProductsByType
    @ProductType INT
AS
BEGIN
    SELECT
        P.ProductID AS Reviewer, 
        P.ProductName,
		P.[Description],
		P.ReleaseDate,
		CASE
			WHEN @ProductType = 1 THEN Pub.PublisherName
			WHEN @ProductType = 2 THEN Dev.DeveloperName
			WHEN @ProductType = 3 THEN Dir.DirectorName
		END AS Creator
    FROM
        ReviewSystem.Product P
		INNER JOIN ReviewSystem.Book AS B ON B.ProductID = P.ProductID
		INNER JOIN ReviewSystem.Publisher AS Pub ON Pub.PublisherID = B.PublisherID
		INNER JOIN ReviewSystem.Movie AS M ON M.ProductID = P.ProductID
		INNER JOIN ReviewSystem.Director AS Dir ON Dir.DirectorID = M.DirectorID
		INNER JOIN ReviewSystem.VideoGame AS V ON V.ProductID = P.ProductID
		INNER JOIN ReviewSystem.Developer AS Dev ON Dev.DeveloperID = V.DeveloperID
	WHERE P.ProductTypeID = @ProductType
END;