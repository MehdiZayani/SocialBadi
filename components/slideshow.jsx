"use client";
import style from './slideshow.module.scss'
import {Fade} from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';
import { useState } from 'react';

import Link from 'next/link';
const buttonStyle = {
    width: "50px",
    height:"50px",
    background: 'none',
    border: '0px',
    color:"white"
};


const properties = {
    prevArrow: <button style={{ ...buttonStyle }}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/> </svg></button>,
    nextArrow: <button style={{ ...buttonStyle }}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/> </svg></button>
}
const Example = () => {
    const images = [
        "https://www.agru.at/fileadmin/user_upload/produkte/agruline/system/neues_format/RS2357_AGRU_01.jpg",
        "https://www.agru.at/fileadmin/user_upload/produkte/agruchem/system/neue_formate/header_agruchem.jpg",
        "https://www.agru.at/fileadmin/user_upload/produkte/purad/system/neue_formate/header.jpg",
        "https://www.agru.at/fileadmin/user_upload/produkte/halbzeuge/system/neue_formate/header.jpg",
        "https://www.agru.at/fileadmin/user_upload/produkte/betonschutz/system/neue_formate/header.jpg",
        "https://www.agru.at/fileadmin/user_upload/produkte/lining_systems/system/neue_formate/header.jpg",
        "https://www.agru.at/fileadmin/user_upload/produkte/schweisstechnik/system/neue_formate/header.jpg",

    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const indicators = (index) => (
        <button 
            key={index} 
            onClick={() => setCurrentIndex(index)}
            className={`${style.indicator} ${index === currentIndex ? style.active : ''}`}
        >
        </button>
    );    return (
        <div className={style.main}>
            <Fade className={style.slide} {...properties} duration={2000}  indicators={indicators}
                defaultIndex={currentIndex}
                onChange={(prevIndex, nextIndex) => setCurrentIndex(nextIndex)}>
                <div className={style.eachslideeffect}>
                    <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                        <div className={style.card}>
                        </div>
                        <div className={style.subcard}>
                            <p className={style.title}>Agruline</p>
                            <div className={style.para}>
                                <Link  href="./gallerie" className={style.link}>PE 100 RC piping system                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.eachslideeffect}>
                    <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                        <div className={style.card}>
                        </div>
                        <div className={style.subcard}>
                            <p className={style.title}>AGRUCHEM</p>
                            <div className={style.para}>
                                <Link  href="./gallerie" className={style.link}>For industrial applications
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.eachslideeffect}>
                    <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                        <div className={style.card}>
                        </div>
                        <div className={style.subcard}>
                            <p className={style.title}>PURAD</p>
                            <div className={style.para}>
                                <Link  href="./gallerie" className={style.link}>Ultra-pure piping systems
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.eachslideeffect}>
                    <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                        <div className={style.card}>
                        </div>
                        <div className={style.subcard}>
                            <p className={style.title}>Semi finished products</p>
                            <div className={style.para}>
                                <Link  href="./gallerie" className={style.link}>Out of PE, PP, PVDF, ECTFE, FEP, PFA
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.eachslideeffect}>
                    <div style={{ 'backgroundImage': `url(${images[3]})` }}>
                        <div className={style.card}>
                        </div>
                        <div className={style.subcard}>
                            <p className={style.title}>Concrete protection
                            </p>
                            <div className={style.para}>
                                <Link  href="./gallerie" className={style.link}>Longer service life for concrete buildings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.eachslideeffect}>
                    <div style={{ 'backgroundImage': `url(${images[4]})` }}>
                        <div className={style.card}>
                        </div>
                        <div className={style.subcard}>
                            <p className={style.title}>LINING SYSTEMS
                            </p>
                            <div className={style.para}>
                                <Link  href="./gallerie" className={style.link}>Geomembranes
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.eachslideeffect}>
                    <div style={{ 'backgroundImage': `url(${images[5]})` }}>
                        <div className={style.card}>
                        </div>
                        <div className={style.subcard}>
                            <p className={style.title}>Welding technology
                            </p>
                            <div className={style.para}>
                                <Link  href="./gallerie" className={style.link}>Infrared Welding
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default Example;