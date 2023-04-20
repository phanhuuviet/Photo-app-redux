import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';
import './RandomPhoto.scss';

RandomPhoto.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    onImageUrlChange: PropTypes.func,
    onRandomButtonBlur: PropTypes.func,
};

RandomPhoto.defaultProps = {
    name: '',
    imageUrl: '',
    onImageUrlChange: null,
    onRandomButtonBlur: null,
};

function RandomPhoto(props) {
    const { name, imageUrl, onImageUrlChange, onRandomButtonBlur } = props;

    const getRandomImageUrl = () => {
        const randomID = Math.trunc(Math.random() * 2000);
        return `https://picsum.photos/id/${randomID}/300/300`;
    };

    const handleRandomPhotoClick = () => {
        if (onImageUrlChange) {
            const randomImageUrl = getRandomImageUrl();

            onImageUrlChange(randomImageUrl);
        }
    };

    return (
        <div className="random-photo">
            <div className="random-photo__button">
                <Button
                    outline
                    name={name}
                    color="primary"
                    onBlur={onRandomButtonBlur}
                    onClick={handleRandomPhotoClick}
                >
                    Random a photo
                </Button>
            </div>

            <div className="random-photo__photo">
                {imageUrl && <img src={imageUrl} alt="Ooops ... not found. Please click random again!" />}
            </div>
        </div>
    );
}

export default RandomPhoto;
