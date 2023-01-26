import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_IMAGE,
  GET_IMAGES,
  IMAGE_ERROR,
  DELETE_IMAGE,
  GET_IMAGE,
} from "./types";

// Get images
export const getImages = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/images");

    dispatch({
      type: GET_IMAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get image by ID
export const getImageById = (imageId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/images/${imageId}`);

    dispatch({
      type: GET_IMAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add image
export const addImage = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post("/api/users/upload", formData, config);

    dispatch({
      type: ADD_IMAGE,
      payload: res.data,
    });

    dispatch(setAlert("Image Created", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete image
export const deleteImage = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/images/${id}`);

    dispatch({
      type: DELETE_IMAGE,
      payload: id,
    });

    dispatch(setAlert("Image Removed", "success"));
  } catch (err) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
