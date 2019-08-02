import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

function Genres() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('api/genres')
      .then(({ data }) => {
        setData(data.data);
      });
  }, []);

  const renderLines = genres => {
    return (
      <tr key={genres.id}>
        <th scope='row'>{genres.id}</th>
        <td>{genres.name}</td>
        <td>
          <button className="btn btn-danger brn-sm">Exluir</button>
        </td>
      </tr>
    );
  }

  if (!data.length) {
    return (
      <div className='container'>
        <h1>Gêneros</h1>
        <Link className="btn btn-primary" to='/generos/novo'>Novo Gênero</Link>
        <div className='alert alert-info' role='alert'>
          Você não possui nenhum gênero cadastrado ainda.
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Gêneros</h1>
      <Link className="btn btn-primary" to='/generos/novo'>Novo Gênero</Link>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nome</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderLines)}
        </tbody>
      </table>
    </div>
  );
}

export default Genres;