import React from "react";
import CreateModuleModal from "./CreateModuleModal";
import AddLinkModal from "./AddLinkModal";
import EditModule from "./EditModuleModal";
import DeleteModuleModal from "./DeleteModuleModal";

function ModalProvider({ children }) {
  return (
    <>
      <CreateModuleModal />
      <AddLinkModal />
      <EditModule />
      <DeleteModuleModal />
      {children}
    </>
  );
}

export default ModalProvider;
