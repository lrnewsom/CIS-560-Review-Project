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
app.post('/addnewuser', (req, res)=>{
    res.send('success')
})


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
    const moviesData = [
        {Image:'image', ProductID: 1, Name:'The big lie', ProductType:2, Rating:'8.3', IsRecommended:'Yes', Genre:'Action', PublisherID:123},
        {Image:'image', ProductID: 2, Name:'The big Truth', ProductType:2, Rating:'2.3', IsRecommended:'No', Genre:'Comedy', PublisherID:123},
    ]
    res.json(moviesData);
})



// to send game data to the database
app.get('/getgames', (req, res)=>{
    const gameData = [
        {Image:'image', ProductID: 1, Name:'The big lie', ProductType:2, Rating:'8.3', IsRecommended:'Yes', PublisherName:'Warm Sun', PublisherID:123},
        {Image:'image', ProductID: 2, Name:'The big Truth', ProductType:2, Rating:'2.3', IsRecommended:'No', PublisherName:'Warm Sun Stuff', PublisherID:123},
    ]
    res.send(gameData);
})



// get movies
app.get('/getbooks', (req, res)=>{
    const booksData = [
        {Image:'image', ProductID: 1, Name:'The big lie', ProductType:2, Rating:'8.3', IsRecommended:'Yes', PublisherName:'Warm Sun', PublisherID:123},
        {Image:'image', ProductID: 2, Name:'The big Truth', ProductType:2, Rating:'2.3', IsRecommended:'No', PublisherName:'Warm Sun Stuff', PublisherID:123},
    ]

    res.json(moviesData);
})


