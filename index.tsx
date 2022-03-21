import React, { Component } from 'react';
import { render } from 'react-dom';
import { BandSearch } from './band-search/band-serach.component';
import './style.css';

interface AppProps {}
interface AppState {
  titles: string[];
  foundAlbums: string[];
}

const defaultTtitles = ['A', 'B', 'C', 'D', 'E'];

class App extends Component<AppProps, AppState> {
  render() {
    return <BandSearch />;
  }
}

render(<App />, document.getElementById('root'));
