import React from 'react';
import BagImage from '../images/girl-and-pet 1.png';
import BagImageTwo from '../images/Rectangle 30.png';
import {Image} from "react-bootstrap";

const PageDef = () => {

    return (
        <div className={'pageDef'}>
            <Image src={BagImage}/>
            <div className={'pageDef_backgroundColor'}>
                <Image src={BagImageTwo}/>
            </div>
        </div>
    );
}

export default PageDef;
