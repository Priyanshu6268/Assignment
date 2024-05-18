import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { IoMdArrowDropdown, IoIosLink, IoMdMore } from "react-icons/io";
import { ImFilePdf } from "react-icons/im";
import { CiImageOn } from "react-icons/ci";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import { TfiDownload } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { MdDragHandle } from "react-icons/md";

const ITEM_TYPE = "MODULE_ITEM";

const ModuleItem = ({ module, addChildModule, moveModuleWithinSiblings }) => {
  const navigate = useNavigate();
  const { id, fileType, displayName, children, fileUrl } = module;

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: ITEM_TYPE,
    item: { id, fileType },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    previewOptions: {
      captureDraggingState: true,
    },
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (draggedItem, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;

      if (draggedItem.id !== id && fileType === "FOLDER") {
        moveModuleWithinSiblings(draggedItem.id, id);
      }
    },
    drop: (draggedItem) => {
      if (draggedItem.id !== id) {
        if (fileType === "FOLDER" && draggedItem.fileType !== "FOLDER") {
          addChildModule(draggedItem.id, id);
        }
      }
    },
  });

  const handleClick = () => {
    if (fileType === "FOLDER") {
      return;
    }
    window.open(fileUrl, "_blank");
  };

  const handleOptionsClick = (e) => {
    e.stopPropagation();
    navigate(`?id=${id}`);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-3 bg-white border-y rounded-lg w-full ${
        isDragging ? "opacity-50 h-max w-max" : ""
      }`}
    >
      <div className="flex items-center w-full cursor-pointer group over">
        <div className="cursor-move mr-2">
          <MdDragHandle size={25} />
        </div>
        <div onClick={handleClick}>
          {fileType === "FOLDER" && (
            <IoMdArrowDropdown size={35} className="border rounded-full p-1" />
          )}
          {fileType === "PDF" && (
            <ImFilePdf
              size={35}
              className="p-1 rounded-md bg-[#FFF5F7] text-[#F75961]"
            />
          )}
          {fileType === "LINK" && (
            <IoIosLink
              size={35}
              className="p-1 rounded-md bg-[#EBFCFF] text-[#05B2C7]"
            />
          )}
          {fileType === "Image" && (
            <CiImageOn
              size={35}
              className="p-1 rounded-md bg-indigo-100 text-indigo-500"
            />
          )}
        </div>
        <div onClick={handleClick} className="w-full">
          <h2 className="font-semibold">{displayName}</h2>
          {fileType === "FOLDER" && children.length === 0 && (
            <h2 className="text-sm text-[#717171]">Add item to this module</h2>
          )}
          {fileType === "LINK" && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#717171] group-hover:underline"
            >
              Link
            </a>
          )}
          {fileType === "PDF" && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#717171] group-hover:underline"
            >
              PDF
            </a>
          )}
          {fileType === "Image" && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#717171] group-hover:underline"
            >
              Image
            </a>
          )}
        </div>
        <div className="dropdown dropdown-end">
          <button tabIndex={0} role="button" className="m-1 bg-white">
            <IoMdMore size={25} />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content bg-white z-[1] py-2 shadow rounded-box w-52 text-sm"
          >
            <li className="text-[#717171] hover:text-black">
              <label
                onClick={(e) => handleOptionsClick(e)}
                htmlFor="edit_module"
                className="flex gap-x-2 py-2 w-full hover:bg-[#F2F2F2] px-5"
              >
                <RiEdit2Line size={20} />
                {fileType === "FOLDER" ? "Edit module name" : "Rename"}
              </label>
            </li>
            {["PDF", "Image"].includes(fileType) && (
              <li className="text-[#717171] hover:text-black">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  htmlFor="edit_module"
                  className="flex gap-x-2 py-2 w-full hover:bg-[#F2F2F2] px-5"
                >
                  <TfiDownload size={20} />
                  Download
                </a>
              </li>
            )}
            <li className="text-red-500">
              <label
                onClick={(e) => handleOptionsClick(e)}
                htmlFor="delete_module"
                className="flex gap-x-2 py-2 w-full hover:bg-[#F2F2F2] px-5"
              >
                <RiDeleteBinLine size={20} />
                Delete
              </label>
            </li>
          </ul>
        </div>
      </div>
      {fileType === "FOLDER" && children.length > 0 && (
        <div className="ml-6 mt-2">
          {children.map((child) => (
            <ModuleItem
              key={child.id}
              module={child}
              addChildModule={addChildModule}
              moveModuleWithinSiblings={moveModuleWithinSiblings}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleItem;
