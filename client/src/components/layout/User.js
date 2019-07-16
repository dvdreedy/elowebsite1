import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import pepe from "../../images/pepe.png";
import success from "../../images/success.jpg";
import Pie from "../charts/Pie";

import moment from "moment";

const User = ({ match }) => {
  const [currentUserData, setCurrentUserData] = useState({
    currentUser: "",
    currentMatch: [],
    isLoading: true
  });

  const { currentUser, isLoading, currentMatch, pieData1 } = currentUserData;

  //get the user and out in state
  useEffect(() => {
    const fetchData = async () => {
      Promise.all([
        axios.get(`/api/users/${match.params.name}`),
        axios.get(`/api/match/${match.params.name}`)
      ]).then(([res1, res2]) => {
        setCurrentUserData({
          currentUser: res1.data,
          currentMatch: res2.data,
          isLoadingMatches: false
        });
      });
    };
    fetchData();
  }, [match.params.name]);

  //Make sure everything is loaded
  if (isLoading === true) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  const arr = [0, 0];
  currentUser.history.forEach(element => {
    if (element === 0) {
      arr[0]++;
    }
    if (element === 1) {
      arr[1]++;
    }
  });

  return (
    <Fragment>
      <CardDeck>
        <Card
          bg="info"
          border="dark"
          style={{ width: "18rem" }}
          text="white"
          className="text-center"
        >
          <h1>User: {currentUser.name}</h1>
          <Card.Text>Rating: {Math.round(currentUser.rating)}</Card.Text>
          <Card.Text>Peak : {Math.round(currentUser.peak)}</Card.Text>
          <Card.Text>
            Wins: {currentUser.wins} <span>&nbsp;&nbsp;</span>Streak:{" "}
            {currentUser.winstreak}
          </Card.Text>
          <Card.Text>Losses: {currentUser.losses}</Card.Text>
        </Card>
        <Card
          border="dark"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          {arr[0] + arr[1] > 0 ? (
            <Pie
              data={[
                { label: "one", value: arr[0] },
                { label: "two", value: arr[1] }
              ]}
              width={200}
              height={200}
              innerRadius={80}
              outerRadius={100}
            />
          ) : (
            <div>Play some games</div>
          )}
        </Card>
        <Card border="dark">
          <img
            alt="oops"
            src={currentUser.rating + 52 < currentUser.peak ? pepe : success}
          />
        </Card>
      </CardDeck>
      <br />
      {/* Match Section*/}

      {currentMatch.map(match => (
        <div key={match._id}>
          <Card bg="light" text="black" className="text-center">
            <Card.Header>
              {match.name1}
              {"("}
              {Math.round(match.rating1)}{" "}
              <span style={{ color: match.diffOne < 0 ? "red" : "green" }}>
                {match.diffOne < 0 ? "" : "+"}
                {Math.round(match.diffOne)}
              </span>
              {")"} vs {match.name2}
              {"("}
              {Math.round(match.rating2)}{" "}
              <span style={{ color: match.diffTwo < 0 ? "red" : "green" }}>
                {match.diffTwo < 0 ? "" : "+"}
                {Math.round(match.diffTwo)}
              </span>
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
      ))}
    </Fragment>
  );
};

export default User;
