import '../styles/CarouselHome.scss';
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import Axios from 'axios';

export const CarouselContext = createContext();

const CarouselHome = () => {
	const [albums, setAlbums] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		Axios
			.get("https://jsonplaceholder.typicode.com/photos")
			.then((response) => {
				let photos = [];
				response.data.forEach((photo) => {
					const key = "Album_"+photo.albumId;
					if(!photos[key]) {
						photos[key] = [];
					}

					photos[key].push({
						"id": photo.id,
						"title": photo.title,
						"url": photo.url,
						"thumbnailUrl": photo.thumbnailUrl
					});
				});

				setLoading(false)
				setAlbums(photos);
				setError('');
			})
			.catch((error) => {
				setLoading(false);
				setAlbums([]);
				setError('Error in fetching Album');
			});

			return () => {
				setAlbums([]);
			};
	}, []);

	return (
		<div className="CarouselHome">
			<h1>{loading ? 'Loading' : "Nomura Albums"}</h1>
            <h1>{error ? error : null}</h1>
			<CarouselContext.Provider value={{albums}}>
				<Carousel />
			</CarouselContext.Provider>
		</div>
	);
}

const Carousel = () => {
	const AlbumContext = useContext(CarouselContext);
	const [currentAlbum, setCurrentAlbum] = useState({});
	const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);

	const nextAlbum = () => {

	};

	const previousAlbum = () => {

	};

	const handleSetCurrentAlbum = (index) => {
		setCurrentAlbum(AlbumContext.albums[`Album_${index+1}`])
		setCurrentAlbumIndex(index);
	}

    return(
		<div className="carousel-wrapper">
			{/* <Arrow direction="left" clickArrow={previousAlbum} glyph="&#9664;" /> */}
				<AlbumSlider albums={AlbumContext.albums} handleSetCurrentAlbum={handleSetCurrentAlbum} /> 
			{/* <Arrow direction="right" clickArrow={nextAlbum} glyph="&#9654;" /> */}
			{Object.keys(currentAlbum).length === 0 ? null : <AlbumDetails currentAlbum={currentAlbum} albumIndex={currentAlbumIndex}/>}
		</div>			
    );
};

const Arrow = ({direction, clickArrow, glyph}) => {
	return (
		<div className="arrow" onClick={clickArrow}>
			{glyph}
		</div>
	);
};

const AlbumSlider = ({albums, handleSetCurrentAlbum}) => {
	let sliderAlbums = [];
	Object.entries(albums).map((album) => (
		sliderAlbums.push({
			"title": album["0"],
			"photo": album["1"][0]["thumbnailUrl"]
		})
	));

	return (
		<div className="carousel">
			{
				sliderAlbums.map((album, index) => (
					<div className="albums" key={index}>
						<img src={album.photo} alt={album.title} onClick={() => handleSetCurrentAlbum(index)} />
						<h2>{album.title}</h2>
					</div>
				))
			}
		</div>
	);
};

const AlbumDetails = ({currentAlbum, albumIndex}) => {

	return (
		<div className="albumdetails">
			<h2>{`Album_${albumIndex+1}`}</h2>
			{
				Object.entries(currentAlbum).map((photo, index) => (	
					<div key={index}>
						<h3>{`Photo_${index}`}</h3>
						<img src={photo["1"].url} alt={photo["1"].title} />
					</div>
				))
			}
		</div>
	);
};

export default CarouselHome;
