-- Declare variables to store ProductTypeID for movies
DECLARE @VGProductTypeID INT;

-- Find the ProductTypeID for movies
SELECT @VGProductTypeID = ProductTypeID
FROM ReviewSystem.ProductType
WHERE [Name] = 'Video Game'; -- Adjust the condition based on the actual name of the product type for movies

-- Insert records into ReviewSystem.Movie table
INSERT INTO ReviewSystem.VideoGame(ProductID, ProductTypeID, DeveloperID)
SELECT
    P.ProductID,
    P.ProductTypeID,
    ABS(CHECKSUM(NEWID())) % 30 + 1 AS DeveloperID
FROM
    ReviewSystem.Product AS P
WHERE
    P.ProductTypeID = @VGProductTypeID;
