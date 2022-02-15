import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAdmin } from "../context/adminContext";
import { GoTrashcan } from "react-icons/go";
import { MdDragIndicator } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import PropTypes from "prop-types";

export default function LinkCardEditable({ id, Link }) {
  const { state, dispatch } = useAdmin();
  const { links } = state;

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (value) => {
    const updatedLinks = links;

    updatedLinks[id] = value;

    dispatch({ type: "field", field: "links", value: updatedLinks });
  };

  const handleRemoveLink = () => {
    const updatedLinks = links.filter((_, index) => id !== index);

    dispatch({ type: "field", field: "links", value: updatedLinks });
  };

  const handleSave = () => {
    handleEdit({
      title: title,
      link: link,
      description: description,
      active: active,
    });
    setEditMode(false);
  };

  const handleCancel = () => {
    setTitle(Link.title);
    setLink(Link.link);
    setDescription(Link.description);
    setActive(Link.active);
    setEditMode(false);
  };

  const handleChecked = (e) => {
    setActive(e.target.checked);
    handleEdit({
      title: title,
      link: link,
      description: description,
      active: e.target.checked,
    });
  };

  useEffect(() => {
    if (Link) {
      setTitle(Link.title);
      setLink(Link.link);
      setDescription(Link.description);
      setActive(Link.active);
    }
  }, [Link]);

  return (
    <Draggable
      key={Link.title || id}
      draggableId={Link.title || `${id}`}
      index={id}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{ ...provided.draggableProps.style }}
          className="w-full p-2 flex justify-between items-center first-of-type:mt-4 last-of-type:mb-4 cursor-pointer"
        >
          <div
            className={`flex flex-1 bg-gray-100 rounded-xl ${
              snapshot.isDragging ? "shadow-2xl" : "shadow-md"
            }`}
          >
            {!editMode ? (
              <>
                <div
                  onClick={() => setEditMode(true)}
                  className={`px-4 flex justify-center items-center flex-1 ${Link.linkStyle}`}
                >
                  <HiOutlinePencil size={25} className="text-gray-500" />
                  <div className="p-2 flex-1 flex flex-col justify-center items-center space-y-1">
                    <p className="text-lg font-bold">{Link.title}</p>
                    <p className="text-sm text-center font-semibold">
                      {Link.description}
                    </p>
                  </div>
                </div>
                <div className="p-2 flex flex-col justify-around items-center space-y-2">
                  <label
                    htmlFor={id}
                    className="flex items-center cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={id}
                        className="sr-only"
                        checked={active}
                        onChange={handleChecked}
                      />
                      <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </div>
                  </label>
                  <GoTrashcan
                    size={25}
                    onClick={handleRemoveLink}
                    className="text-gray-500 cursor-pointer"
                  />
                </div>
              </>
            ) : (
              <div className="p-4 flex flex-1 flex-col space-y-4 bg-white rounded-lg shadow-md">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="p-2 font-bold rounded-md border outline-none"
                ></input>
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Link"
                  className="p-2 font-semibold rounded-md border outline-none"
                ></input>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="p-2 font-semibold rounded-md border outline-none"
                ></input>
                <div className="flex justify-around items-center space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-10 py-2 text-white font-inter font-bold rounded-md bg-rose-400 hover:bg-rose-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-10 py-2 text-white font-inter font-bold rounded-md bg-rose-400 hover:bg-rose-300"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
          <div
            {...provided.dragHandleProps}
            className="p-2 flex justify-center items-center"
          >
            <MdDragIndicator size={40} className="text-gray-400" />
          </div>
        </div>
      )}
    </Draggable>
  );
}

LinkCardEditable.propTypes = {
  id: PropTypes.number,
  Link: PropTypes.object.isRequired,
};
