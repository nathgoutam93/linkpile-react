import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../components/page";
import { useFirestore } from "../context/firestoreContext";
import { IoShareOutline } from "react-icons/io5" ; 
import { ShareAdmin } from "../components/share";
import { BsAlignBottom } from "react-icons/bs";
import { useAdmin } from "../context/adminContext";


export default function UserPage() {
  const { userId } = useParams();
  const { getUserDoc } = useFirestore();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const [ buttonAnimate , setButtonAnimate ] = useState(false)
  
  const { state } = useAdmin();
  const { username } = state;

  useEffect(() => {
    getUserDoc(userId).then((doc) => {
      setData(doc);
      setLoading(false);
    });
  }, [userId, getUserDoc]);

  if (loading) return <div className="loader" />;

  if (!data) return <h1>user not found</h1>;

  const buttonAnimation = (e) => {
    navigator.clipboard.writeText(`https://linkpile-bffd7.web.app/${username}`);
    console.log(`https://linkpile-bffd7.web.app/${username}`) ;
    setButtonAnimate(true) ;
      
    setTimeout(() => {
      setButtonAnimate(false) ;
    } , 2000 )

  }

  return (
    <div>
      <div className="w-full h-screen">
        
        <IoShareOutline 
            className="shareIcon"
            size={24}
            onClick={e => buttonAnimation(e)}
        />
          <div className={buttonAnimate  ? "show sharebtn hover:bg-blue-500" : "sharebtn hover:bg-blue-500"}> 
            Copied to clipboard!
          </div>

        <Page
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
