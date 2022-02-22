import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Page from "../components/page";
import { useFirestore } from "../context/firestoreContext";
import { MdOutlineError } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";

export default function UserPage() {
  const { userId } = useParams();
  const { getUserDoc } = useFirestore();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const [buttonAnimate, setButtonAnimate] = useState(false);

  useEffect(() => {
    getUserDoc(userId).then((doc) => {
      setData(doc);
      setLoading(false);
    });
  }, [userId, getUserDoc]);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loader" />;
      </div>
    );

  if (!data)
    return (
      <div className="w-full h-screen flex justify-center items-center space-x-2">
        <MdOutlineError size={45} className="text-gray-100" />
        <h1 className="text-3xl text-white font-nunito font-semibold">
          User not found
        </h1>
        <Link
          to={"/"}
          className="fixed bottom-10 text-2xl font-extraboldbold font-nunito text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-blue-400"
        >
          Link.pile
        </Link>
      </div>
    );

  const buttonAnimation = (e) => {
    navigator.clipboard.writeText(`https://linkpile-bffd7.web.app/${userId}`);
    setButtonAnimate(true);

    setTimeout(() => {
      setButtonAnimate(false);
    }, 2000);
  };

  return (
    <div>
      <div className="w-full h-screen">
        <IoShareOutline
          className="shareIcon"
          size={24}
          onClick={buttonAnimation}
        />

        <div
          className={
            buttonAnimate
              ? "show sharebtn hover:bg-blue-500"
              : "sharebtn hover:bg-blue-500"
          }
        >
          Copied to clipboard!
        </div>

        <Page
          styleClasses="w-full h-full pt-10 p-4 flex flex-col items-center space-y-2 overflow-y-auto s_hide"
          username={userId}
          imgSrc={data.imgSrc}
          profileName={data.profileName}
          about={data.about}
          links={data.links}
          appearance={data.appearance}
        />
      </div>
    </div>
  );
}
