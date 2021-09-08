import React from "react";
import { Form, Button, Card, Figure ,ListGroup,ListGroupItem} from "react-bootstrap";
import axios from "axios";
import  Weather  from "./components/weather.js";
import Movie from './components/movies.js'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      displayName: "",
      cityName:'',
      weatherArr:[],
      moviesArr: [],
      mapFlag: false,
      displayErr: false
    };
  }

  getMovies = () => {
    const serverUrl = `https://city-expo.herokuapp.com/movies?query=${this.state.cityName}`;
    axios.get(serverUrl).then((result) => {
      this.setState({
        moviesArr: result.data,
      });
    });
  };
  
  getWeather = async () => {
    console.log('hi');
    const serverUrl = `https://city-expo.herokuapp.com/weather?lat=${this.state.lat}&lon=${this.state.lon}`;
    console.log(serverUrl);

    let res = await axios.get(serverUrl);
    console.log(res.data);
    this.setState({
      weatherArr: res.data,
    });
  };

  getLocationData = async (event) => {
    event.preventDefault();
    const city = event.target.city.value;
    const key = process.env.REACT_APP_LOCATIONKEY;
    const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
    try {
      let response = await axios.get(url);
      this.setState({
        lat: response.data[0].lat,
        lon: response.data[0].lon,
        displayName: response.data[0].display_name,
        cityName:city,
        mapFlag: true,
      });
      this.getWeather();
      this.getMovies();
    } catch {
      this.setState({
        displayErr: true,
      });
    }
  };

  

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.getLocationData}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>City :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the city you want to explore"
              name="city"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>

        <Figure>
          <Figure.Caption>Welcome to {this.state.displayName}</Figure.Caption>
          <Figure.Caption>latitude : {this.state.lat}</Figure.Caption>
          <Figure.Caption>longitude : {this.state.lon}</Figure.Caption>
          {this.state.mapFlag && (
            <Figure.Image
              width={500}
              height={350}
              alt="500x350"
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.58721e9934343c988d3e205898b97680&center=${this.state.lat},${this.state.lon}`}
            />
          )}
          {this.state.displayErr && <p>Unable to geocode</p>}
        </Figure>
        
        
        <Weather weatherArr={this.state.weatherArr}/>
        <Movie moviesArr = {this.state.moviesArr}/>
        
      </>
    );
  }
}

export default App;
