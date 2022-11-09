import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

let url = 'https://api.deezer.com/search?q=drake';

fetch(url)
    .then(response => response.json())
    .then(data => JSON.stringify(data, null, 4))
    .then(data => writeFileSync('data.json', data));
    console.log(data);