import React from 'react';
import { Badge } from 'reactstrap';

function HeaderInfoSerie(props) {
  const { data, mode, setMode } = props;

  const headerStyle = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <header style={headerStyle}>
      <div className='h-100' style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
        <div className='h-100 container'>
          <div className='row h-100 align-items-center'>

            <div className='col-3'>
              <img className='img-fluid img-thumbnail' src={data.poster} alt={data.name} />
            </div>

            <div className='col-8'>
              <h1 className='text-weight-light text-white'>{data.name}</h1>

              <div className='lead text-white'>
                {data.status === 'PARA_ASSISTIR' && <Badge color='success'>Para Assistir</Badge>}
                {data.status === 'ASSISTINDO' && <Badge color='warning'>Assistindo</Badge>}
                {data.status === 'ASSISTIDO' && <Badge color='danger'>Assistido</Badge>}
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
  );
}

export default HeaderInfoSerie;