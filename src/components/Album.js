import React from 'react';

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

export default Album;