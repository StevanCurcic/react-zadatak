import React, { Component } from 'react';
import { BandList } from './band-list.component';
import './band-search.component.css';

interface AppProps {}
interface AppState {
  titles: string[];
  foundAlbums: string[];
}

const defaultTtitles = ['A', 'B', 'C', 'D', 'E'];

export class BandSearch extends Component<AppProps, AppState> {
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
        <div className="wrapper">
          <input
            className="input"
            placeholder="Search Band"
            type="text"
            onChange={this.searchTermChanged}
          />

          <BandList names={this.state.titles} />
        </div>
      </div>
    );
  }
}
