import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

import "./ImagesPreview.css";

function ImagesPreview(props) {
  const [imageIds, setImageIds] = useState([]);

  const loadImages = async () => {
    try {
      const res = await axios.get(process.env.BASE_URL + "api/users/images");
      setImageIds(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImage = async (imageId) => {
    try {
      await axios.delete(process.env.BASE_URL + `/api/users/images/${imageId}`);
      loadImages();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <Fragment>
      <h1>Images</h1>
      <div className="image-upload__preview">
        {imageIds.map((imageId) => (
          <div key={imageId._id} className="image-preview">
            <Image
              className="image-preview__image"
              cloudName="teenapp"
              publicId={imageId.publicId}
              width="100"
              crop="scale"
            />
            <button
              className="btn btn-primary"
              onClick={() => deleteImage(imageId._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default ImagesPreview;
