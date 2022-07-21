import React, {useState} from 'react';
import {Button, Form, FormText, Image} from "react-bootstrap";
import {loadBreedsApiData, searchBreedsApiData} from "../api/api";
import {Link} from "react-router-dom";
import VectorOne from "../images/Vector-1.png";
import VectorTwo from "../images/Vector-2.png";
import VectorThree from "../images/Vector-3.png";
import VectorLeft from "../images/Vector-l.png";
import StrokeOne from '../images/Stroke-1.png';
import StrokeTwo from '../images/Stroke-2.png';
import Upload from '../images/Upload.png';
import Search from '../images/Search-b.png';

const PageTwo = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [defaultLimit, setDefaultLimit] = useState(5);
    const [defaultBreed, setDefaultBreed] = useState('');
    const [searchBreed, setSearchBreed] = useState('');

    let changeLimit = (e) => {
        setDefaultLimit(e.target.value);
    }
    let changeBreed = (e) => {
        setDefaultBreed(e.target.value);
    }
    let setBreed = (e) => {
        setSearchBreed(e.target.value);
    }
    let sortDataAZ = () => {
        let newData = [...data];
        newData.reverse().sort((a, b) => a.id - b.id || a.id.localeCompare(b.id));
        setData([...newData]);
    }
    let sortDataZA = () => {
        let newData = [...data];
        newData.sort((a, b) => a.id - b.id || a.id.localeCompare(b.id)).reverse();
        setData([...newData]);
    }

    let loadData = () => {
        setLoading(true);
        searchBreedsApiData(defaultLimit, defaultBreed).then(response => {
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        })
    }

    let loadBreeds = () => {
        setLoading(true);
        loadBreedsApiData(searchBreed).then(response => {
            searchBreedsApiData(defaultLimit, response.data[0].id).then((response) => {
                setData(response.data);
                setLoading(false);
            })
        })
    }

    React.useEffect(() => {
        loadData();
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
            <div className={'page-two_breeds-nav'}>
                <div className={'block'}>
                    <div className={'foot'}>
                        <Link to={'/'} className={'back'}><Image src={VectorLeft}/></Link>
                        <p>BREEDS</p>
                    </div>
                    <Form.Select as="select" onChange={changeBreed}>
                        <option value={''}>All Breeds</option>
                        <option value={'abys'}>Abyssinian</option>
                        <option value={'beng'}>Bengal</option>
                        <option value={'sava'}>Agean</option>
                        <option value={'abob'}>American Bobtail</option>
                        <option value={'asho'}>American Shorthair</option>
                        <option value={'awir'}>American Wirehair</option>
                    </Form.Select>
                    <Form.Select className={'second'} as="select" onChange={changeLimit}>
                        <option value={5}>Limit: 5</option>
                        <option value={10}>Limit: 10</option>
                        <option value={15}>Limit: 15</option>
                        <option value={20}>Limit: 20</option>
                    </Form.Select>
                    <div className={'sort-buttons'}>
                        <button onClick={sortDataAZ}><Image src={StrokeOne}/></button>
                        <button onClick={sortDataZA}><Image src={StrokeTwo}/></button>
                        <button onClick={loadData}><Image src={Upload}/></button>
                    </div>
                </div>
            </div>
            <div className={'images'}>
                <div className={'images-block'}>
                    {
                        !loading ? data.map(item =>
                            <Link to={'/one/' + item.id} key={item.id}>
                                <Image src={item.url} key={item.id} width={250} height={200}/>
                            </Link>) : 'loading'
                    }
                </div>
            </div>
        </div>
    );
}

export default PageTwo;

