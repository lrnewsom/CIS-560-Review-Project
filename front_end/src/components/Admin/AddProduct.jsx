import React, {useState, useEffect} from 'react'
import testImage from './spiderman.jpg'
import axios from 'axios';
import LINK from '../Links';



// to add, edit and see movies available now
export default function ({ProductType}) {
    const [disUser, setDisUser] = useState('current');
    const [CurrentProduct, SetCurrentProduct] = useState([]);
    const [Directors, SetDirectors] = useState([]);
    const [Genres, SetGenre] = useState([]);
    const [Publisher, SetPublisher] = useState([]);
    const [Tags, SetTags] = useState([]);


    // the following search terms will be used to filter out items
    const [FilterBySearchTerm, SetFilterBySearchTerm] = useState('')
    const [FilterByMinRating, SetFilterByMinRating] = useState(0);
    const [FilterByMaxRating, SetFilterByMaxRating] = useState(0);
    const [FilterByGenre, SetFilterByGenre] = useState(0);

    // to add new or select existing item
    const [IsNewDirector, SetIsNewDirector] = useState(false);
    const [IsNewPublisher, SetIsNewPublisher] = useState(false);


    // Add new product to the database
    const [ProductName, SetProductName] = useState('');
    const [ProductDescription, SetProductDescription] = useState('');
    const [ProductImage, SetProductImage] = useState('');
    const [ProductGenere, SetProductGenere] = useState('');
    const [ProductDirector, SetProductDirector] = useState('');
    const [ProductPublisher ,SetProductPublisher] = useState('');
    const [ProductTag, SetProductTag] = useState('');
    const [ProductActor, SetProductActor] = useState('');


    // ############################################################################
    // when the page loads first time
    // based on the current selcted product type
    // it will fetch the data from the database and
    // sets it to the current product
    useEffect(()=>{
        const parameter = {ProductTypeID: ProductType === 'movie'? 1 : ProductType === 'book' ? 3 : 2,}
        axios.get(LINK+'getproducts', {parameter})
        .then(response=>{
            console.log(response.data);
            SetCurrentProduct(response.data);
        })
        .catch(err=>{
            console.log(err)
            SetCurrentProduct([]);
        })
    },[])




    // ############################################################################
    // when the page loads it will get all teh directors from the databasee
    useEffect(()=>{
        axios.get(LINK+'getdirectors')
        .then(response=>{
            if(response.data === 'failed'){
                SetDirectors([]);
            }
            else{
                SetDirectors(response.data);
            }
        })
        .catch(err=>{
            SetDirectors([]);
        });
    }, [])


    // get all the gamer tags
    useEffect(()=>{
        axios.get(LINK+'gettags')
        .then(response=>{
            if(response.data === 'failed'){
                SetTags([]);
            }
            else{
                SetTags(response.data);
            }
        })
        .catch(err=>{
            SetTags([]);
        });
    }, [])




    // ############################################################################
    // when the page loads it will get all the genre from the database
    useEffect(()=>{
        axios.get(LINK+'getgenre')
        .then(response=>{
            if(response.data === 'failed'){
                SetGenre([]);
            }
            else{
                SetGenre(response.data);
            }
        })
        .catch(err=>{
            SetGenre([]);
        });
    }, [])




    // gets all existing publishers from the DB
    useEffect(()=>{
        axios.get(LINK+'getpublisher')
        .then(response=>{
            if(response.data === 'failed'){
                SetPublisher([]);
                console.log('failed');
            }
            else{
                SetPublisher(response.data);
                console.log('publisher is set');
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])


    // ############################################################################
    // To add product to the database
    function HandelAddNewProduct(){
        // data to be entered to DB
        const parameter = {
            ProductName: ProductName,
            ProductTypeID: ProductType === 'movie'? 1 : ProductType === 'book' ? 3 : 2,
            ProductDescription: ProductDescription,
            ProductGenere: ProductGenere,
            ProductDirector: ProductDirector,
            ProductImage: ProductImage,
            ProductPublisher: ProductPublisher,
            ProductTag: ProductTag
        }

        axios.post(LINK+'addnewproduct', {parameter})
        .then(response=>{
            console.log(response.data);
            console.log(parameter);
            HandelClearProduct();
        })
        .catch(err=>{
            console.log(err);
        })
    }


    // ############################################################################
    // if the admin doesnt want to add a product anymore
    function HandelClearProduct(){
        SetProductName('');
        SetProductDescription('');
        SetProductDirector('');
        SetProductGenere('');
        SetProductGenere('');
        SetProductImage('');
    }


    // ############################################################################
    // filter and search product by the product name and other terms 
    function HandelSearchAndFilter(){
        console.log('do stuff')
    }


    
    // ############################################################################
    // given the product ID delete the product from the database and all of its association
    // productID-> the product that is going to be deleted
    function HandelDeleteProduct(productID){
        const parameter = {productID: productID};

        axios.get(LINK+'deleteproduct', {parameter})
        .then(response=>{
            console.log(response.data);
        })
        .catch(err=>{
            console.log(err)
        })
    }



console.log(Publisher);


  return (
    <div className='my-5 border rounded p-3'>
        <div className='d-flex gap-2'>
            <button className={`btn text-uppercase ${disUser == 'add' ? 'btn-dark' : 'btn-primary'}`} onClick={()=>{setDisUser('add')}}>ADD NEW {ProductType}</button>
            <button className={`btn text-uppercase ${disUser == 'current' ? 'btn-dark' : 'btn-primary'}`} onClick={()=>{setDisUser('current'); HandelClearProduct()}}>SHOW CURRENT {ProductType}</button>    
        </div>


        {/* If the admin wants to add a new product to the database */}
        {disUser === 'add' ? (
            <div className='py-5' style={{maxWidth: '400px'}}>
                <h4 className='text-uppercase mb-5'>ADD NEW {ProductType}</h4>
                <div className='mb-4'>
                    <label className='form-label text-uppercase'>ENTER {ProductType} NAME</label>
                    <input className='form-control' type="text" onChange={(e)=>{SetProductName(e.target.value)}} placeholder='The sky is blue'/>
                </div>

                <div className='mb-4'>
                    <label className='form-label text-uppercase'>ENTER {ProductType} discription</label>
                    <textarea className='form-control' rows={'3'} onChange={(e)=>{SetProductDescription(e.target.value)}} placeholder='A good product discription'/>
                </div>

                <div className='mb-4'>
                    <label className='form-label text-uppercase'>ENTER {ProductType} image (jpeg)</label>
                    <input className='form-control'  type="file" onChange={(e)=>{SetProductImage(e.target.value)}} accept='image/jpeg' />
                </div>

                {/* Allows admin select approprate genere */}
                {ProductType === 'movie' ? (
                <div className='mb-4'>
                    <label className='form-label text-uppercase'>Select {ProductType} genre</label>
                    <select className='form-select' id="genre" onChange={(e)=>{SetProductGenere(e.target.value)}}>
                        {Genres.map((data, key)=>(
                            <option key={key} value={data.GenreID}>{data.GenreName}</option>
                        ))}
                    </select>
                    <div className='mb-4 mt-3'>
                        <label className='form-label'>ADD ACTOR</label>
                        <input type="text" className='form-control' onChange={(e)=>{SetProductActor(e.target.value);}} />    
                    </div>
                    
                </div>
                  ) : null}


                {ProductType === 'video game' ? (
                <div className='mb-4'>
                    <label className='form-label text-uppercase'>Select {ProductType} tag</label>
                    <select className='form-select' id="genre" onChange={(e)=>{SetProductTag(e.target.value)}}>
                        {Tags.map((data, key)=>(
                            <option key={key} value={data.TagID}>{data.TagName}</option>
                        ))}
                    </select>
                </div>
                  ) : null}
                
                {/* allows user to select director */}
                {ProductType === 'movie' ?(
                    <div className='mb-4'>
                        {!IsNewDirector ? (
                            <div>
                                <label className='form-label text-uppercase'>Select {ProductType} director</label>
                                <select className='form-select' id="genre" onChange={(e)=>{SetProductDirector(e.target.value)}}>
                                    {Directors.map((data, key)=>(
                                        <option key={key} value={data.DirectorID}>{data.DirectorName}</option>
                                    ))}
                                </select>     
                            </div>
                            ): null}

                        <button className='btn btn-primary mt-3' onClick={()=> !IsNewDirector ? SetIsNewDirector(true) : SetIsNewDirector(false)}> {IsNewDirector ? 'SELECT EXISTING DIRECTOR' : 'ADD NEW DIRECTOR'}</button>
                        
                        {IsNewDirector ? (
                            <div className='mt-3'>
                                <label className='form-label'>ADD DIRECTOR</label>
                                <input type="text" className='form-control' onChange={(e)=>{SetProductDirector(e.target.value)}}/>    
                            </div> ) : null}
                        
                    </div> ) : null}


                {/* allows user to select publisher */}
                {ProductType === 'book'?(
                    <div className='mb-4'>
                        <label className='form-label text-uppercase'>Select {ProductType} publisher</label>
                        <select className='form-select' id="genre" onChange={(e)=>{SetProductPublisher(e.target.value)}}>
                            {Publisher.map((data, key)=>(
                                <option key={key} value={data.PublisherID}>{data.PublisherName}</option>
                            ))}
                        </select>

                        <button className='btn btn-primary mt-3' onClick={()=> !IsNewPublisher ? SetIsNewPublisher(true) : SetIsNewPublisher(false)}> {IsNewDirector ? 'SELECT EXISTING PUBLISHER' : 'ADD NEW PUBLISHER'}</button>
                        
                        {IsNewPublisher ? (
                            <div className='mt-3'>
                                <label className='form-label'>ADD PUBLISHER</label>
                                <input type="text" className='form-control' onChange={(e)=>{SetProductPublisher(e.target.value)}}/>    
                            </div> ) : null}
                    </div> ) : null}

                <button className='btn btn-success' onClick={HandelAddNewProduct}>Add {ProductType}+</button>
                <button className='btn btn-danger mx-2' onClick={HandelClearProduct}>cancel</button>
            </div> ) : null }








        {/* The Admin is looking at the already existing products */}
        {disUser === 'current' ? (
            <div className='py-5' >
                <h4 className='text-uppercase mb-5'>current {ProductType}</h4>
                
                {/* search for the product */}
                <div className='mb-4'>
                    <div class="input-group mb-3" style={{maxWidth:'400px'}}>
                        <input type="text" class="form-control" placeholder="search product"  aria-describedby="button-addon2" onChange={(e)=>{SetFilterBySearchTerm(e.currentTarget.value)}}/>
                        <button class="btn btn-secondary" type="button" id="button-addon2" onClick={HandelSearchAndFilter}>SEARCH</button>
                    </div>
                </div>

                {/* filter by genre */}
                <div className='my-3'>
                    <label htmlFor="filter user" className='form-label'> FILTER BY GENRE</label>
                    <select className='form-select' style={{maxWidth:'400px'}} onChange={(e)=>{SetFilterByGenre(e.currentTarget.value)}}>
                        {Genres.map((data, key)=>(
                            <option key={key} value={data.GenreID}>{data.GenreName}</option>
                        ))}
                    </select>
                </div>

                {/* Filter the product by rating */}
                <div className='mb-5'>
                    <div class=" mb-3" style={{maxWidth:'400px'}}>
                        <label className='form-label'> FILTER BY RATING</label>
                        <div className='d-flex gap-2'>
                            <input type="number" min={0} max={10} class="form-control" placeholder="Min rating" onChange={(e)=>{SetFilterByMinRating(e.currentTarget.value)}}/>
                            <label className='form-label'> BETWEEN</label>
                            <input type="number" min={0} max={10} class="form-control" placeholder="Max rating" onChange={(e)=>{SetFilterByMaxRating(e.currentTarget.value)}}/>    
                        </div>
                        
                    </div>
                </div>
                

                {/* The list of products already in database */}
                <div className='d-flex flex-wrap gap-3'>
                    {/* existing data starts */}
                    <div class="card" style={{width: '15rem'}}>
                        <img src={testImage} class="card-img-top" alt="..." />
                        <div class="card-body p-1">
                            <small class="card-title text-uppercase">spider man
                                <b className='muted mx-2 bg-success text-white p-1 rounded'>8.5/10</b>
                                <b className='muted mx-2 bg-dark text-white p-1 rounded'> Action </b> 
                            </small>
                            {/* <small class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</small> */}
                            <a href="#" class="btn btn-sm btn-primary w-100 my-1 text-uppercase">reviews</a>
                            <a href="#" class="btn btn-sm btn-warning w-100 text-uppercase">EDIT</a>
                            <button class="btn btn-sm btn-danger w-100  my-1 text-uppercase" onClick={()=>HandelDeleteProduct(1234)}>DELETE</button>
                        </div>
                    </div>
                    {/* existing data ends */}
                    
                    
                </div>
            </div> ) : null }
    </div>
  )
}
