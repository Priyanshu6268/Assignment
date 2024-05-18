import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DeleteModuleModal() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [moduleName, setModuleName] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    // Fetch module data from localStorage based on the ID
    const modules = JSON.parse(localStorage.getItem("modules")) || [];
    const module = modules.find((mod) => mod.id === id);
    if (module) {
      setModuleName(module.displayName);
    }
  }, [location]);

  const handleDeleteModule = () => {
    // Retrieve modules from localStorage
    const modules = JSON.parse(localStorage.getItem("modules")) || [];

    // Filter out the module with the matching ID
    const updatedModules = modules.filter((module) => module.id !== id);

    // Update localStorage with the filtered modules
    localStorage.setItem("modules", JSON.stringify(updatedModules));
    window.dispatchEvent(new Event("moduleAdded"));

    // Redirect to the home page after deleting the module
    ref.current.checked = false;
    navigate("/");
  };

  return (
    <>
      <input
        ref={ref}
        type="checkbox"
        id="delete_module"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="p-2">
            <div className="flex justify-between items-center pb-5">
              <h3 className="font-bold text-lg">Delete Module</h3>
            </div>

            <div>
              <p>
                Are you sure you want to delete{" "}
                <span className="font-bold text-xl">{moduleName}</span>?
              </p>
            </div>

            <div className="modal-action">
              <label
                htmlFor="delete_module"
                className="btn bg-white border rounded-lg"
              >
                Cancel
              </label>
              <button
                onClick={handleDeleteModule}
                className="btn btn-primary text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModuleModal;
