DELETE FROM ReviewSystem.Movie;

-- Declare variables to store ProductTypeID for movies
DECLARE @MovieProductTypeID INT;

-- Find the ProductTypeID for movies
SELECT @MovieProductTypeID = ProductTypeID
FROM ReviewSystem.ProductType
WHERE [Name] = 'Movie'; -- Adjust the condition based on the actual name of the product type for movies

-- Insert records into ReviewSystem.Movie table
INSERT INTO ReviewSystem.Movie (ProductID, ProductTypeID, GenreID, DirectorID)
SELECT
    P.ProductID,
    P.ProductTypeID,
	ABS(CHECKSUM(NEWID())) % 16 + 1 AS GenreID, -- Adjust the range (1 to 16 in this case)
    ABS(CHECKSUM(NEWID())) % 30 + 1 AS DirectorID
FROM
    ReviewSystem.Product AS P
WHERE
    P.ProductTypeID = @MovieProductTypeID;
