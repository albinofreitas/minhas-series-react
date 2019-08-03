import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

function Series() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('api/series')
      .then(({ data }) => {
        setData(data.data);
      });
  }, []);

  const deleteSerie = id => {
    axios
      .delete('api/series/' + id)
      .then(res => {
        const filteredData = data.filter(genre => genre.id !== id);
        setData(filteredData);
      });
  }

  const renderLines = serie => {
    return (
      <tr key={serie.id}>
        <th scope='row'>{serie.id}</th>
        <td>{serie.name}</td>
        <td>
          <div className='btn-group'>
            <Link to={'/series/' + serie.id} className='btn btn-primary btn-sm'>Infos</Link>
            <button className='btn btn-danger btn-sm' onClick={() => deleteSerie(serie.id)}>Exluir</button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 mt-2'>
          <h1>Séries</h1>
        </div>
        <div className='col-12 mb-2'>
          <Link className='btn btn-primary' to='/series/nova'>Nova Série</Link>
        </div>
      </div>
      
      {
        !data.length &&
        <div className='alert alert-info' role='alert'>
          Você não possui nenhuma série cadastrada ainda.
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

export default Series;