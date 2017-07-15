$(document).ready(function() {

	// Get movies informations
	fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe').then(res => res.json()).then(data => {
	const movie = data.results.map(e => ({title: e.title, image: e.backdrop_path, note: e.vote_average, synopsis: e.overview}));

	/*  VARIABLES
		========= */

	var i = 0;
	var mLenght = movie.length;
	
	/* SLIDER MOVIE
		============ */

	movie.forEach(_d => {

		/* Create div */
		const movie = $('<div>', {class: 'movie'})
		const movieDescription = $('<div>', {class: 'movie-description'})


		/* Image */
		if(_d.image == null){
			_d.image = 'images/img-default.jpg';
		} else {
			_d.image = `https://image.tmdb.org/t/p/w650/${_d.image}`;
		}

		const eImg = $('<img>', {class: 'movie-img', src: _d.image})[i]
		movie.append(eImg);

		/* Title */
		const eTitle = $('<h2>', {class: 'movie-title'}).text(_d.title)[0]
		movieDescription.append(eTitle)

		/* Note */
		var note = Math.round(_d.note) / 2
		const eNote = $('<p>', {class: 'movie-note'})
		n = 0;
		while (n < note){
			const eNoteImg = $('<img>', {src: 'images/star.png'})[i]
			eNote.append(eNoteImg);
			n++;
		}
		while (n != 5){
			const eNoteImg = $('<img>', {src: 'images/no-star.png'})[i]
			eNote.append(eNoteImg);
			n++;
		}
		movieDescription.append(eNote)

		/* Synopsis */
		const eSynopsis = $('<p>', {class: 'movie-synopsis'}).text(_d.synopsis.substring(0,250) + '...')[0]
		movieDescription.append(eSynopsis)

		/* Bullet */
		const bullet = $('<li>')

		/* Show content in div */
		movie.append(movieDescription);
		$('.slider-movie').append(movie);
		$('.slider-bullet').append(bullet);

	})


	/*  SLIDER NAVIGATION
		=================	*/

	$('.movie').eq(0).addClass('visible');
	$('.slider-bullet li').eq(0).addClass('active');

	// Previous movie
	$('a.movie-previous').click(function() {
		
		$('.movie').eq(i).removeClass('visible');
		$('.slider-bullet li').eq(i).removeClass('active');
		
		i = --i % mLenght;
		$('.movie').eq(i).addClass('visible');
		$('.slider-bullet li').eq(i).addClass('active');
	});

	// Next movie
	$('a.movie-next').click(function() {
		$('.movie').eq(i).removeClass('visible');
		$('.slider-bullet li').eq(i).removeClass('active');

		i = ++i % mLenght;
		$('.movie').eq(i).addClass('visible');
		$('.slider-bullet li').eq(i).addClass('active');
	});

	// Bullet navigation
	$('.slider-bullet li').click(function() {
		var iMovie = $(this).index();
		$('.movie').eq(i).removeClass('visible');
		$('.movie').eq(iMovie).addClass('visible');
		$('.slider-bullet li').eq(i).removeClass('active');
		$('.slider-bullet li').eq(iMovie).addClass('active');

		i = iMovie;
	})


})

});