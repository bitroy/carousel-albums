import React, { useContext, useState } from 'react';
import { CarouselContext } from './CarouselHome';
import Arrow from './Arrow';
import AlbumSlider from './AlbumSlider';
import AlbumDetails from './AlbumDetails';

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

export default Carousel;