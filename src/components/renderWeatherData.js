import React from 'react';

class WeatherData extends React.Component {
    render() { 
        return <>
        {this.props.weatherArr.map((item) => {
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
        </>;
    }
}
 
export default WeatherData;