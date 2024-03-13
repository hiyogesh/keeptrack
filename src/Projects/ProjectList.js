import React, { useState } from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

function ProjectList(props) {
  const { projects, onDelete, onSave } = props; //Destructuring
  const [projectBeingEdited, setProjectBeingEdited] = useState({});
  const [projectBeingDeleted, setProjectBeingDeleted] = useState({});
  //<pre>{JSON.stringify(props.projects, null, " ")}</pre>;
  const handleEdit = (project) => {
    //console.log(project);
    setProjectBeingEdited(project);
  };
  const handleDelete = (project) => {
    setProjectBeingDeleted(project);
  };
  const cancelEditing = () => {
    setProjectBeingEdited({});
  };

  const items = projects.map((project) => (
    <div key={project.id} className="cols-sm">
      {project === projectBeingEdited ? (
        <ProjectForm
          onCancel={cancelEditing}
          onSave={onSave}
          project={project}
        />
      ) : (
        <ProjectCard
          project={project}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  ));
  return <div className="row">{items}</div>;
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default ProjectList;
