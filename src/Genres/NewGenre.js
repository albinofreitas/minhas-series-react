import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

function NewGenre() {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const onChange = event => {
    setName(event.target.value);
  }

  const saveGenre = () => {
    if (!name.length) {
      return;
    }

    axios
      .post('/api/genres', { name })
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

export default NewGenre;