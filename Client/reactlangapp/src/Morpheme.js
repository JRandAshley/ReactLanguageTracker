import React from 'react';
import "./App.scss";
import Axios from 'axios';

function Morpheme(props) {
    const getPhoneme = (phonemeId) => {
        new Promise((resolve, reject) => {
            Axios.post('http://localhost:3001/api/getSpecific/', {
                id: phonemeId
            }).then((response) => {
                console.log(response.data[0])
                let phonemeToReturn = response.data[0]
                return phonemeToReturn;
            });
        })
    }

    const sleep = (ms) => {
        return new Promise(
          resolve => setTimeout(resolve, ms)
        );
    }

    const sounds = props.sounds

    const getPhoneticSymbols = () => {
        const symbols = []
        const soundIds = sounds.split(",");
        soundIds.forEach(async(soundId) => {
            console.log(soundId)
            const soundSymbol = getPhoneme(soundId);
            sleep(2000)
            console.log(soundSymbol)
            symbols.push(soundSymbol)
        });
    }

    return(
        <div>
            <h3>{getPhoneticSymbols(props.sounds)}</h3>
            <p>{props.type}</p>
            <p>{props.meaning}</p>
        </div>
    )
}
export default Morpheme