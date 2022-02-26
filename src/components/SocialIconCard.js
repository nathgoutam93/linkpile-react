import React from "react";
import { useAdmin } from "../context/adminContext";
import InputField from "./commons/inputField";

export default function SocialIconCard() {
  const { state, dispatch } = useAdmin();
  const {
    twitter,
    instagram,
    facebook,
    linkedin,
    github,
    hashnode,
    devto,
    medium,
    whatsapp,
  } = state.socials;

  return (
    <div className="w-full p-5 flex flex-col items-center bg-secondary space-y-4 rounded-xl border border-border-dark">
      <span className="text-white text-xl font-nunito">Social Icons</span>
      <InputField
        label="twitter handle"
        value={twitter}
        onChange={(e) =>
          dispatch({
            type: "field",
            field: "socials",
            value: { ...state.socials, twitter: e.target.value },
          })
        }
      />
      <InputField
        label="Instagram handle"
        value={instagram}
        onChange={(e) =>
          dispatch({
            type: "field",
            field: "socials",
            value: { ...state.socials, instagram: e.target.value },
          })
        }
      />
      <InputField
        label="Facebook url"
        value={facebook}
        onChange={(e) =>
          dispatch({
            type: "field",
            field: "socials",
            value: { ...state.socials, facebook: e.target.value },
          })
        }
      />
      <InputField
        label="LinkedIn url"
        value={linkedin}
        onChange={(e) =>
          dispatch({
            type: "field",
            field: "socials",
            value: { ...state.socials, linkedin: e.target.value },
          })
        }
      />
      <InputField
        label="github handle"
        value={github}
        onChange={(e) =>
          dispatch({
            type: "field",
            field: "socials",
            value: { ...state.socials, github: e.target.value },
          })
        }
      />
      <InputField
        label="hashnode handle"
        value={hashnode}
        onChange={(e) =>
          dispatch({
            type: "field",
            field: "socials",
            value: { ...state.socials, hashnode: e.target.value },
          })
        }
      />
      <InputField
        label="dev.to handle"
        value={devto}
        onChange={(e) =>
          dispatch({
            type: "field",
            field: "socials",
            value: { ...state.socials, devto: e.target.value },
          })
        }
      />
      <InputField
        label="medium handle"
        value={medium}
        onChange={(e) =>
          dispatch({
            type: "field",
            field: "socials",
            value: { ...state.socials, medium: e.target.value },
          })
        }
      />
      <InputField
        label="Whatsapp number"
        value={whatsapp}
        onChange={(e) =>
          dispatch({
            type: "field",
            field: "socials",
            value: { ...state.socials, whatsapp: e.target.value },
          })
        }
      />
    </div>
  );
}
