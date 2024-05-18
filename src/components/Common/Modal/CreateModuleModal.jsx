import React, { useRef, useState } from "react";
import newModule from "../../../lib/newModule";
function CreateModuleModal() {
  const [moduleTitle, setModuleTitle] = useState("");
  const checkboxRef = useRef(null);

  const handleCreateModule = () => {
    const module = {
      type: "MODULE",
      fileType: "FOLDER",
      displayName: moduleTitle,
      fileUrl: null,
      children: [],
    };

    // Call the newModule function here
    newModule(module);

    // Close the modal by unchecking the checkbox
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="create_module"
        className="modal-toggle"
        ref={checkboxRef}
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="p-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Create new module</h3>
              <label
                htmlFor="create_module"
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </label>
            </div>

            <div className="pt-5">
              <label
                htmlFor="module_title"
                className="block mt-2 font-semibold pb-2"
              >
                Module name
              </label>
              <input
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                type="text"
                id="module_title"
                className="input input-bordered w-full"
                placeholder="Enter module title"
              />
            </div>

            <div className="modal-action pt-7">
              <label
                htmlFor="create_module"
                className="btn bg-white border rounded-lg"
              >
                Cancel
              </label>
              <button
                onClick={handleCreateModule}
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

export default CreateModuleModal;
