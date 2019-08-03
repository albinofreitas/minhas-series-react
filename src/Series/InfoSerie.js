import React, { useState, useEffect } from 'react';
import { Badge } from 'reactstrap';
import axios from 'axios';

const status = {
  'PARA_ASSISTIR': 'Para Assistir',
  'ASSISTINDO': 'Assistindo',
  'ASSISTIDO': 'Assistido'
};

function InfoSerie({ match }) {
  const [data, setData] = useState({});
  const [form, setForm] = useState({});
  const [mode, setMode] = useState('INFO');
  const [genres, setGenres] = useState({});

  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data);
        setForm(res.data);
      });
  }, [match.params.id, mode]);

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setGenres(res.data.data);

        const genres = res.data.data;        
        const genre = genres.find(genre => genre.name === data.genre);

        if(!genre){
          return;
        }
        
        setForm({
          ...data,
          genre_id: genre.id
        });
      });
  }, [data]);

  const onChange = field => event => {
    setForm({
      ...form,
      [field]: event.target.value
    });
  }

  const save = () => {
    axios
      .put('/api/series/' + match.params.id, form)
      .then(res => setMode('INFO'))
  }

  const headerStyle = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div>
      <header style={headerStyle}>
        <div className='h-100' style={{ backgroundColor: 'rgba(0,0,0,0.7)'}}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                  <img className='img-fluid img-thumbnail' src={data.poster} alt={data.name} />
              </div>
              <div className='col-8'>
                <h1 className='text-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  { data.status === 'PARA_ASSISTIR' && <Badge color='success'>Para Assistir</Badge> }
                  { data.status === 'ASSISTINDO' && <Badge color='warning'>Assistindo</Badge> }
                  { data.status === 'ASSISTIDO' && <Badge color='danger'>Assistido</Badge> }
                  <p>Gênero: {data.genre}</p>
                </div>
                {
                  mode !== 'EDITING' &&
                  <button className='btn btn-primary btn-sm' onClick={() => setMode('EDITING')}>Editar Série</button>
                }
              </div>
            </div>
          </div>
          
        </div>
      </header>

      <div className='container'>
        {
          mode === 'EDITING' &&
          <div>
            <h1>Infos</h1>
            <form>
              <div className='form-group'>
                <label htmlFor="name">Nome</label>
                <input type="text" value={form.name} className='form-control' id='name' onChange={onChange('name')} />
              </div>

              <div className='form-group'>
                <label htmlFor="comments">Comentário</label>
                <input type="text" value={form.comments || ''} onChange={onChange('comments')} className='form-control' id='comments' />
              </div>

              <div className='form-group'>
                <label htmlFor="genero">Gênero</label>
                <select className='custom-select' id='genero' onChange={onChange('genre_id')} value={form.genre_id}>
                  <option defaultValue>Selecione</option>
                  {
                    genres.map(genre => {
                      return <option key={genre.id} value={genre.id}>{genre.name}</option>
                    })
                  }
                </select>
              </div>

              <div className='form-group'>
                <label htmlFor="genero">Gênero</label>
                <select className='custom-select' id='genero' onChange={onChange('status')} value={form.status || ''}>
                  <option defaultValue>Selecione</option>
                  {
                    Object.keys(status).map((key) => {
                      return <option key={key} value={key}>{status[key]}</option> 
                    })
                  }
                </select>
              </div>

              <div>
                <button className='btn btn-secondary mr-2' onClick={() => setMode('INFO')}>Cancelar</button>
                <button type='button' className='btn btn-primary mr-2' onClick={save}>Salvar</button>
              </div>
            </form>
          </div> 
        }
      </div>
    </div>
  );
}

export default InfoSerie;