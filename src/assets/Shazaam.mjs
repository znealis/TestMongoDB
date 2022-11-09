import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4c187f9309msha2277d1a56df93fp1c9f85jsn2b8dafccf3ff',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
    
};
export let dataHolder = [];

    let endpoint = `https://shazam.p.rapidapi.com/search?term=drake&locale=en-US&offset=0&limit=5`;

    fetch(endpoint, options)
        .then(response => response.json())
        .then(data => JSON.stringify(data, null, 4))
        .then(data => writeFileSync('data1.json', data))
        
//.then(response => console.log(response))
    .catch(err => console.error(err));

    
        
console.log("data1.json")
console.log("new")