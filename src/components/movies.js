import React from "react";
import Movies from "./renderMovies";
import { Button } from "react-bootstrap";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieFlag: false,
    };
  }
  showMovies = ()=>{
      this.setState({
          movieFlag:true
      })
  }
  render() {
    return (
      <div>
        <Button onClick={this.showMovies}>Show Movies </Button>
        {this.state.movieFlag && (<Movies moviesArr={this.props.moviesArr} />)}
      </div>
    );
  }
}

export default Movie;
