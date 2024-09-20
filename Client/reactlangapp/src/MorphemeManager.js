import React, {useState, useEffect} from 'react';
import "./App.scss";
import Axios from 'axios';
import Morpheme from './Morpheme';

function MorphemeManager() { 
    const initialData = [
        {sounds: "160,153,168", type: "root", meaning: "a 4 legged feline"}
    ]

    const [morphemes, setMorphemes] = useState(initialData)

    const [phonemes, setPhonemes] = useState([])

    const getPhonemes = () => {
        new Promise((resolve, reject) => {
            Axios.get("http://localhost:3001/api/get").then((response) => {
                setPhonemes(response.data);
            });
            resolve("updated phonemes from database")
        })
    }

    const getTypeAsWord = (type) => {
        if(type === "C"){
            return "Consonant"
        }
        if(type === "V"){
            return "Vowel"
        }
        else{
            return "Phoneme"
        }
    }

    useEffect(() => {
        getPhonemes();
    }, []);

    return(
    <div class="flexbox-container">
        <h1 align="center">Morphemes</h1>

        {Object.values(morphemes).map(morpheme =>(
            <Morpheme sounds={morpheme.sounds} type={morpheme.type} meaning={morpheme.meaning}/>
        ))}



        <div class="flexbox-scroller">
            <div class="flexbox-row-container">
                {Object.values(phonemes).map(phoneme =>(
                    <div class="flexbox-item">
                        <h3>{phoneme.symbol}</h3>
                        <p>Easy Type: {phoneme.easyType}</p>
                        <p>{phoneme.sol} {phoneme.poa} {phoneme.moa} 
                        {phoneme.height} {phoneme.backness} {phoneme.rounding} {getTypeAsWord(phoneme.type)}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}
export default MorphemeManager