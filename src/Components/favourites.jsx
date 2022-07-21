import React, {useState} from "react";
import {deleteFromMyFavoritesApiData, getMyFavoritesApiData} from "../api/api";
import {Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import VectorLeft from "../images/Vector-l.png";
import VectorOne from "../images/Vector-1.png";
import VectorTwo from "../images/Vector-2.png";
import VectorThree from "../images/Vector-3.png";

const Favourites = () => {

    const [data, setData] = useState([]);
    const [myFavoritesData, setMyFavoritesData] = useState([]);

    let delFromMyFavorites = (imageId) => {
        deleteFromMyFavoritesApiData(imageId).then(response => {
            loadData();
            console.log(response.data);
        })
    }

    let loadData = () => {
        getMyFavoritesApiData().then(response => {
            setData(response.data)
        })
    }

    React.useEffect(() => {
        loadData();
    }, []);

    return (
        <div className={'pageTwo'}>
            <div className={'selected-image_head selected-image_head-favourites mb-lg-3'}>
                <div className={'header mt-lg-1'}>
                    <Link to={'/'} className={'back'}><Image src={VectorLeft}/></Link>
                    <p>FAVOURITES</p>
                </div>
                <div className={'selected-image_links'}>
                    <Link to={'/likes'}><Image src={VectorOne}/></Link>
                    <Link to={'/favourites'}><Image src={VectorTwo}/></Link>
                    <Link to={'/dislikes'}><Image src={VectorThree}/></Link>
                </div>
            </div>
            <div className={'images'}>
                <div className={'images-block'}>
                    {
                        data.map(item => <a key={item.id}>
                            <Image key={item.id} src={item.image.url} width={250} height={200}
                                   onClick={() => delFromMyFavorites(item.id)}/>
                        </a>)
                    }
                </div>
            </div>
        </div>
    )
};
export default Favourites;