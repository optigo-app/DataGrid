import React from 'react';

const ImageCell = ({ imageUrl }) => {
  return (
    <div>
      <img src={imageUrl} alt="Job Image" style={{ width: '100px', height: 'auto' }} />
    </div>
  );
};

export default ImageCell;