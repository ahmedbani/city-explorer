import React from "react";
import {Card ,ListGroup,ListGroupItem} from 'react-bootstrap';
class Movies extends React.Component {
  render() {
    return(
    <>
      {this.props.moviesArr.map((item) => {
          console.log(this.props.moviesArr);
        return (
          <>
            <Card style={{ width: "18rem" }}>
              {/* <Card.Img variant="top" src={item.image_url} /> */}
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text><h4>overview:</h4> {item.overview}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Average votes: {item.average_votes}
                </ListGroupItem>
                <ListGroupItem>Total votes: {item.total_votes}</ListGroupItem>
                <ListGroupItem>Popularity: {item.popularity}</ListGroupItem>
                <ListGroupItem>Release date: {item.released_on}</ListGroupItem>
              </ListGroup>
            </Card>{" "}
          </>
        );
      })}
    </>
    )
  }
}

export default Movies;
