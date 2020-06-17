import React from 'react';

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

export default AlbumDetails;