import React from "react";
import { Form, Button, Figure, Table, Card ,ListGroup,ListGroupItem} from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      displayName: "",
      weatherArr: [],
      moviesArr: [],
      mapFlag: false,
      displayErr: false,
    };
  }
  getMovies = () => {
    const serverUrl = "https://city-expo.herokuapp.com/movies";
    axios.get(serverUrl).then((result) => {
      this.setState({
        weatherArr: result.data,
      });
    });
  };
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
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            {this.state.weatherArr.map((item) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <td>{item.date}</td>
                      <td>{item.description}</td>
                    </tr>
                  </tbody>
                </>
              );
            })}{" "}
          </Table>
          {this.state.displayErr && <p>Unable to geocode</p>}
        </Figure>
        {this.state.moviesArr.map((item) => {
          console.log(item);
          return (
            <>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={this.state.moviesArr.image_url}
                />
                <Card.Body>
                  <Card.Title>{this.state.moviesArr.title}</Card.Title>
                  <Card.Text>
                  overview: {this.state.moviesArr.overview}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Average votes: {this.state.moviesArr.average_votes}</ListGroupItem>
                  <ListGroupItem>Total votes: {this.state.moviesArr.total_votes}</ListGroupItem>
                  <ListGroupItem>Popularity: {this.state.moviesArr.popularity}</ListGroupItem>
                  <ListGroupItem>Release date: {this.state.moviesArr.released_on}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>{' '}
            </>
          );
        })}
      </>
    );
  }
}

export default App;
