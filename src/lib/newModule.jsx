import { v4 as uuidv4 } from "uuid";

// Function to add a new module to local storage
const newModule = (module) => {
  try {
    // Retrieve existing modules from local storage
    const existingModules = JSON.parse(localStorage.getItem("modules")) || [];

    // Validate unique ID
    if (!module.id) {
      // Generate a unique ID for the module if not provided
      module.id = uuidv4();
    } else {
      // Check if the ID already exists in the modules array
      const isIdExist = existingModules.some(
        (existingModule) => existingModule.id === module.id
      );
      if (isIdExist) {
        throw new Error("Module ID already exists");
      }
    }

    // Append the new module to the existing modules array
    const updatedModules = [...existingModules, module];

    // Store the updated modules array back in local storage
    localStorage.setItem("modules", JSON.stringify(updatedModules));

    window.dispatchEvent(new Event("moduleAdded"));
    return { success: true, message: "Module added successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default newModule;
