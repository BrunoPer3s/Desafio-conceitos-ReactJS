import React, { useState, useEffect} from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Mobile com React ",
      url : "Bruno Curcio",
      techs: ['Node.js', 'ReactJS']
    });

    
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);


   // const newRepositories = repositories.filter(
   //   repository => repository.id !== id
   // )

    setRepositories(repositories.filter(
      repository => repository.id != id
    ));
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
            <li key={repository.id}>{repository.title}
            <button className="add" type="button" onClick={handleAddRepository}>Adicionar</button>
            <button className="remove" type="button" onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          ))}          
      </ul>
    </>
  );
}

export default App;
