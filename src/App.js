import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";


function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then( response  => {
      setRepository(response.data);
    });
  }, []);
  
  async function handleAddRepository() {
    const newRepository  = await api.post('/repositories', {
    title:  `Projeto criado em ${Date.now()}`,
    url: "github.com/arielkollross",
    techs: ["Node", "React", "Vue"]
  });

  setRepository([...repository, newRepository.data]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`).then(response => {
      if (response.status != 204){
        document.alert("Erro ao deltar")
      }
    });

    const newRepository = repository.filter(repository => repository.id != id);

    setRepository(newRepository);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repository => (
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
