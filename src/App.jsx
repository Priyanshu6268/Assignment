import React from "react";
import EmptyScreen from "./components/Common/EmptyScreen";
import ModalProvider from "./components/Common/Modal/ModalProvider";
import Navbar from "./components/Common/Navbar";
import ModuleSection from "./components/ModuleComponents/ModuleSection";
import { BrowserRouter } from "react-router-dom";
function App() {
  const isEmpty = JSON.parse(localStorage.getItem("modules"));

  return (
    <BrowserRouter>
      <main className="p-5 md:px-32 lg:px-48">
        <ModalProvider>
          <Navbar />
          {!isEmpty && <EmptyScreen />}
          <ModuleSection />
        </ModalProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
