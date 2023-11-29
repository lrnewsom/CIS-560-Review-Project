/*

Our second aggregating query is known as "GetMediaRanking."
This one looks at all the entries for a specific product type and sorts them based on their average review score.
The idea is to give a boost to products with higher average scores – like a product with an average of 10 gets the top spot, and one with an average of 0 comes in last.
This helps us figure out which products reviewers really dig.
We can then showcase the top products of each type on the front page, making it easier for users checking out our website.
Along with the ranking, this query also dishes out the average score, plus the product name and ID.
What makes this query different from the first one is that here, the review score can be any number between zero and ten, unlike the first query where it's a simple "yes" or "no" for recommended.
And here's the kicker – sometimes a reviewer might give a product a high score but not necessarily recommend it, or the other way around.
So, it adds a bit more nuance to how we understand what users think about a product.

*/
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