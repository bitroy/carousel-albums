import '../styles/CarouselHome.scss';
import React, { useState, useEffect, createContext, useContext } from 'react';
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
			<h1>{loading ? 'Loading' : "Your Albums"}</h1>
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
	const [currentAlbumIndex, setCurrentAlbumIndex] = useState(1);

	const albums = AlbumContext.albums;
	const maxAlbums = Object.keys(albums).length;

	const nextAlbum = () => {
		if((currentAlbumIndex + 1) > maxAlbums) {
			setCurrentAlbumIndex(1);
		} else {
			setCurrentAlbumIndex(prevIndex => prevIndex + 1);
		}
		
		setCurrentAlbum({});
	};

	const previousAlbum = () => {
		if((currentAlbumIndex - 1) === 0) {
			setCurrentAlbumIndex(maxAlbums);
		} else {
			setCurrentAlbumIndex(prevIndex => prevIndex - 1);
		}
		
		setCurrentAlbum({});
	};

	const handleSetCurrentAlbum = (clickedAlbum) => {
		setCurrentAlbum(clickedAlbum)
	}

    return(
		<div className="carousel-wrapper">
			<div className="navigation-arrow">
				<Arrow clickArrow={previousAlbum} glyph="&#9664;" />
				<Arrow clickArrow={nextAlbum} glyph="&#9654;" />
			</div>
			<AlbumSlider 
				albums={albums} 
				handleSetCurrentAlbum={handleSetCurrentAlbum}
				maxAlbums={maxAlbums}
				currentAlbumIndex={currentAlbumIndex-1}
			/>
			{
				(Object.keys(currentAlbum).length === 0) ? 
				null : 
				<AlbumDetails currentAlbum={currentAlbum} />
			}
		</div>			
    );
};

const Arrow = ({clickArrow, glyph}) => {
	return (
		<div className="arrow" onClick={() => clickArrow()}>
			{glyph}
		</div>
	);
};

const AlbumSlider = ({albums, handleSetCurrentAlbum, maxAlbums, currentAlbumIndex}) => {
	return (
		<div className={`album-slider active-album-${currentAlbumIndex}`}>
			<div 
				className="album-slider-wrapper"
				style={{transform:`translateX(-${currentAlbumIndex*(100/maxAlbums)}%)`}}	
			>
				{
					Object.entries(albums).map((album, index) => (
						<div id={`album-${index}`} className='albums' key={index}>
							<Album 
								currentAlbum={album} 
								handleSetCurrentAlbum={handleSetCurrentAlbum} 
								index={index+1}	
							/>
						</div>
					))
				}
			</div>
		</div>
	);
};

const Album = ({currentAlbum, handleSetCurrentAlbum, index}) => {
	let albumThumbnail = {};
	if(currentAlbum !== null && currentAlbum !== undefined) {
		albumThumbnail = {
			"title": currentAlbum["1"][0].title,
			"photo": currentAlbum["1"][0].thumbnailUrl
		}
	}

	return (
		<>
			<img 
				src={albumThumbnail.photo} 
				alt={albumThumbnail.title} 
				onClick={() => handleSetCurrentAlbum(currentAlbum)}
				style={{marginTop: "1rem"}}
			/>
			<h3>{`Album ${index}`}</h3>
		</>
	);
};

const AlbumDetails = ({currentAlbum}) => {
	return (
		<div className="albumdetails">
			<div className="albumphotos">
			{
				Object.entries(currentAlbum["1"]).map((photo, index) => (	
					<div key={index}>
						<img src={photo["1"].url} alt={photo["1"].title} />
						<h3>{`Photo ${index+1}`}</h3>
					</div>
				))
			}
			</div>
		</div>
	);
};

export default CarouselHome;
