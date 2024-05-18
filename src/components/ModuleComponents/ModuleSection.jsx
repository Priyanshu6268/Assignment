import React, { useState, useEffect } from "react";
import ModuleItem from "./ModuleItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function ModuleSection() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModulesFromLocalStorage = () => {
      const storedModules = JSON.parse(localStorage.getItem("modules")) || [];
      setModules(storedModules);
    };

    fetchModulesFromLocalStorage();

    const handleStorageChange = () => {
      fetchModulesFromLocalStorage();
    };

    window.addEventListener("moduleAdded", handleStorageChange);

    return () => {
      window.removeEventListener("moduleAdded", handleStorageChange);
    };
  }, []);

  const saveModulesToLocalStorage = (updatedModules) => {
    localStorage.setItem("modules", JSON.stringify(updatedModules));
  };

  const addChildModule = (childId, parentId) => {
    const updatedModules = [...modules];
    const childModule = findAndRemoveModule(updatedModules, childId);
    if (!childModule) return;

    const parentModule = findModuleById(updatedModules, parentId);
    if (!parentModule) return;

    if (!parentModule.children) {
      parentModule.children = [];
    }

    parentModule.children.push(childModule);
    setModules(updatedModules);
    saveModulesToLocalStorage(updatedModules);
  };

  const moveModuleWithinSiblings = (draggedId, targetId) => {
    const updatedModules = [...modules];
    const parent = findParentModule(updatedModules, draggedId);
    if (!parent) {
      // Root level reordering
      const draggedIndex = updatedModules.findIndex(
        (module) => module.id === draggedId
      );
      const targetIndex = updatedModules.findIndex(
        (module) => module.id === targetId
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [draggedModule] = updatedModules.splice(draggedIndex, 1);
        updatedModules.splice(targetIndex, 0, draggedModule);
        setModules(updatedModules);
        saveModulesToLocalStorage(updatedModules);
      }
      return;
    }

    const siblings = parent.children;
    const draggedIndex = siblings.findIndex(
      (module) => module.id === draggedId
    );
    const targetIndex = siblings.findIndex((module) => module.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedModule] = siblings.splice(draggedIndex, 1);
      siblings.splice(targetIndex, 0, draggedModule);
      setModules(updatedModules);
      saveModulesToLocalStorage(updatedModules);
    }
  };

  const findAndRemoveModule = (modules, id) => {
    for (let i = 0; i < modules.length; i++) {
      if (modules[i].id === id) {
        return modules.splice(i, 1)[0];
      }
      if (modules[i].children) {
        const childModule = findAndRemoveModule(modules[i].children, id);
        if (childModule) {
          return childModule;
        }
      }
    }
    return null;
  };

  const findModuleById = (modules, id) => {
    for (const module of modules) {
      if (module.id === id) {
        return module;
      }
      if (module.children) {
        const childModule = findModuleById(module.children, id);
        if (childModule) {
          return childModule;
        }
      }
    }
    return null;
  };

  const findParentModule = (modules, id) => {
    for (const module of modules) {
      if (module.children) {
        if (module.children.some((child) => child.id === id)) {
          return module;
        }
        const parent = findParentModule(module.children, id);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-y-5">
        {modules.map((module) => (
          <ModuleItem
            key={module.id}
            module={module}
            addChildModule={addChildModule}
            moveModuleWithinSiblings={moveModuleWithinSiblings}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default ModuleSection;
