const initialState = {
  username: "",
  email: "",
  password: "",
  error: "",
  loading: false,
};

function registerReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "register":
      return {
        ...state,
        error: "",
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
        password: "",
      };
    default:
      break;
  }
}

export { initialState, registerReducer };
