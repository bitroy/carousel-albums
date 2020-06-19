import React from 'react';

const AlbumDetails = ({currentAlbum}) => {
	console.log("Album Details::", currentAlbum)
	return (
		<div className="albumdetails">
			<div className="albumphotos">
			{
				currentAlbum.map((photo, index) => (	
					<div key={index}>
						<img src={photo.url} alt={photo.title} />
						<h3>{`Photo ${index+1}`}</h3>
					</div>
				))
			}
			</div>
		</div>
	);
};

export default AlbumDetails;