import axios from "axios";
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import moment from "moment";
export class RecentMatch extends Component {
  state = {
    matches: []
  };

  componentDidMount() {
    axios.get("/api/match").then(res => {
      const matches = res.data;
      this.setState({ matches });
    });
  }
  matchGenerator = () => {
    return this.state.matches.map(match => (
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
            <Card.Title>Winnner: {match.winner}</Card.Title>

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

  render() {
    return <div>{this.matchGenerator()}</div>;
  }
}

export default RecentMatch;
