import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { db, storage } from "../lib/firebase";
import { useAuth } from "./authContext";
import {
  doc,
  setDoc,
  getDocs,
  where,
  collection,
  query,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  limit,
} from "firebase/firestore";

const FirebaseContext = createContext();

export function useFirestore() {
  return useContext(FirebaseContext);
}

export function FirestoreProvider({ children }) {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const unsubUser = onSnapshot(
        doc(db, "users", `${currentUser.uid}`),
        (doc) => {
          setUserData(doc.data());
        },
      );

      return () => {
        unsubUser();
      };
    } else {
      setUserData(null);
    }
  }, [currentUser]);

  function createUser(uid, username, emailAddress) {
    return setDoc(doc(db, "users", `${uid}`), {
      userId: uid,
      username: username,
      page: {
        imgSrc: "",
        profileName: "",
        about: "",
        links: [],
        appearance: {
          background: "",
          backgroundColor: "#f3f4f6",
          font: "Nunito",
          fontColor: "#000",
          linkStyle: {
            rounded: true,
            filled: true,
            shadow: false,
            special: "",
          },
          linkColor: "#fff",
          linkFontColor: "#000",
        },
      },
      email: emailAddress.toLowerCase(),
      dateCreated: serverTimestamp(),
    });
  }

  function updateProfile(userId, data) {
    const DocRef = doc(db, "users", `${userId}`);

    return updateDoc(DocRef, data);
  }

  async function getUserDoc(username) {
    let userDoc = null;

    const ref = collection(db, "users");

    const q = query(ref, where("username", "==", `${username}`), limit(1));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.exists()) userDoc = doc.data().page;
    });

    return userDoc;
  }

  const value = {
    userData,
    storage,
    createUser,
    updateProfile,
    getUserDoc,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

FirestoreProvider.propTypes = {
  children: PropTypes.element,
};
