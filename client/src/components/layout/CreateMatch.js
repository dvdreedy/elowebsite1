import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { createMatch } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";

const CreateMatch = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    users: [],
    name1: "",
    score1: "",
    score2: "",
    name2: ""
  });

  const { users, name1, score1, score2, name2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const x = name1.name;
    const y = name2;
    const body = JSON.stringify({
      name1: x,
      name2: y,
      score1,
      score2
    });

    const res = await axios.post("api/match", body, config);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userList = await axios.get("/api/users/alphabetical");
      const currentUser = await axios.get("api/auth");

      setFormData({ users: userList.data, name1: currentUser.data });
    };
    fetchData();
  }, []);

  return (
    <>
      <br />
      <br />
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Self</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Score"
              name="name12"
              required
              readOnly
              defaultValue={name1.name}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="selectopp">
            <Form.Label>Select Opponent</Form.Label>
            <Form.Control
              as="select"
              type="name"
              placeholder="Enter Score"
              name="name2"
              value={name2}
              onChange={e => onChange(e)}
              required
              defaultValue={users[0]}
            >
              <option disabled="disabled" selected="selected">
                Select another player
              </option>

              {users.map(user => (
                <option key={user._id}>{user.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="score1">
            <Form.Label>Score 1</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Score"
              name="score1"
              value={score1}
              onChange={e => onChange(e)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="score2">
            <Form.Label>Score 2</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Score"
              name="score2"
              value={score2}
              onChange={e => onChange(e)}
              required
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit" size="lg" block>
          Report Match
        </Button>
      </Form>
    </>
  );
};
CreateMatch.propTypes = {
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { setAlert }
)(CreateMatch);
