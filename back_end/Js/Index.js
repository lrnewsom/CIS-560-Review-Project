const mysql = require('mysql');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());



app.listen(3001, ()=>
{
    console.log(`server is running at port 3001`);
})


//********************************************************************
//connects to mysql database
var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "mF5YLFTe!6V8ruE",
        database: "ReviewSystem"
    });


//********************************************************************
//shows connection status 
// connects to the database
con.connect(function(err)
{
    if (err) console.log(err);
    else console.log('connected')
});




//********************************************************************
// get user from database
app.get('/getuserdata', (req, res)=>{
    const responseData = {
        message: 'Hello i got your data',
        data: 'good'
    };

    // send json response
    res.json(responseData);
})



//********************************************************************
// update the user status in the database
app.get('/changeuserstatus', (req, res)=>{
    const userID = req.body.userID;
    // send json response
    res.send('got it');
})



//********************************************************************
// add new user to the database
app.post('/adduser', (req, res) => {
    const { userName, password, email, isAdmin } = req.body;
    console.log(req.body);
    const addUserProcedure = 'CALL AddUser(?, ?, ?, ?)';
    con.query(addUserProcedure, [userName, password, email, isAdmin], (err, result) => {
        if (err) {
            res.send('failed');
        } else {
            res.send('added');
        }
    });
});



//********************************************************************
// the req body will have data concernining the type of product it wants to fetch
// if it is  movie, video game or book
app.get('/getproducts', (req, res)=>{
    res.send('got new products')
})


//********************************************************************
// add new product to the database
// it can be movie, video game or a book
app.post('/addnewproduct', (req, res)=>{
    res.send('product added')
})


//********************************************************************
// add new product to the database
// it can be movie, video game or a book
app.get('/deleteproduct', (req, res)=>{
    res.send('product deleted')
})


//********************************************************************
// gets all the directors from the database
app.get('/getdirectors', (req, res)=>{
    var getDirectorsQuery = "SELECT * From ReviewSystem.Director;";
    con.query(getDirectorsQuery, (err, result)=>{
        if(err){res.send('failed')}
        else{
            res.json(result);
        }
    })
})


//********************************************************************
// gets all the directors from the database
app.get('/getgenre', (req, res)=>{
    var getGenreQuery = "SELECT * From ReviewSystem.Genre;";
    con.query(getGenreQuery, (err, result)=>{
        if(err){res.send('failed')}
        else{
            res.json(result);
        }
    })
})




// gets all the publsihers from the database
app.get('/getpublisher', (req, res)=>{
    var getPublisherQuery = "SELECT * From ReviewSystem.Publisher;";
    con.query(getPublisherQuery, (err, result)=>{
        if(err){res.send('failed')}
        else{
            res.json(result);
        }
    })
})



// gets all the publsihers from the database
app.get('/gettags', (req, res)=>{
    var getTagsQuery = "SELECT * From ReviewSystem.Tag;";
    con.query(getTagsQuery, (err, result)=>{
        if(err){res.send('failed')}
        else{
            res.json(result);
        }
    })
})




//********************************************************************
// delete user from database
app.delete('/deleteuser/:userID', (req, res)=>{
    const userID = parseInt(req.params.userID);
    res.send('deleted'); // is deleted
})



//********************************************************************
// gets all users from the database
app.get('/getallusers', (req, res)=>{
    var getAllUsers = "SELECT * From ReviewSystem.User;";
    con.query(getAllUsers, (err, result)=>{
        if(err){res.send('failed');}
        else{
            res.json(result);
        }
    })
})



//********************************************************************
// fetches all the article from the database and sends it
app.post('/getAllProducts', (req, res)=>{
    var data = con.query(`SELECT * FROM Product;`);
    console.log(req.body.data);
    console.log(data);
    res.send('recived');
})

// image={lightRating}
// name={'cyberpunk 2077 future edition'}
// rank={'1'}
// rating={'8.6/10'}
// discription={'If you want to capitalize the entire text of an element in Bootstrap, you can use the text-uppercase class. This class sets the text-transform property to uppercase, making all the text in the element appear in uppercase letters.'}
// gener={'Action game'}
// trailer={'this trailer'}
// userRating={'10/10'}

