import React from "react";
import { Form, Button, Figure } from "react-bootstrap";
import axios from "axios";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      displayName: "",
    };
  }

  getLocationData = async (event) => {
    event.preventDefault();
    const city = event.target.city.value;
    const url = `https://eu1.locationiq.com/v1/search.php?key=pk.4e5214464c0c4f393a7a4f8176cedf66&q=${city}&format=json`;

    let response = await axios.get(url);
    this.setState({
      lat: response.data[0].lat,
      lon: response.data[0].lon,
      displayName: response.data[0].display_name,
      mapFlag: true,
    });
  };

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.getLocationData}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>City :</Form.Label>
            <Form.Control type="text" placeholder="Enter the city you want to explore" name="city" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>

        <Figure>
          <Figure.Caption>
            Display name : {this.state.displayName}
          </Figure.Caption>
          <Figure.Caption>latitude : {this.state.lat}</Figure.Caption>
          <Figure.Caption>longitude : {this.state.lon}</Figure.Caption>
          <Figure.Image
            width={500}
            height={350}
            alt="500x350"
            src={`https://maps.locationiq.com/v3/staticmap?key=pk.4e5214464c0c4f393a7a4f8176cedf66&center=${this.state.lat},${this.state.lon}`}
          />
        </Figure>
      </>
    );
  }
}

export default App;
