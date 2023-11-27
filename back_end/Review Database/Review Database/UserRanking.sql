CREATE PROCEDURE ReviewSystem.GetUserRanking
    @FirstDate DATETIME,
    @LastDate DATETIME
AS
BEGIN
    WITH UserReviewCounts AS (
        SELECT
            U.UserID,
            U.UserName,
            COUNT(R.ReviewID) AS NumberReviews
        FROM
            ReviewSystem.[User] AS U
            LEFT JOIN ReviewSystem.Review AS R ON U.UserID = R.UserID
        WHERE
            R.ReviewDate >= @FirstDate AND R.ReviewDate <= @LastDate
        GROUP BY
            U.UserID, U.UserName
    )

    SELECT
        UserID,
        UserName,
        NumberReviews,
        RANK() OVER (ORDER BY NumberReviews DESC) AS ReviewerRank
    FROM
        UserReviewCounts;
END;
