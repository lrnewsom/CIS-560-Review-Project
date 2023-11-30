The root folder is split up into a front end and back end folder.

FRONT END
	
	SRC
	-App.css: aligns text to center
	-App.js: Creates web page
	-App.js: Test for app
	-CommonStyling.css: Sets style for the webpage
	-index.css: Additional styling
	-index.js: Sets up react for webpage interaction

BACK END 

	JS
	-Index.js: Contains the connection code for quering the database and calling stored procedures using node.js

	REVIEW DATABASE (Contains SQL and backend setup and stored procedures. There are two copies of all sql files both are the same).

		DATA
		-generate_(TableName).sql: Generates data for tables (See readme in folder for load order)
		
		PROCEDURES
		-ActorRanking.sql: One of the aggregating queries for ranking actors
		-DataOperations.sql: Contains all data operations for tables
		-Non-AggregatingQueries: Contains all non trivial non aggregating queries
		-ProductTypeRanking: One of the aggregating queries for ranking product type
		-RecommendedRatio: One of the aggregating queries for ranking product type
		-UserRanking: One of the aggregating queries for ranking product type

		TABLES
		-Tables.sql: The file that contains setup of schema and tables (Run first then run generate_... files)
