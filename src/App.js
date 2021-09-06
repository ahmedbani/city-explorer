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
      mapFlag:false,
      displayErr:false
    };
  }

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
    }
    catch
    {
    this.setState({
      displayErr:true
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
          {this.state.mapFlag && <Figure.Image
            width={500}
            height={350}
            alt="500x350"
            src={`https://maps.locationiq.com/v3/staticmap?key=pk.878d493504ee449bf0b7137790177cf1&center=${this.state.lat},${this.state.lon}`}
          />}
          {this.state.displayErr && <p>Unable to geocode</p>}
        </Figure>
      </>
    );
  }
}

export default App;
