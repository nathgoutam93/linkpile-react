import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useAdmin } from '../context/adminContext';

export default function LinkCardEditable({ id, Link }) {
  const { state, dispatch } = useAdmin();
  const { links } = state;

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const linkStyle = 'bg-white rounded-xl shadow-md';

  const handleEdit = (value) => {
    let updatedLinks = links;

    updatedLinks[id] = value;

    dispatch({ type: 'field', field: 'links', value: updatedLinks });
  };

  const handleRemoveLink = () => {
    const updatedLinks = links.filter((_, index) => id !== index);

    dispatch({ type: 'field', field: 'links', value: updatedLinks });
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
              snapshot.isDragging ? 'shadow-2xl' : 'shadow-md'
            }`}
          >
            {!editMode ? (
              <>
                <div
                  onClick={() => setEditMode(true)}
                  className={`px-4 flex justify-center items-center flex-1 ${linkStyle}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
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
                  <svg
                    onClick={handleRemoveLink}
                    className="h-8 w-8 text-gray-500 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
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
            <svg className="w-8 h-8" viewBox="0 0 12 22" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 4C0.89543 4 -1.35705e-07 3.10457 -8.74228e-08 2C-3.91405e-08 0.89543 0.895431 -1.35705e-07 2 -8.74228e-08C3.10457 -3.91405e-08 4 0.895431 4 2C4 3.10457 3.10457 4 2 4ZM2 13C0.89543 13 -5.29108e-07 12.1046 -4.80825e-07 11C-4.32543e-07 9.89543 0.89543 9 2 9C3.10457 9 4 9.89543 4 11C4 12.1046 3.10457 13 2 13ZM-8.74228e-07 20C-9.2251e-07 21.1046 0.89543 22 2 22C3.10457 22 4 21.1046 4 20C4 18.8954 3.10457 18 2 18C0.89543 18 -8.25945e-07 18.8954 -8.74228e-07 20Z"
                fill="#888888"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 4C8.89543 4 8 3.10457 8 2C8 0.89543 8.89543 -1.35705e-07 10 -8.74228e-08C11.1046 -3.91405e-08 12 0.895431 12 2C12 3.10457 11.1046 4 10 4ZM10 13C8.89543 13 8 12.1046 8 11C8 9.89543 8.89543 9 10 9C11.1046 9 12 9.89543 12 11C12 12.1046 11.1046 13 10 13ZM8 20C8 21.1046 8.89543 22 10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20Z"
                fill="#888888"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </Draggable>
  );
}
