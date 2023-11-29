DELETE FROM ReviewSystem.Book;

-- Declare variables to store ProductTypeID for movies
DECLARE @BookProductTypeID INT;

-- Find the ProductTypeID for movies
SELECT @BookProductTypeID = ProductTypeID
FROM ReviewSystem.ProductType
WHERE [Name] = 'Book'; -- Adjust the condition based on the actual name of the product type for movies

-- Insert records into ReviewSystem.Book table
INSERT INTO ReviewSystem.Book (ProductID, ProductTypeID, PublisherID)
SELECT
    P.ProductID,
    P.ProductTypeID,
	ABS(CHECKSUM(NEWID())) % 30 + 1 AS PublisherID
FROM
    ReviewSystem.Product AS P
WHERE
    P.ProductTypeID = @BookProductTypeID;
