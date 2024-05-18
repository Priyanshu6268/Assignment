import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditModule() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [module, setModule] = useState(null);
  const [moduleTitle, setModuleTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const checkboxRef = useRef(null);

  useEffect(() => {
    // Fetch module data from localStorage based on the ID
    const modules = JSON.parse(localStorage.getItem("modules")) || [];
    const module = modules.find((mod) => mod.id === id);
    if (module) {
      setModule(module);
      setModuleTitle(module.displayName);
      setFileUrl(module.fileUrl);
    }
  }, [id]);

  const handleCreateModule = () => {
    if (!module) return;

    // Create a new module object with updated properties
    let updatedModule;
    if (module.fileType === "LINK") {
      updatedModule = {
        ...module,
        displayName: moduleTitle,
        fileUrl: fileUrl,
      };
    } else {
      updatedModule = {
        ...module,
        displayName: moduleTitle,
      };
    }

    // Update module in localStorage
    const modules = JSON.parse(localStorage.getItem("modules")) || [];
    const updatedModules = modules.map((mod) =>
      mod.id === id ? updatedModule : mod
    );
    localStorage.setItem("modules", JSON.stringify(updatedModules));

    // Close the modal by unchecking the checkbox
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
      window.dispatchEvent(new Event("moduleAdded"));
      navigate("/");
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="edit_module"
        className="modal-toggle"
        ref={checkboxRef}
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="p-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {module && module.fileType === "FOLDER"
                  ? "Edit Module"
                  : "Edit File"}
              </h3>
              <label
                htmlFor="edit_module"
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </label>
            </div>

            {module && module.fileType === "LINK" && (
              <div className="pt-5">
                <label
                  htmlFor="file_url"
                  className="block mt-2 font-medium pb-2"
                >
                  URL
                </label>
                <input
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  type="text"
                  id="file_url"
                  className="input input-bordered w-full"
                  placeholder="Enter URL"
                />
              </div>
            )}

            <div className="pt-5">
              <label
                htmlFor="module_title"
                className="block mt-2 font-medium pb-2"
              >
                {module && module.fileType === "FOLDER"
                  ? "Module name"
                  : module && module.fileType === "LINK"
                  ? "Display name"
                  : "File name"}
              </label>
              <input
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                type="text"
                id="module_title"
                className="input input-bordered w-full"
                placeholder="Enter name"
              />
            </div>

            <div className="modal-action pt-7">
              <label
                htmlFor="edit_module"
                className="btn bg-white border rounded-lg"
              >
                Cancel
              </label>
              <button
                onClick={handleCreateModule}
                className="btn btn-primary text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditModule;
