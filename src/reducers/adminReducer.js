const initialState = {
  imgFile: null,
  bgImgFile: null,
  username: "",
  imgSrc: "",
  profileName: "",
  about: "",
  links: null,
  appearance: {
    background: "",
    linkStyle: "",
    font: "",
  },
  error: "",
  loading: false,
  socials: {
    twitter: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    github: "",
    hashnode: "",
    devto: "",
    medium: "",
    whatsapp: "",
  },
};

function adminReducer(state, action) {
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
        imgFile: null,
        bgImgFile: null,
      };
    case "error":
      return {
        ...state,
        error: action.error,
      };
    default:
      break;
  }
}

export { initialState, adminReducer };
