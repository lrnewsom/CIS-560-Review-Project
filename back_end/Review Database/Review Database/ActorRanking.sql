CREATE PROCEDURE ReviewSystem.GetActorRanking
AS
BEGIN
    WITH ActorAverageRating AS (
        SELECT
            AM.ActorID,
            A.ActorName,
            AVG(R.Rating) AS AverageMovieRating
        FROM
            ReviewSystem.ActorMovie AS AM
			JOIN ReviewSystem.Actor AS A ON AM.ActorID = A.ActorID
            JOIN ReviewSystem.Movie AS M ON AM.ProductID = M.ProductID
            JOIN ReviewSystem.Review AS R ON M.ProductID = R.ProductID
        GROUP BY
            AM.ActorID, A.ActorName
    )

    SELECT
        ActorID,
        ActorName,
        AverageMovieRating,
        RANK() OVER (ORDER BY AverageMovieRating DESC) AS ActorRank
    FROM
        ActorAverageRating;
END;
