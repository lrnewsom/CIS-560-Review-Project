/*

Our first aggregating query is called "GetRecommendedRatio." 
This one looks at all the entries for a specific type of product, which we get through a parameter. 
It gives back the ratio of recommended to not recommended for all the products of that type. 
Along with that, we get some extra info like product ID, name, the count of recommended and not recommended, and the recommended ratio. 
This helps give a sense of what people generally think about a product.
For example, let's say a product has 10 reviews in total, with 8 thumbs up and 2 thumbs down. 
With our method, the ratio would be 4, showing that people are mostly liking the product. 
Our way of doing it is cool because it gives props to products that have a lot more thumbs up than thumbs down. 
If we went with just recommended reviews divided by total reviews, a product with only one review (and that one being positive) would score a 100% recommended ratio. 
But with our approach, it would be a more reasonable 1, reflecting that single positive review against the total reviews.

*/
CREATE PROCEDURE ReviewSystem.GetRecommendedRatio
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
