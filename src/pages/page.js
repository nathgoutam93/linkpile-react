import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Page from "../components/page";
import { useFirestore } from "../context/firestoreContext";
import { MdOutlineError } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";
import Toast from "../components/commons/toast";
import { initialState } from "../reducers/adminReducer";

export default function UserPage() {
  const { userId } = useParams();
  const { getUserDoc } = useFirestore();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getUserDoc(userId).then((doc) => {
      setData(doc);
      setLoading(false);
    });
  }, [userId, getUserDoc]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="loader" />
      </div>
    );

  if (!data)
    return (
      <div className="flex h-screen w-full items-center justify-center space-x-2">
        <MdOutlineError size={45} className="text-gray-100" />
        <h1 className="font-nunito text-3xl font-semibold text-white">
          User not found
        </h1>
        <Link
          to={"/"}
          className="font-extraboldbold fixed bottom-10 bg-gradient-to-r from-rose-400 via-fuchsia-400 to-blue-400 bg-clip-text font-nunito text-2xl text-transparent"
        >
          Link.pile
        </Link>
      </div>
    );

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://linkpile-bffd7.web.app/${userId}`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div>
      <div className="h-screen w-full">
        <Toast show={showToast} message="Copied to Clipboard" />

        <IoShareOutline
          className="fixed top-5 right-5 cursor-pointer text-gray-400 lg:top-10 lg:right-10"
          size={35}
          onClick={handleCopy}
        />

        <Page
          styleClasses="w-full h-full pt-10 p-4 flex flex-col items-center space-y-2 overflow-y-auto s_hide"
          username={userId}
          imgSrc={data.imgSrc || initialState.imgSrc}
          profileName={data.profileName || initialState.profileName}
          about={data.about || initialState.about}
          links={data.links || initialState.links}
          appearance={data.appearance || initialState.appearance}
          socials={data.socials || initialState.socials}
        />
      </div>
    </div>
  );
}
