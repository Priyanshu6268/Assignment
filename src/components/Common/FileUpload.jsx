import React from "react";
import { LiaUploadSolid } from "react-icons/lia";
import newModule from "../../lib/newModule";
const FileUploadComponent = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (file && allowedTypes.includes(file.type)) {
      let fileType = "Unknown";
      if (file.type.startsWith("image")) {
        fileType = "Image";
      } else if (file.type === "application/pdf") {
        fileType = "PDF";
      }
      const selectedFile = {
        type: "MODULE",
        fileType: fileType,
        fileUrl: URL.createObjectURL(file),
        displayName: file.name,
        children: [],
      };

      // Call the newModule function here
      newModule(selectedFile);
      window.dispatchEvent(new Event("moduleAdded"));
      alert("File uploaded successfully.");
    } else {
      alert("Please select a valid file (JPEG, PNG, or PDF).");
    }
  };

  return (
    <div>
      <input
        type="file"
        id="upload_file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/jpeg, image/png, application/pdf"
        className="hidden"
      />
      <label
        htmlFor="upload_file"
        className="flex gap-x-2 py-2 w-full hover:bg-[#F2F2F2] px-5 cursor-pointer"
      >
        <LiaUploadSolid size={20} /> Upload
      </label>
    </div>
  );
};

export default FileUploadComponent;
