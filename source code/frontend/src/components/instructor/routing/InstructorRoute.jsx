import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const InstructorRoute = ({ component: Component, render, ...rest }) => {
  const [isInstructor, setIsInstructor] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [instructor, setInstructor] = React.useState([]);

  React.useEffect(() => {
    axios.defaults.headers.common["x-auth-instructor"] = localStorage.getItem(
      "instructortoken"
    );

    axios
      .get("http://localhost:4000/api/instructorauth")
      .then((res) => {
        setInstructor(res.data[0]);
        setIsInstructor(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsInstructor(false);
        setLoading(false);
      });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isInstructor === false && loading === false)
          return <Redirect to="/" />;
        if (isInstructor === true && loading === false)
          return Component ? (
            <Component {...props} instructor={instructor} />
          ) : (
            render(props)
          );
      }}
    />
  );
};

export default InstructorRoute;
