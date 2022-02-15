const initialState = {
  username: "",
  email: "",
  error: "",
  loading: false,
};

function profileReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "update":
      return {
        ...state,
        loading: true,
      };
    case "success":
      return {
        ...state,
        loading: false,
      };
    case "error":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      break;
  }
}

export { initialState, profileReducer };
