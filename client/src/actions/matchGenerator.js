import React from "react";
import Card from "react-bootstrap/Card";
import moment from "moment";
const matchGenerator = ([matches]) => {
  return matches.map(match => (
    <div key={match._id}>
      <Card bg="light" text="black" className="text-center">
        <Card.Header>
          {match.name1}
          {"("}
          {Math.round(match.rating1)}
          {")"} vs {match.name2}
          {"("}
          {Math.round(match.rating2)}
          {")"}
        </Card.Header>
        <Card.Body>
          <Card.Title>Winner: {match.winner}</Card.Title>

          <Card.Text>
            Score: {match.score1} - {match.score2}
          </Card.Text>
        </Card.Body>
        <Card.Footer>{moment(match.date).fromNow()}</Card.Footer>
      </Card>
      <p> </p>
    </div>
  ));
};
export default matchGenerator;
