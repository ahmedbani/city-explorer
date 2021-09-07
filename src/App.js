import React from "react";
import { Form, Button, Figure } from "react-bootstrap";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      displayName: "",
      weatherArr: [],
      mapFlag: false,
      displayErr: false,
    };
  }
  getWeather = async () => {
    const serverUrl = `https://city-expo.herokuapp.com/weather?lat=${this.state.lat}&lon=${this.state.lon}`;

    let res = await axios.get(serverUrl);
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
        mapFlag: true,
      });
      this.getWeather();
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
          <Figure.Caption>
            Welcome to {this.state.displayName}
          </Figure.Caption>
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
          {this.state.weatherArr.map((item) => {
            return (
              <>
                <Figure.Caption>
                  date : {item.date}
                </Figure.Caption>
                <Figure.Caption>
                  description : {item.description}
                </Figure.Caption>
              </>
            );
          })}{" "}
          {this.state.displayErr && <p>Unable to geocode</p>}
        </Figure>
      </>
    );
  }
}

export default App;
