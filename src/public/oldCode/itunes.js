window.onload =function(){
    let input = document.getElementById('search-input-itunes');
    let dataTag = document.getElementById('data-holder-itunes');
    const encodedParams = new URLSearchParams();
    encodedParams.append("country", "us");
    encodedParams.append("term", input);
    encodedParams.append("limit", "25");

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '4c187f9309msha2277d1a56df93fp1c9f85jsn2b8dafccf3ff',
            'X-RapidAPI-Host': 'iTunesvolodimir-kudriachenkoV1.p.rapidapi.com'
        },
        body: encodedParams
    };
    let dataHolder = [];

    document.getElementById('search-itunes').addEventListener('click', (e) => { 
        e.preventDefault();
        let url = 'https://itunesvolodimir-kudriachenkov1.p.rapidapi.com/searchMusic'
        
        fetch(url, options)
        .then(response => response.json())
        .then(data => {
                console.log(data.results);
                const ameriSongs = data.results;
                dataHolder.push(ameriSongs)
                let s = JSON.stringify(dataHolder, null, "\t")
                dataTag.innerHTML = s

            })
            .catch(err => console.error(err));
        })
}
