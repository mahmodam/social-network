import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

function ImagePreview() {
  const [imageIds, setImageIds] = useState([]);

  const loadImage = async () => {
    try {
      const res = await axios.get(process.env.BASE_URL + "api/users/images");
      setImageIds(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <div>
      <h1>Preview Image</h1>
      <div className="image-upload__preview">
        {imageIds.at(0) && (
          <Image
            className="image-preview"
            key={imageIds.at(0)._id}
            cloudName="teenapp"
            publicId={imageIds.at(0).publicId}
            width="100"
            crop="scale"
          />
        )}
      </div>
    </div>
  );
}

export default ImagePreview;
