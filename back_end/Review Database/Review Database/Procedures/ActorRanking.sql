/*

Our fourth aggregating query is all about adding some extra spice to our webpage. 
We thought it would be cool to figure out which actors are consistently part of top-notch movies, and this info can serve a bunch of different purposes. 
If you're a movie buff, knowing that certain actors are tied to high-quality films might influence your choices. 
You might lean towards watching movies with these actors, expecting a stellar cinematic experience. 
For folks eyeing a career in acting or already in the film biz, understanding which actors consistently land roles in highly-rated movies could offer insights into building a successful career path. 
It might spark some choices in terms of roles, genres, or collaborations.
Now, if you're into the entertainment industry or considering investments, spotting actors with a history of being in successful films could guide your investment decisions. 
This could be super relevant for producers, talent agents, or investors hunting for opportunities in the film world. 
So, there are tons of reasons why knowing which actors or actresses consistently pop up in highly-rated films is pretty handy. 
This query dives into every single review for each movie and every actor in those movies, calculating the average review rating for all the movies an actor appears in. 
The actors are then ranked based on this, with the highest average securing the top spot. 
Just imagine if every movie Robert Pattinson stars in gets an average rating of ten – he'd be sitting at a cool 10 and taking the #1 actor spot in our system.

*/
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
