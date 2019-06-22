import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

const User = ({ match }) => {
  const [currentUserData, setCurrentUserData] = useState({
    currentUser: ""
  });

  const { currentUser } = currentUserData;

  //get the user and out in state
  useEffect(() => {
    const fetchData = async () => {
      const user = await axios.get(`/api/users/${match.params.name}`);

      const helper = JSON.parse(JSON.stringify(user.data));

      setCurrentUserData({ currentUser: helper });
    };
    fetchData();
  }, [match.params.name]);

  return <Fragment>{currentUser.name}</Fragment>;
};

export default User;
