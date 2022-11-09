

window.onload = function(){
	let input = document.getElementById('search-input-adb');
	let dataTag = document.getElementById('data-holder-adb');

	const options = {
		method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'dc7f3f11a9msh3153f83757b6349p128db9jsnf9b2a23891e7',
      'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
    }
		
	};
	let dataHolder = [];
	document.getElementById('search-adb').addEventListener('click', (e) => { 
		e.preventDefault();
		let endpoint = `https://theaudiodb.p.rapidapi.com/track-top10.php?s=${input.value}`;

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
		})

		
			
	console.log("dataHolder", dataHolder)

}

