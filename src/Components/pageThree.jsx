import React, {useState} from 'react';
import {Form, Button, Image} from "react-bootstrap";
import {
    deleteFromMyFavoritesApiData,
    getMyFavoritesApiData,
    loadApiData,
    loadBreedsApiData,
    postToMyFavoritesApiData
} from "../api/api";
import Search from "../images/Search-b.png";
import {Link} from "react-router-dom";
import VectorOne from "../images/Vector-1.png";
import VectorTwo from "../images/Vector-2.png";
import VectorThree from "../images/Vector-3.png";
import Upload from "../images/Upload.png";
import VectorLeft from "../images/Vector-l.png";

const PageThree = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [defaultLimit, setDefaultLimit] = useState(5);
    const [defaultOrder, setDefaultOrder] = useState('RANDOM');
    const [defaultType, setDefaultType] = useState('jpg,gif,png');
    const [defaultBreed, setDefaultBreed] = useState('');
    const [searchBreed, setSearchBreed] = useState('');
    const [myFavoritesId, setMyFavoritesId] = useState([]);
    const [myFavoritesData, setMyFavoritesData] = useState([]);

    let changeLimit = (e) => {
        setDefaultLimit(e.target.value);
    }
    let changeOrder = (e) => {
        setDefaultOrder(e.target.value);
    }
    let changeType = (e) => {
        setDefaultType(e.target.value);
    }
    let changeBreed = (e) => {
        setDefaultBreed(e.target.value);
    }
    let setBreed = (e) => {
        setSearchBreed(e.target.value);
    }


    let loadData = () => {
        setLoading(true);
        loadApiData(defaultLimit, defaultOrder, defaultType, defaultBreed).then(response => {
            setData(response.data);
            setLoading(false);
            console.log(response.data);
        })
    }

    let loadBreeds = () => {
        setLoading(true);
        loadBreedsApiData(searchBreed).then(response => {
            loadApiData(defaultLimit, defaultOrder, defaultType, response.data[0].id).then((response) => {
                setData(response.data);
                setLoading(false);
            })
        })
    }

    let loadMyFavorites = () => {
        getMyFavoritesApiData().then(response => {
            setMyFavoritesId(response.data.map(item => item.image_id));
            setMyFavoritesData(response.data);
            console.log(myFavoritesData)
        })
    }

    let addToMyFavorites = (imageId) => {
        postToMyFavoritesApiData(imageId).then(response => {
            loadMyFavorites();
        })
    }

    let delFromMyFavorites = (imageId) => {
        let id = myFavoritesData[myFavoritesData.findIndex(el => el.image_id === imageId)].id;
        deleteFromMyFavoritesApiData(id).then(response => {
            loadMyFavorites();
            console.log(response.data);
        })
    }

    React.useEffect(() => {
        loadData();
        loadMyFavorites();
    }, []);

    return (
        <div className={'pageTwo'}>
            <div className={'header'}>
                <div>
                    <Form.Group className={'d-flex'}>
                        <Form.Control type={'text'} onChange={setBreed} placeholder={'Search for breeds by name'}/>
                        <button onClick={loadBreeds} disabled={searchBreed.length === 0}><Image src={Search}/></button>
                    </Form.Group>
                </div>
                <div className={'selected-image_links'}>
                    <Link to={'/likes'}><Image src={VectorOne}/></Link>
                    <Link to={'/favourites'}><Image src={VectorTwo}/></Link>
                    <Link to={'/dislikes'}><Image src={VectorThree}/></Link>
                </div>
            </div>
            <div className={'page-two_breeds-nav page-two_breeds-nav-three'}>
                <div className={'block'}>
                    <div className={'foot'}>
                        <Link to={'/'} className={'back'}><Image src={VectorLeft}/></Link>
                        <p>BREEDS</p>
                    </div>
                </div>
            </div>

            <div className={'forms mb-lg-3'}>
                <div className={'forms-content'}>
                    <div>
                        <Form.Label>Breed</Form.Label>
                        <Form.Select as="select" onChange={changeBreed}>
                            <option value={''}>None</option>
                            <option value={'abys'}>Abyssinian</option>
                            <option value={'beng'}>Bengal</option>
                            <option value={'sava'}>Agean</option>
                            <option value={'abob'}>American Bobtail</option>
                            <option value={'asho'}>American Shorthair</option>
                            <option value={'awir'}>American Wirehair</option>
                        </Form.Select>
                    </div>
                    <div>
                        <Form.Label>Type</Form.Label>
                        <Form.Select as="select" onChange={changeType}>
                            <option value={'jpg,gif,png'}>All</option>
                            <option value={'png,jpg'}>Static</option>
                            <option value={'gif'}>Animated</option>
                        </Form.Select>
                    </div>
                </div>
            </div>
            <div className={'forms mb-lg-3'}>
                <div className={'forms-content'}>
                    <div>
                        <Form.Label>Order</Form.Label>
                        <Form.Select as="select" onChange={changeOrder}>
                            <option value={'RANDOM'}>RANDOM</option>
                            <option value={'ASC'}>ASC</option>
                            <option value={'DESC'}>DESC</option>
                        </Form.Select>
                    </div>
                    <div>
                        <Form.Label>Limit</Form.Label>
                        <div className={'d-flex'}>
                            <Form.Select as="select" className={'update-form'} onChange={changeLimit}>
                                <option value={5}>5 Items Per Page</option>
                                <option value={10}>10 Items Per Page</option>
                                <option value={15}>15 Items Per Page</option>
                                <option value={20}>20 Items Per Page</option>
                            </Form.Select>
                            <button className={'update-btn'} onClick={loadData}><Image src={Upload}/></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'images'}>
                <div className={'images-block'}>
                    {
                        !loading ? data.map(item => <Link to={'/one/' + item.id} key={item.id}><Image key={item.id}
                                                           src={item.url}
                                                           width={250}
                                                           height={200}
                                                           onClick={() => {
                                                               myFavoritesData.map(item => item.image_id).includes(item.id)
                                                                   ? delFromMyFavorites(item.id)
                                                                   : addToMyFavorites(item.id)
                                                           }}
                        /></Link>) : 'loading'
                    }
                </div>
            </div>
        </div>
    );
}
export default PageThree;
