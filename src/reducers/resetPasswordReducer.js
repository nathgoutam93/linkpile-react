const initialState = {
  emailAddress: "",
  message: "",
  error: "",
  loading: false,
};

function resetPasswordReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "update":
      return {
        ...state,
        error: "",
        loading: true,
      };
    case "success":
      return {
        ...state,
        message: "Please check your email for further instructions",
        loading: false,
      };
    case "error":
      return {
        ...state,
        error: action.error,
        emailAddress: "",
        message: "Failed to reset password",
        loading: false,
      };
    default:
      break;
  }
}

export { initialState, resetPasswordReducer };
