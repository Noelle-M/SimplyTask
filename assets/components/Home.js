// assets/components/Home.js
import React from 'react';
import archivesImg from '../img/archives.png'
import { BiPlusCircle } from 'react-icons/bi';
import {Tags} from "./Tags";
import {Tasks} from "./Tasks";

const Home = () => {
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedDate = formatter.format(currentDate);

    return (
        <>
            <div className="home bg-dark text-center">
                <div className="button-add mb-3">
                    <a href="/">
                        <BiPlusCircle size={50} color="#4EBC3B" />
                    </a>
                </div>
                <div className="card shadow p-0">
                    <div className="card-body">
                        <h5 className="card-title">{formattedDate}</h5>
                        <div className="card-tags mt-5">
                            <div className="tag row">
                                <div className="tags-affiche col-10 text-left">
                                    <a href=""><Tags /></a>
                                </div>
                                <div className="tag-add col-2">
                                    <BiPlusCircle size={32} />
                                </div>
                            </div>
                        </div>
                        <div className="card-Tasks mt-5">
                            <Tasks />
                        </div>
                    </div>
                </div>
                <div className="m-4">
                    <a href="/">
                        <img src={archivesImg} alt="Voir les archives" title="Archives" height="60" className="mt-5 float-start"/>
                    </a>
                </div>
            </div>
        </>
    );
};

export {Home};
