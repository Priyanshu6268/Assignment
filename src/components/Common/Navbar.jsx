import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropup, IoIosLink } from "react-icons/io";
import { LiaUploadSolid } from "react-icons/lia";
import FileUploadComponent from "./FileUpload";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font pb-5">
      <div className="flex justify-between md:flex-row items-center ">
        <h1 className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className=" text-xl font-bold">Course Builder</span>
        </h1>

        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            className="btn m-1 bg-[#AF273E] hover:bg-[#AF273E]/80"
          >
            <AiOutlinePlus color="white" size={20} />
            <p className="text-white">Add</p>
            <IoMdArrowDropup color="white" size={20} />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content bg-white z-[1] py-2 shadow rounded-box w-52 text-sm "
          >
            <li className="text-[#717171] hover:text-black">
              <label
                htmlFor="create_module"
                className="flex gap-x-2 py-2 w-full hover:bg-[#F2F2F2] px-5"
              >
                <>
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.875 4.29492C1.875 3.25939 2.71447 2.41992 3.75 2.41992H16.25C17.2855 2.41992 18.125 3.25939 18.125 4.29492V16.7949C18.125 17.8305 17.2855 18.6699 16.25 18.6699H3.75C2.71447 18.6699 1.875 17.8305 1.875 16.7949V4.29492ZM3.125 12.4199H16.875V8.66992H3.125V12.4199ZM3.125 13.6699V16.7949C3.125 17.1401 3.40482 17.4199 3.75 17.4199H16.25C16.5952 17.4199 16.875 17.1401 16.875 16.7949V13.6699H3.125ZM16.875 4.29492V7.41992H3.125V4.29492C3.125 3.94974 3.40482 3.66992 3.75 3.66992H16.25C16.5952 3.66992 16.875 3.94974 16.875 4.29492Z"
                      fill="#717171"
                    />
                  </svg>
                </>
                Create module
              </label>
            </li>
            <li className="text-[#717171] hover:text-black">
              <label
                htmlFor="add_link"
                className="flex gap-x-2 py-2 w-full hover:bg-[#F2F2F2] px-5"
              >
                <IoIosLink size={20} />
                Add a link
              </label>
            </li>
            <li className="text-[#717171] hover:text-black">
              <FileUploadComponent />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
