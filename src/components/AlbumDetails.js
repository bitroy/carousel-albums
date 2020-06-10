import React, { useContext } from 'react';
import Slider from './Slider';
import { CarouselContext } from './CarouselHome';

const AlbumDetails = () => {
	const AlbumContext = useContext(CarouselContext);
	const albums = AlbumContext.albums;
	                         


    const AlbumPhotos = Object.entries(albums).map((album) => (
		Object.entries(album["1"]).map((photo, index) => (
			<div key={index}>
				<h2>{album["0"]}</h2>
				<h4>{photo["1"].title}</h4>
				<img src={photo["1"].url} alt={photo["1"].title} />
			</div>
		))
	))

    return(			
		<div></div>
    );
};

export default AlbumDetails;