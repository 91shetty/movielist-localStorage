import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      movies: []
    };
  }

  componentDidMount() {
    this.fetchUserStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveUserStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveUserStateToLocalStorage();
  }

  fetchUserStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveUserStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  handleChange(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addMovie() {
    if (!this.checkIfMovieExistsInList()) {
      // create a new movie with unique id
      const newMovie = {
        id: 1 + Math.random(),
        value: this.state.title
      };

      // copy current list of movies
      let movies = [...this.state.movies];

      // add the new movie to the list
      movies.push(newMovie);

      // update state with new movies, reset the new movie input
      this.setState({
        title: "",
        movies
      });

      document.getElementById("errors").innerHTML = "";
    } else {
      document.getElementById("errors").innerHTML = "Movie already exists";
    }
  }

  checkIfMovieExistsInList() {
    for (var i = 0; i < this.state.movies.length; i++) {
      if (this.state.movies[i].value === this.state.title) {
        return true;
      }
    }
    return false;
  }

  deleteMovie(id) {
    // copy current list of movies
    const movies = [...this.state.movies];
    // filter out the movie being deleted
    const updatedMovies = movies.filter(movie => movie.id !== id);

    this.setState({ movies: updatedMovies });
  }

  render() {
    return (
      <div className="App d-flex flex-column pt-5 align-items-center justify-content-center">
        <h1>My Movie List!</h1>
        <ul className="list-group mb-5">
          {!this.state.movies.length ? (
            <li className="list-group-item mx-auto text-center">
              List is empty
            </li>
          ) : (
            this.state.movies.map(movie => {
              return (
                <li className="list-group-item mx-auto" key={movie.id}>
                  {movie.value}
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => this.deleteMovie(movie.id)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
        <div className="row justify-content-center align-items-center">
          <label className="row justify-content-center">
            Add a movie to your list
          </label>
          <input
            type="text"
            placeholder="Avengers: Endgame"
            value={this.state.title}
            onChange={e => this.handleChange("title", e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.addMovie()}
            disabled={!this.state.title.length}
          >
            Add
          </button>
          <span className="row justify-content-center mt-1" id="errors" />
        </div>
      </div>
    );
  }
}
