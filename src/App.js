import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios'; 

import Header from './Header';
import Genres from './Genres';
import NewGenre from './NewGenre';

function Home() {
  return (
    <h1>Home</h1>
  );
}

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('/api').then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home}/>
        <Route path='/generos' exact component={Genres}/>
        <Route path='/generos/novo' exact component={NewGenre}/>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
}

export default App;
