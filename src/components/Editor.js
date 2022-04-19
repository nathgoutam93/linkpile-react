import React, { useState } from "react";
import { useAdmin } from "../context/adminContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import LinkCardEditable from "./LinkCardEditable";
import ProfileCard from "./ProfileCard";
import { useFirestore } from "../context/firestoreContext";
import { HiOutlineLink } from "react-icons/hi";
import SocialIconCard from "./SocialIconCard";
import EmbedModal from "./embedModal";
import EmbedEditable from "./EmbedEditable";

export default function Editor() {
  const { userData } = useFirestore();
  const { state, dispatch } = useAdmin();
  const { error, links } = state;

  const [showModal, setShowModal] = useState(false);

  const handleNewLink = () => {
    dispatch({
      type: "field",
      field: "links",
      value: [...links, { title: "", link: "", description: "", active: true }],
    });
  };

  if (!userData)
    return (
      <div className="my-2 w-full space-y-4">
        <div className="shine h-80 w-full rounded-xl shadow-md"></div>
        <div className="flex w-full flex-col space-y-4">
          <div className="shine h-24 w-full rounded-xl shadow-md"></div>
          <div className="shine h-24 w-full rounded-xl shadow-md"></div>
          <div className="shine h-24 w-full rounded-xl shadow-md"></div>
        </div>
      </div>
    );

  return (
    <>
      {error && <p className="text-base font-semibold text-red-700">{error}</p>}

      <ProfileCard />

      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          const newLinks = [...links];
          const draggeditem = newLinks.splice(srcI, 1);
          newLinks.splice(desI, 0, ...draggeditem);
          dispatch({ type: "field", field: "links", value: newLinks });
        }}
      >
        <Droppable droppableId="dropable-1">
          {(provided, _) => (
            <div
              key="dropable-1"
              className="my-2 flex w-full flex-col space-y-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {links?.map((link, index) => {
                if (link.embed)
                  return (
                    <EmbedEditable
                      key={link.title || index}
                      id={index}
                      Link={link}
                    />
                  );
                return (
                  <LinkCardEditable
                    key={link.title || index}
                    id={index}
                    Link={link}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="my-4 flex items-center justify-around space-x-2">
        <button
          onClick={handleNewLink}
          className="flex flex-1 items-center justify-center space-x-4 rounded-xl bg-primary-accent px-5 py-2 text-white hover:bg-secondary-accent"
        >
          <HiOutlineLink size={25} />
          <span className="font-nunito text-lg">Add Link</span>
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center space-x-4 rounded-xl bg-black px-5 py-2 text-white hover:bg-gray-800"
        >
          <span className="font-nunito text-lg">Explore Links</span>
        </button>
      </div>
      {showModal && (
        <div
          onClick={() => setShowModal(!showModal)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <EmbedModal />
        </div>
      )}
      <SocialIconCard />
    </>
  );
}
