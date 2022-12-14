import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const options = {
    method: 'GET',
headers: {
  'X-RapidAPI-Key': 'dc7f3f11a9msh3153f83757b6349p128db9jsnf9b2a23891e7',
  'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
}
};

let url = 'https://theaudiodb.p.rapidapi.com/searchalbum.php?s=daft_punk';


fetch(url, options)
            .then(response => response.json())
            .then(data => JSON.stringify(data, null, 4))
            .then(data => writeFileSync('data3.json', data))
            .catch(err => console.error(err));