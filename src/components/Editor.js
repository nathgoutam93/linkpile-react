import React from "react";
import { useAdmin } from "../context/adminContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import LinkCardEditable from "./LinkCardEditable";
import ProfileCard from "./ProfileCard";
import { useFirestore } from "../context/firestoreContext";

export default function Editor() {
  const { userData } = useFirestore();
  const { state, dispatch } = useAdmin();
  const { error, links } = state;

  const handleNewLink = () => {
    dispatch({
      type: "field",
      field: "links",
      value: [...links, { title: "", link: "", description: "", active: true }],
    });
  };

  if (!userData)
    return (
      <div className="w-full space-y-4">
        <div className="shine w-full h-80 rounded-xl shadow-md"></div>
        <div className="w-full flex flex-col space-y-4">
          <div className="shine w-full h-24 rounded-xl shadow-md"></div>
          <div className="shine w-full h-24 rounded-xl shadow-md"></div>
          <div className="shine w-full h-24 rounded-xl shadow-md"></div>
        </div>
      </div>
    );

  return (
    <>
      {error && <p className="text-red-700 text-base font-semibold">{error}</p>}

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
              className="w-full flex flex-col space-y-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {links?.map((link, index) => {
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
      <div className="flex justify-around items-center space-x-2">
        <button
          onClick={handleNewLink}
          className="flex-1 px-5 py-2 flex justify-center items-center text-white bg-primary-accent rounded-xl space-x-4 hover:bg-secondary-accent"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <span className="text-lg font-nunito">Add Link</span>
        </button>
        <button className="px-5 py-2 flex justify-center items-center text-white bg-black rounded-xl space-x-4 hover:bg-gray-800">
          <span className="text-lg font-nunito">Explore Links</span>
        </button>
      </div>
    </>
  );
}
