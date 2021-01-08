import React from 'react';
// import PropTypes from "prop-types";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component{
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {data: {data :{ movies }}} 
    = await axios.get("http://yts-proxy.now.sh/list_movies.json");
    console.log(movies);
    this.setState({movies, isLoading:false}) //javascript에서도 두 movies가 다른것을 구분함
  }

  componentDidMount() {
    this.getMovies();
  }

  render(){
    const {isLoading, movies} = this.state;
    return(
      <section className="container">
        {isLoading 
          ? <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          : <div className="movies">
              {movies.map(movie => (
                <Movie 
                  key={movie.id} 
                  year={movie.year} 
                  title={movie.title} 
                  summary={movie.summary} 
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              ))}
            </div>
        }
      </section>
    )
  }
}

export default App;
