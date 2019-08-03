import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

function EditGenre ({match}) {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
    .get('/api/genres/' + match.params.id)
    .then(res => {
      setName(res.data.name);
    })
  }, [match.params.id]);

  const onChange = event => {
    setName(event.target.value);
  }

  const saveGenre = () => {
    if (!name.length) {
      return;
    }

    axios
      .put('/api/genres/' + match.params.id, { name })
      .then(res => {
        setSuccess(true);
      });
  }

  if (success) {
    return <Redirect to='/generos'/>
  }

  return (
    <div>
      <h1>Gênero</h1>

      <form action=''>
        <div className='form-group'>
          <label htmlFor="name">Nome</label>
          <input type="text" value={name} className='form-control' id='name' onChange={onChange} />
        </div>
        <div>
          <Link to='/generos' className='btn btn-dark'>Voltar</Link>
          <button type='button' className='btn btn-primary' onClick={saveGenre}>Salvar</button>
        </div>
      </form>
    </div>
  );
}

export default EditGenre;