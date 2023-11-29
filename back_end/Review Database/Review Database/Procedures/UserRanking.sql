/*

Our third aggregating query, named "GetUserRanking," is pretty handy for diving into the user activity on our website.
This query takes a start date and an end date as parameters and dishes out the most active reviewers during that period.
How? We tally up all the reviews each user has written and then rank them based on who's written the most reviews. 
This not only helps us keep tabs on how our reviewers are growing and using the platform but also opens the door to spotting any funky business like spam bots or fake users.
Imagine this: if one user is cranking out reviews for a hundred or more products in a single day, that's a bit fishy, right?
While we're not using this query for that purpose right now, it could come in handy down the line for sniffing out suspicious activity.
For now, we're using it to highlight the reviewers who've been churning out the most reviews in a given week, month, or year.

*/
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
