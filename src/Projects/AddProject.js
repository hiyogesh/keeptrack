import React, { useState } from "react";
import { Project } from "./Project";

function AddProject({ Project, onSubmit, buttonValue }) {
  const [name, setName] = useState(Project.name);
  const [description, setDescription] = useState(Project.description);
  const [imageUrl, stImageUrl] = useState(Project.imageUrl);
  const [contractTypeId, setContractTypeId] = useState(Project.contractTypeId);
  const [contractSignedOn, setContractSignedOn] = useState(
    Project.contractSignedOn
  );
  const [budget, setyBudget] = useState(Project.budget);
  const [isActive, setIsActive] = useState(Project.isActive);
  function ID() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }
  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const submittedItem = {
      id: project ? project.id : ID(),
      name: name,
      description: description,
      imageUrl: imageUrl,
      contractTypeId: contractTypeId,
      contractSignedOn: contractSignedOn,
      budget: budget,
      isActive: isActive,
    };

    onSubmit(submittedItem);
    setName("");
    setDescription("");
    stImageUrl("");
    setContractTypeId("");
    setContractSignedOn("");
    setyBudget("");
    setIsActive("");
  };

  return (
    <>
      <div>AddProject</div>
      <form onSubmit={handleFormSubmit}>
        <input value={name} onChange={handleChange}></input>
        <input value={description} onChange={handleChange}></input>
        <input value={imageUrl} onChange={handleChange}></input>
        <input value={contractTypeId} onChange={handleChange}></input>
        <input value={contractSignedOn} onChange={handleChange}></input>
        <input value={budget} onChange={handleChange}></input>
        <input value={isActive} onChange={handleChange}></input>
        <button>{buttonValue || "Save"}</button>
      </form>
    </>
  );
}

export default AddProject;
