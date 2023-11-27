CREATE PROCEDURE ReviewSystem.GetMediaRanking
    @ProductTypeID INT
AS
BEGIN
    WITH MediaAverageRating AS (
        SELECT
            P.ProductID,
            P.ProductName,
            AVG(R.Rating) AS AverageScore
        FROM
            ReviewSystem.Product AS P
            LEFT JOIN ReviewSystem.Review AS R ON P.ProductID = R.ProductID
        WHERE
            P.ProductTypeID = @ProductTypeID
        GROUP BY
            P.ProductID, P.ProductName
    )

    SELECT
        ProductID,
        ProductName,
        AverageScore,
        RANK() OVER (ORDER BY AverageScore DESC) AS ReviewRank
    FROM
        MediaAverageRating;
END;