import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import PageTwo from "./Components/pageTwo";
import PageThree from "./Components/pageThree";
import {Button, Image} from "react-bootstrap";
import Logo from './images/Logo.jpg';
import MaskGroupOne from './images/MaskGroup-1.png';
import MaskGroupTwo from './images/MaskGroup-2.png';
import MaskGroupThree from './images/MaskGroup-3.png';
import PageDef from "./Components/pageDef";
import SelectedImage from "./Components/selectedImage";
import Likes from "./Components/likes";
import DisLikes from "./Components/disLikes";
import Favourites from "./Components/favourites";

const App = () => {

    return (
        <div className={'App'}>
            <div className={'section-nav'}>
                <div className={'section-nav_logo'}>
                    <Image src={Logo}/>
                </div>
                <div className={'section-nav_text'}>
                    <h1>Hi intern!</h1>
                    <h5>Welcome to MI 2022 Front-end test</h5>
                </div>
                <div className={'section-nav_block'}>
                    <h5>Lets start using The Cat API</h5>
                    <NavLink className={'section-nav_child'} to={'/one'}>
                        <Image src={MaskGroupOne}/>
                        <button>voting</button>
                    </NavLink>
                    <NavLink className={'section-nav_child'} to={'/two'}>
                        <Image src={MaskGroupTwo}/>
                        <button>breeds</button>
                    </NavLink>
                    <NavLink className={'section-nav_child'} to={'/three'}>
                        <Image src={MaskGroupThree}/>
                        <button>gallery</button>
                    </NavLink>
                </div>
            </div>
            <Routes>
                <Route exact path="/" element={<PageDef/>}/>
                <Route exact path={'/one'} element={<SelectedImage/>}/>
                <Route exact path={'/one/:imageId'} element={<SelectedImage/>}/>
                <Route exact path="/two" element={<PageTwo/>}/>
                <Route exact path="/three" element={<PageThree/>}/>
                <Route exact path="/likes" element={<Likes/>}/>
                <Route exact path="/dislikes" element={<DisLikes/>}/>
                <Route exact path="/favourites" element={<Favourites/>}/>

            </Routes>
        </div>
    );
}

export default App;
