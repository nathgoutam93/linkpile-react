const initialState = {
  file: null,
  username: '',
  imgSrc: '',
  profileName: '',
  about: '',
  links: null,
  appearance: {
    background: '',
    linkStyle: '',
    font: '',
  },
  error: '',
  loading: false,
};

function adminReducer(state, action) {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'update':
      return {
        ...state,
        loading: true,
        file: null,
      };
    case 'success':
      return {
        ...state,
        loading: false,
        file: null,
      };
    case 'error':
      return {
        ...state,
        error: action.error,
      };
    default:
      break;
  }
}

export { initialState, adminReducer };
