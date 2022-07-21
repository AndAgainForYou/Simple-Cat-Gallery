import React, {useState} from 'react';
import {Button, Image} from "react-bootstrap";
import {Link, useParams} from 'react-router-dom';
import {
    deleteFromMyFavoritesApiData, deleteFromMyVotesApiData,
    getMyFavoritesApiData, getMyVotesApiData,
    loadSingleImage,
    postToMyFavoritesApiData, postToMyVotesApiData
} from "../api/api";
import VectorOne from '../images/Vector-1.png';
import VectorTwo from '../images/Vector-2.png';
import VectorThree from '../images/Vector-3.png';
import VectorLeft from '../images/Vector-l.png';
import VectorTwoWhite from '../images/Vector-v-2.png';
import VectorOneWhite from '../images/Vector-v-1.png';
import VectorThreeWhite from '../images/Vector-v-3.png';

const SelectedImage = () => {
    const {imageId} = useParams();
    const [url, setUrl] = useState('');
    const [defImage, setDefImage] = useState('unPP08xOZ');
    const [myFavoritesId, setMyFavoritesId] = useState([]);
    const [myFavoritesData, setMyFavoritesData] = useState([]);
    const [log, setLog] = useState([]);

    let addToMyFavorites = () => {
        postToMyFavoritesApiData(imageId).then(response => {
            loadMyFavorites();
            console.log(response.data);
            setLog([...log, {image_Id: imageId, type: "added to Favourites"}]);
        })
    }

    let loadMyFavorites = () => {
        getMyFavoritesApiData().then(response => {
            setMyFavoritesId(response.data.map(item => item.image_id));
            setMyFavoritesData(response.data);
            console.log(myFavoritesData)
        })
    }

    let delFromMyFavorites = (imageId) => {
        let id = myFavoritesData[myFavoritesData.findIndex(el => el.image_id === imageId)].id;
        deleteFromMyFavoritesApiData(id).then(response => {
            loadMyFavorites();
            console.log(response.data);
            setLog([...log, {image_Id: imageId, type: "removed from Favourites"}]);
        })
    }

    let postImageToVotes = (imageId) => {
        postToMyVotesApiData(imageId).then(response => {
            console.log(response.data);
            setLog([...log, {image_Id: imageId, type: "added to Likes"}]);
        })
    }

    let delImageToVotes = (imageId) => {
        deleteFromMyVotesApiData(imageId).then(response => {
            console.log(response.data);
            setLog([...log, {image_Id: imageId, type: "added to Dislikes"}]);
        })
    }

    React.useEffect(() => {
        loadSingleImage(imageId === undefined ? defImage : imageId).then((response) => {
            setUrl(response.data.url);
            setDefImage(response.data.id);
        });
        loadMyFavorites();
    }, []);

    return (
        <div className={'selected-image'}>
            <div className={'selected-image_head'}>
                <div className={'header'}>
                    <Link to={'/'} className={'back'}><Image src={VectorLeft}/></Link>
                    <p>VOTING</p>
                    <p>{defImage}</p>
                </div>
                <div className={'selected-image_links'}>
                    <Link to={'/likes'}><Image src={VectorOne}/></Link>
                    <Link to={'/favourites'}><Image src={VectorTwo}/></Link>
                    <Link to={'/dislikes'}><Image src={VectorThree}/></Link>
                </div>
            </div>
            <div className={'selected-image_image'}>
                <Image src={url} width={800} height={500} key={imageId}/>
                <div className={'image-buttons'}>
                    <button onClick={() => postImageToVotes(defImage)}><Image src={VectorTwoWhite}/></button>
                    <button onClick={() => {
                        myFavoritesData.map(item => item.image_id).includes(defImage)
                            ? delFromMyFavorites(defImage)
                            : addToMyFavorites(defImage)
                    }} disabled={defImage === 'unPP08xOZ'}><Image src={VectorOneWhite}/></button>
                    <button onClick={() => delImageToVotes(defImage)}><Image src={VectorThreeWhite}/></button>
                </div>
            </div>
            <div className={'history-messages'}>{
                log.length === 0 ? 'no data' : log.map(item =>
                    <div>
                        <span>{new Date().toLocaleTimeString().slice(0, -3)}</span>
                        Image ID: <span>{item.image_Id}</span> was {item.type}</div>)}
            </div>
        </div>
    );
}


export default SelectedImage;
