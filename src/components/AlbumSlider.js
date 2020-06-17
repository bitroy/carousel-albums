import React from 'react';
import Album from './Album';


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

export default AlbumSlider;