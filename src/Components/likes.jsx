import React, {useState} from "react";
import {getMyVotesApiData, getMyVotesApiDataImg, loadSingleImage} from "../api/api";
import {Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import VectorOne from "../images/Vector-1.png";
import VectorTwo from "../images/Vector-2.png";
import VectorThree from "../images/Vector-3.png";
import VectorLeft from "../images/Vector-l.png";

const Likes = () => {

    const [data, setData] = useState([]);

    let loadMyVotes = () => {
        getMyVotesApiData().then(response => {
            Promise.all(response.data.filter(item => item.value === 1).map(item => item.image_id).map(item => getMyVotesApiDataImg(item).then(response => response.data))).then(function (results) {
                setData(results)
            });
        })
    }

    React.useEffect(() => {
        loadMyVotes();
    }, []);


    return (
        <div className={'pageTwo'}>
            <div className={'selected-image_head mb-lg-3'}>
                <div className={'header mt-lg-1'}>
                    <Link to={'/'} className={'back'}><Image src={VectorLeft}/></Link>
                    <p>LIKES</p>
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
                        data.map(item => <Link to={'/one/' + item.id} key={item.id}>
                            <Image key={item.id} src={item.url} width={250} height={200}/>
                        </Link>)
                    }
                </div>
            </div>
        </div>
    )
};
export default Likes;