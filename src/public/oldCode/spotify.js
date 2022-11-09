

window.onload = function(){
	let dataTag = document.getElementById('data-holder-adb');
	let search = document.getElementById('find-user-input-adb');
	

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'dc7f3f11a9msh3153f83757b6349p128db9jsnf9b2a23891e7',
			'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
		}
	};
	
	//fetch('https://theaudiodb.p.rapidapi.com/track-top10.php?s=%24%7B%7D', options)
	//	.then(response => response.json())
	//	.then(response => console.log(response))
	//	.catch(err => console.error(err));


	//			The old Api key
	//const options = {
	//	method: 'GET',
    //headers: {
    //  'X-RapidAPI-Key': 'dc7f3f11a9msh3153f83757b6349p128db9jsnf9b2a23891e7',
     // 'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
    //}
	//};


	let storeData = [];
	document.getElementById('search-adb').addEventListener('click', (e) => { 
		e.preventDefault();
		//let endpoint = `https://theaudiodb.p.rapidapi.com/track-top10.php?s=${search.value}`;
		let endpoint = 'https://theaudiodb.p.rapidapi.com/track-top10.php?s=%24%7B%7D';

		fetch(endpoint, options)
			.then(response => response.json())
			.then(data => {
				console.log(data.artists)	
				storeData.push(data)

				let str = JSON.stringify(storeData, null, "\t")
				dataTag.innerHTML = str
				
			})
			
		//.then(response => console.log(response))
		.catch(err => console.error(err));
		})

		
			
	console.log("dataHolder", storeData)

}

