
window.onload = function(){
let input = document.getElementById('search-input-shazaam');
let dataTag = document.getElementById('data-holder-shazaam');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4c187f9309msha2277d1a56df93fp1c9f85jsn2b8dafccf3ff',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
    
};

let dataHolder = [];
document.getElementById('search-shazaam').addEventListener('click', (e) => { 
  e.preventDefault();
  let endpoint = `https://shazam.p.rapidapi.com/search?term=${input.value}&locale=en-US&offset=0&limit=5`;

    fetch(endpoint, options)
        .then(response => response.json())
        .then(data => {
          console.log(data.artists)	
          dataHolder.push(data)
          let s = JSON.stringify(dataHolder, null, "\t")
          dataTag.innerHTML = s
        })
        
//.then(response => console.log(response))
    .catch(err => console.error(err));

  });
}
console.log("data1.json")
console.log("new")