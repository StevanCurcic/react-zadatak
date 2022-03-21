import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

interface AppProps {}
interface AppState {
  titles: string[];
  foundAlbums: string[];
}

const defaultTtitles = ['A', 'B', 'C', 'D', 'E'];

class App extends Component<AppProps, AppState> {
  private intervalId;

  constructor(props) {
    super(props);
    this.state = {
      titles: [...defaultTtitles],
      foundAlbums: [],
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        let title = prevState.titles.shift();

        let foundAlbums = prevState.foundAlbums;
        if (foundAlbums.length) {
          title = foundAlbums.shift();
          foundAlbums = [...foundAlbums, title];
        }

        const titles = [...prevState.titles, title];
        return {
          titles,
          foundAlbums,
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  readonly searchTermChanged = (event) => {
    const searchTerm = event.target.value;

    if (!searchTerm) {
      this.setState({ foundAlbums: [...defaultTtitles] });
    } else {
      fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=album`)
        .then((res) => res.json())
        .then((res) => {
          const albumNames = (res.results as any[])
            ?.sort((a, b) =>
              (a.collectionName as string).localeCompare(b.collectionName)
            )
            .slice(0, 5)
            .map((album) => album.collectionName);
          this.setState({ foundAlbums: albumNames });
        })
        .catch((err) => {
          console.error(err);
          this.setState({ foundAlbums: [] });
        });
    }
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          'flex-direction': 'row',
          'justify-content': 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            width: '60%',
            flex: '0 0 auto',
            display: 'flex',
            'flex-direction': 'column',
            'row-gap': '8px',
          }}
        >
          <input
            style={{
              flex: '1 1 auto',
            }}
            placeholder="Search Band"
            type="text"
            onChange={this.searchTermChanged}
          />

          <div
            style={{
              background: 'LIGHTGRAY',
              padding: '8px',
              flex: '1 1 auto',
              display: 'flex',
              'flex-direction': 'column',
              'row-gap': '8px',
            }}
          >
            {this.state.titles.map((title) => (
              <div
                style={{
                  background: 'white',
                  'text-align': 'center',
                }}
              >
                {title}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
