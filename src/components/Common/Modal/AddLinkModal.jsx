import React, { useRef, useState } from "react";
import newModule from "../../../lib/newModule";

function AddLinkModal() {
  const checkboxRef = useRef(null);
  const [url, setUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  const handleAddNewLink = () => {
    const module = {
      type: "MODULE",
      fileType: "LINK",
      displayName: displayName,
      fileUrl: url,
      children: [],
    };
    newModule(module);
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  return (
    <>
      <input
        ref={checkboxRef}
        type="checkbox"
        id="add_link"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="p-2">
            <div className="flex justify-between items-center pb-5">
              <h3 className="font-bold text-lg">Add new link</h3>
              <label
                htmlFor="add_link"
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </label>
            </div>

            <div>
              <label
                htmlFor="link_title"
                className="block mt-2 font-semibold pb-2"
              >
                URL
              </label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                id="link_title"
                className="input input-bordered w-full"
                placeholder="Enter link title"
              />

              <label
                htmlFor="link_title"
                className="block mt-2 font-semibold pb-2 pt-5"
              >
                Display name
              </label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                type="text"
                id="link_title"
                className="input input-bordered w-full"
                placeholder="Enter link title"
              />
            </div>

            <div className="modal-action">
              <label htmlFor="add_link" className="btn bg-white border rounded-lg">
                Close!
              </label>
              <button
                onClick={handleAddNewLink}
                className="btn btn-primary text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddLinkModal;
