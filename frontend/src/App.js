import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./App.css";
import backgroundImage from "./assets/background.jpg";

import Header from "./components/Headers";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post("projects", {
      title: `front-end com ReactJS ${Date.now()}`,
      owner: "Augusto Marsola",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />

      <img width={300} src={backgroundImage} alt="" />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar projeto
      </button>
    </>
  );
}

export default App;
