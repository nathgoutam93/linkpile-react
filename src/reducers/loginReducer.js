const initialState = {
  email: "",
  password: "",
  error: "",
  loading: false,
};

function loginReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case "login": {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case "success": {
      return {
        ...state,
        loading: false,
      };
    }
    case "error": {
      return {
        ...state,
        error: action.error,
        loading: false,
        password: "",
      };
    }
    default:
      break;
  }
}

export { initialState, loginReducer };
