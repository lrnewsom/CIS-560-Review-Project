SELECT *
FROM ReviewSystem.[User];

SELECT *
FROM ReviewSystem.Product AS P
WHERE P.ProductName = 'Logan';

SELECT *
FROM ReviewSystem.Genre;

SELECT *
FROM ReviewSystem.Actor;

SELECT *
FROM ReviewSystem.Movie;

SELECT *
FROM ReviewSystem.Director;

SELECT *
FROM ReviewSystem.ActorMovie;

SELECT *
FROM ReviewSystem.Developer;

SELECT *
FROM ReviewSystem.VideoGame;

SELECT *
FROM ReviewSystem.GameTag;

SELECT *
FROM ReviewSystem.ProductType;

SELECT *
FROM ReviewSystem.Publisher;

SELECT *
FROM ReviewSystem.Book;

SELECT ProductID
FROM ReviewSystem.Product;

SELECT UserID
FROM ReviewSystem.[User];

SELECT *
FROM ReviewSystem.Review;



-- Testing Actor Ranking Query
EXEC ReviewSystem.GetActorRanking;

-- Testing Recommended Ration Query, this gets it for certain types
EXEC ReviewSystem.GetRecommendedRatio @ProductTypeID = 1;
EXEC ReviewSystem.GetRecommendedRatio @ProductTypeID = 2;
EXEC ReviewSystem.GetRecommendedRatio @ProductTypeID = 3;

-- Testing Product Type Ranking Query
EXEC ReviewSystem.GetMediaRanking @ProductTypeID = 1;
EXEC ReviewSystem.GetMediaRanking @ProductTypeID = 2;
EXEC ReviewSystem.GetMediaRanking @ProductTypeID = 3;

-- Testing the user ranking by date query
EXEC ReviewSystem.GetUserRanking @FirstDate = '2023-01-01', @LastDate = '2023-12-31';
