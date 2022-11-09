import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

let country = "US";
let term = "best";

let url = 'https://itunes.apple.com/search?term='+term+'&country='+country+'&entity=song&limit=25'
        
        fetch(url)
            .then(response => response.json())
            .then(data => JSON.stringify(data, null, 4))
            .then(data => writeFileSync('data2.json', data));

