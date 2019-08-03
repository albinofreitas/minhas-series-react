import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

function NewSerie() {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const onChange = event => {
    setName(event.target.value);
  }

  const saveSerie = () => {
    if (!name.length) {
      return;
    }

    axios
      .post('/api/series', { name })
      .then(res => {
        setSuccess(true);
      });
  }

  if (success) {
    return <Redirect to='/series'/>
  }

  return (
    <div>
      <h1>Serie</h1>

      <form action=''>
        <div className='form-group'>
          <label htmlFor="name">Nome</label>
          <input type="text" value={name} className='form-control' id='name' onChange={onChange} />
        </div>
        <div>
          <Link to='/series' className='btn btn-dark'>Voltar</Link>
          <button type='button' className='btn btn-primary' onClick={saveSerie}>Salvar</button>
        </div>
      </form>
    </div>
  );
}

export default NewSerie;