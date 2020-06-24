import React from 'react';
import InfiniteScroll from 'react-infinite-scroller'
import { useState } from 'react';

const AlbumDetails = ({currentAlbum}) => {
	const initialImages = currentAlbum.slice(0, 2);
	const [hasMoreImages, setHasMoreImages] = useState(true);
	const [showImages, setShowImages] = useState(initialImages);

	const showItems = () => {
		let images = [];
		for (let index = 0; index < showImages.length; index++) {
			const photo = showImages[index];
		  	images.push(
				<div className="photo" key={index}>
					<img src={photo.url} alt={photo.title} />
				</div>	
			  );
		}
		return images;
	}

	const loadMore = () => {
		if(showImages.length === 50){
			setHasMoreImages(false);
		} else {
			setTimeout(() => {
				const currentImagesCount = showImages.length
				const addImages = [...showImages, ...currentAlbum.slice(currentImagesCount, currentImagesCount + 4)];
				setShowImages(addImages);
			}, 1000);
		}
	}

	const albumStyle = {
		marginTop: '20%',
		display: 'flex',
		flexDirection: 'column'
	}

	return (
		<InfiniteScroll
			style={{albumStyle}}
			className="albumphotos"
			pageStart={0}
			loadMore={loadMore}
			hasMore={hasMoreImages}
			loader={<div className="loader"><strong>Loading ...</strong></div>}
			useWindow={false}>
			{showItems()}
		</InfiniteScroll>
	);
};

export default AlbumDetails;

