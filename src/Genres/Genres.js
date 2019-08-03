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

  const deleteGenre = id => {
    axios
      .delete('api/genres/' + id)
      .then(res => {
        const filteredData = data.filter(genre => genre.id !== id);
        setData(filteredData);
      });
  }

  const renderLines = genre => {
    return (
      <tr key={genre.id}>
        <th scope='row'>{genre.id}</th>
        <td>{genre.name}</td>
        <td>
          <div className='btn-group'>
            <Link to={'/generos/' + genre.id} className='btn btn-primary btn-sm'>Editar</Link>
            <button className='btn btn-danger btn-sm' onClick={() => deleteGenre(genre.id)}>Exluir</button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <div className='row'>
        <div className='col-12 mt-2'>
          <h1>Gêneros</h1>
        </div>
        <div className='col-12 mb-2'>
          <Link className='btn btn-primary' to='/generos/novo'>Novo Gênero</Link>
        </div>
      </div>
      {
        !data.length &&
        <div className='alert alert-info' role='alert'>
          Você não possui nenhum gênero cadastrado ainda.
        </div>
      }
      <table className='table table-dark'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nome</th>
            <th scope='col' style={{width: '200px'}}>Ações</th>
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