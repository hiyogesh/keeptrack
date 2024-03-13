import React, { useState, useEffect } from "react";
//import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";

import { projectAPI } from "./projectAPI";
import { Project } from "./Project";
import AddProject from "./AddProject";
function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  const saveProject = (project) => {
    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
        console.log(project);
      })
      .catch((e) => {
        setError(e.message);
      });
  };
  const addProject = (project) => {
    projectAPI
      .post(project)
      .then((newProject) => {
        setProjects([...ProjectsPage, newProject]);
        console.log(project);
      })
      .catch((e) => {
        setError(e.message);
      });
  };
  const deleteProject = (project) => {
    projectAPI
      .delete(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p) => {
          return p.id !== project.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
        console.log(project);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        setError(null);

        setProjects(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [currentPage]);
  return (
    <>
      <h1>Projects</h1>;
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      <AddProject project="" onSubmit={addProject} buttonValue="Add" />
      <ProjectList
        projects={projects}
        onSave={saveProject}
        onDelete={deleteProject}
      />
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default ProjectsPage;
