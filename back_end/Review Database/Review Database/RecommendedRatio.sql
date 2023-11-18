CREATE PROCEDURE GetRecommendedRatio
    @ProductTypeID INT
AS
BEGIN
    WITH ProductReviewCounts AS (
        SELECT
            P.ProductID,
            P.ProductName,
            SUM(CASE WHEN R.IsRecommended = 1 THEN 1 ELSE 0 END) AS NumberRecommended,
            SUM(CASE WHEN R.IsRecommended = 0 THEN 1 ELSE 0 END) AS NumberNotRecommended
        FROM
            ReviewSystem.Product AS P
            LEFT JOIN ReviewSystem.Review AS R ON P.ProductID = R.ProductID
        WHERE
            P.ProductTypeID = @ProductTypeID
        GROUP BY
            P.ProductID, P.ProductName
    )

    SELECT
        P.ProductID,
        P.ProductName,
        P.NumberRecommended,
        P.NumberNotRecommended,
        CAST(P.NumberRecommended AS DECIMAL) / NULLIF(P.NumberNotRecommended, 0) AS RatioRecommended
    FROM
        ProductReviewCounts AS P;
END;
