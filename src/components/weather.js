import React from "react";
import { Table, Button } from "react-bootstrap";
import WeatherData from "./renderWeatherData";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherFlag: false,
    };
  }

  showWeatherData = () => {
    this.setState({
      weatherFlag: true,
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.showWeatherData}>Show weather data</Button>
        {this.state.weatherFlag && (<Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <WeatherData weatherArr={this.props.weatherArr} />
        </Table>)}
      </div>
    );
  }
}
export default Weather;
