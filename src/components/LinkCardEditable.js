import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAdmin } from "../context/adminContext";
import { GoTrashcan } from "react-icons/go";
import { MdDragIndicator } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import PropTypes from "prop-types";
import InputField from "./commons/inputField";

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
          className="flex w-full cursor-pointer items-center justify-between first-of-type:mt-2 last-of-type:mb-2"
        >
          <div
            className={`flex flex-1 rounded-xl border border-gray-300 bg-white dark:border-border-dark dark:bg-secondary ${
              snapshot.isDragging ? "shadow-2xl" : ""
            }`}
          >
            {!editMode ? (
              <>
                <div
                  onClick={() => setEditMode(true)}
                  className={`flex flex-1 items-center justify-center px-4 ${Link.linkStyle}`}
                >
                  <HiOutlinePencil size={25} className="text-gray-400" />
                  <div className="flex flex-1 flex-col items-center justify-center space-y-1 p-2">
                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                      {Link.title}
                    </p>
                    <p className="text-center text-sm font-semibold text-gray-800 dark:text-white">
                      {Link.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-around space-y-2 p-2">
                  <label
                    htmlFor={id}
                    className="flex cursor-pointer items-center"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={id}
                        className="sr-only"
                        checked={active}
                        onChange={handleChecked}
                      />
                      <div className="block h-6 w-10 rounded-full bg-gray-400"></div>
                      <div className="dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition"></div>
                    </div>
                  </label>
                  <GoTrashcan
                    size={25}
                    onClick={handleRemoveLink}
                    className="cursor-pointer text-gray-400"
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col space-y-4 rounded-xl bg-white p-4 dark:bg-secondary">
                <InputField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <InputField
                  label="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <InputField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex items-center justify-around space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex-1 rounded-md bg-primary-accent px-10 py-2 font-inter font-bold text-white hover:bg-secondary-accent"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 rounded-md bg-primary-accent px-10 py-2 font-inter font-bold text-white hover:bg-secondary-accent"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
          <div
            {...provided.dragHandleProps}
            className="flex items-center justify-center pl-2"
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
