import axios from "axios";
import React, { Component } from "react";
import Table from "react-bootstrap/Table";

export class Landing extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get("/api/users").then(res => {
      const users = res.data;
      this.setState({ users });
    });
  }
  tableGenerator = () => {
    return this.state.users.map((user, index) => (
      <tbody key={user._id}>
        <tr>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{Math.round(user.rating)}</td>
        </tr>
      </tbody>
    ));
  };

  render() {
    return (
      <div>
        <h2 align="center">
          It will take more than just creating an account to get to the top
        </h2>
        <br />
        <Table bordered striped hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Rating(elo)</th>
            </tr>
          </thead>

          {this.tableGenerator()}
        </Table>
      </div>
    );
  }
}

export default Landing;
