import React from "react";
import { Link } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import PropTypes from "prop-types";
import { BsPersonFill } from "react-icons/bs";
import { SiHashnode } from "react-icons/si";
import { FaDev } from "react-icons/fa";
import { GrMedium } from "react-icons/gr";
import { ImWhatsapp } from "react-icons/im";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import Embed from "./Embed";

export default function Page({
  username,
  imgSrc,
  profileName,
  about,
  links,
  appearance,
  socials,
  styleClasses,
}) {
  const {
    background,
    backgroundColor,
    font,
    fontColor,
    linkStyle,
    linkColor,
    linkFontColor,
  } = appearance;

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundColor: backgroundColor,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontFamily: font,
        color: fontColor,
      }}
      className={styleClasses}
    >
      {imgSrc ? (
        <div className="flex h-24 w-24 justify-center">
          <img
            src={imgSrc}
            className="h-24 w-24 rounded-full object-cover"
            alt=""
          />
        </div>
      ) : (
        <div className="flex h-24 w-24 justify-center rounded-full border">
          <BsPersonFill className="h-full w-full p-2 text-gray-500" />
        </div>
      )}
      {profileName ? (
        <h1 className="text-lg font-bold">{profileName}</h1>
      ) : (
        <h1 className="text-lg font-bold">@{username}</h1>
      )}
      <p className="text-center text-base font-semibold">{about}</p>
      <div
        className={`flex w-full flex-col items-center justify-center space-y-4 p-4`}
      >
        {links
          ?.filter((link) => link.active !== false && link.title && link.link)
          .map((link) => {
            if (link.embed)
              return (
                <Embed
                  key={link.title}
                  link={link}
                  linkColor={linkColor}
                  linkFontColor={linkFontColor}
                  linkStyle={linkStyle}
                />
              );
            return (
              <LinkCard
                key={link.title}
                link={link}
                linkStyle={linkStyle}
                linkColor={linkColor}
                linkFontColor={linkFontColor}
              />
            );
          })}
      </div>
      <div className="flex w-3/4 flex-wrap items-center justify-center">
        {socials.twitter && (
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://twitter.com/${socials.twitter}`}
          >
            <FiTwitter
              size={45}
              className="m-1 transition-transform duration-200 hover:scale-110"
            />
          </a>
        )}
        {socials.instagram && (
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://instagram.com/${socials.instagram}`}
          >
            <FiInstagram
              size={45}
              className="m-1 transition-transform duration-200 hover:scale-110"
            />
          </a>
        )}
        {socials.facebook && (
          <a rel="noreferrer" target="_blank" href={socials.facebook}>
            <FiFacebook
              size={45}
              className="m-1 transition-transform duration-200 hover:scale-110"
            />
          </a>
        )}
        {socials.linkedin && (
          <a rel="noreferrer" target="_blank" href={socials.linkedin}>
            <FiLinkedin
              size={45}
              className="m-1 transition-transform duration-200 hover:scale-110"
            />
          </a>
        )}
        {socials.github && (
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://github.com/${socials.github}`}
          >
            <FiGithub
              size={45}
              className="m-1 transition-transform duration-200 hover:scale-110"
            />
          </a>
        )}
        {socials.hashnode && (
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://hashnode.com/@${socials.hashnode}`}
          >
            <SiHashnode
              size={45}
              className="m-1 transition-transform duration-200 hover:scale-110"
            />
          </a>
        )}
        {socials.devto && (
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://dev.to/@${socials.devto}`}
          >
            <FaDev
              size={45}
              className="m-1 transition-transform duration-200 hover:scale-110"
            />
          </a>
        )}
        {socials.medium && (
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://medium.com/@${socials.medium}`}
          >
            <GrMedium
              size={45}
              className="m-1 transition-transform duration-200 hover:scale-110"
            />
          </a>
        )}
        {socials.whatsapp && (
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=${socials.whatsapp}`}
          >
            <ImWhatsapp
              size={45}
              className="m-1 transition-transform duration-200 hover:scale-110"
            />
          </a>
        )}
      </div>
      <Link
        to={"/"}
        className="font-extraboldbold bg-gradient-to-r from-rose-400 via-fuchsia-400 to-blue-400 bg-clip-text font-nunito text-2xl text-transparent"
      >
        Link.pile
      </Link>
    </div>
  );
}

Page.propTypes = {
  username: PropTypes.string,
  imgSrc: PropTypes.string,
  profileName: PropTypes.string,
  about: PropTypes.string,
  links: PropTypes.array,
  appearance: PropTypes.object,
  socials: PropTypes.object,
  styleClasses: PropTypes.string,
};
