import {
  ADD_IMAGE,
  GET_IMAGES,
  IMAGE_ERROR,
  DELETE_IMAGE,
  GET_IMAGE,
} from "../actions/types";

const initialState = {
  images: [],
  image: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_IMAGES:
      return {
        ...state,
        images: payload,
        loading: false,
      };
    case GET_IMAGE:
      return {
        ...state,
        image: payload,
        loading: false,
      };
    case ADD_IMAGE:
      return {
        ...state,
        images: [payload, ...state.images],
        loading: false,
      };
    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter((image) => image._id !== payload),
        loading: false,
      };
    case IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