// to send movie data to the database
app.get('/getmovies', (req, res)=>{
    const getMoviesQuery = "SELECT * From ReviewSystem.Product Where ProductTypeID = 1 LIMIT 10;";
    con.query(getMoviesQuery, (err, result)=>{
        if(err){res.send('failed');}
        else{
            res.json(result);
        }
    })
})



// to send game data to the database
app.get('/getgames', (req, res)=>{
    const getGamesQuery = "SELECT * From ReviewSystem.Product Where ProductTypeID = 2 LIMIT 10;";
    con.query(getGamesQuery, (err, result)=>{
        if(err){res.send('failed');}
        else{
            res.json(result);
        }
    })
})



// get books
app.get('/getbooks', (req, res)=>{
    const getBooksQuery = "SELECT * From ReviewSystem.Product Where ProductTypeID = 3 LIMIT 10;";
    con.query(getBooksQuery, (err, result)=>{
        if(err){res.send('failed');}
        else{
            res.json(result);
        }
    })
})

//SELECT * FROM ReviewSystem.User WHERE Email = 'biruk1@ksu.edu' and Password = 'password';
// login to as a user
app.post('/login', (req, res) => {
    const { email, password} = req.body;
    const loginQuery = `SELECT * FROM ReviewSystem.User WHERE Email = '${email}' and Password = '${password}';`;
    con.query(loginQuery, (err, result) => {
        if (err) {
            res.send('failed');
            console.log('failed to login');
        } else {
            if(result.length === 0){
                res.send('failed');
            }else{
                res.json(result);   
            }
            
        }
    });
});


// get all reviwes from the database
// API endpoint to get product reviews
// API endpoint to get product reviews using POST
app.post('/getreviwes', (req, res) => {
    const productID = req.body.productID;

    // Call the stored procedure
    con.query('CALL GetProductReviews(?)', [productID], (err, result) => {
        if (err) {
            console.error("Error executing stored procedure:", err);
            res.send('failed');
        } else {
            // Extract the result from the stored procedure
            const reviews = result[0];

            // Send the reviews as JSON response
            res.json(reviews);
        }
    });
});




// add review to the database
app.post('/addreview', (req, res) => {
    const { ProductID, UserName, Rating, Review, IsRecommended } = req.body;
    // Assuming you have a stored procedure named AddReview
    const addReviewProcedure = 'CALL AddReview(?, ?, ?, ?, ?)';
  
    con.query(
      addReviewProcedure,
      [ProductID, UserName, Rating, Review, IsRecommended],
      (err, results) => {
        if (err) {
          console.error('Error executing AddReview procedure: ', err);
          res.send('failed');
          return;
        }
        else{
            res.send('added');
        }
      }
    );
  });



//SELECT * From ReviewSystem.Review where UserID = 14;
//SELECT * FROM ReviewSystem.User WHERE Email = 'biruk1@ksu.edu' and Password = 'password';
// login to as a user
app.post('/getuserreviewbyid', (req, res) => {
    const { UserID} = req.body;
    const Query = `SELECT * FROM ReviewSystem.Review WHERE UserID = '${UserID}';`;
    con.query(Query, (err, result) => {
        if (err) {
            res.send('failed');
            console.log('failed to login');
        } else {
            if(result.length === 0){
                res.send('failed');
            }else{
                res.json(result);   
            }
            
        }
    });
});



//Delete From ReviewSystem.Review where ReviewID = 3;
// delete a review from the data base based on the ReviewID;
app.post('/deletereview', (req, res) => {
    const { ReviewID} = req.body;
    const Query = `DELETE FROM ReviewSystem.Review where ReviewID = '${ReviewID}';`;
    con.query(Query, (err, result) => {
        if (err) {
            res.send('failed');
        } else {
            res.send('deleted');  
        }
    });
});



// Route to handle the update request
app.post('/updatereview', (req, res) => {
    const { ReviewID, Rating, Review, IsRecommended } = req.body;
  
    // Validate incoming data (you may add more validation as needed)
  
    // Update the values in the database
    const updateQuery = `
      UPDATE ReviewSystem.Review
      SET
        Rating = ?,
        Review = ?,
        IsRecommended = ?
      WHERE
        ReviewID = ?;
    `;
  
    // Execute the query
    con.query(updateQuery, [Rating, Review, IsRecommended, ReviewID], (error, results) => {
      if (error) {
        res.send('failed');
      } else {
        res.send('updated');
      }
    });
  });