import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar1 = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <>
      <Nav.Link href="/create-match">Create Match</Nav.Link>

      <Button href="/" variant="secondary" onClick={logout}>
        Logout
      </Button>
    </>
  );

  const guestLinks = (
    <>
      <Nav.Link href="/register">Register</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
      <br />
    </>
  );
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Rankings</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/recent-match">Recent Matches</Nav.Link>

        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </Nav>
    </Navbar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar1);
