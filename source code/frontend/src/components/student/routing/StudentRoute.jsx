import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const StudentRoute = ({ component: Component, render, ...rest }) => {
  const [isStudent, setIsStudent] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [student, setStudent] = React.useState([]);

  React.useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios
      .get("http://localhost:4000/api/auth")
      .then(res => {
        setStudent(res.data[0]);
        setIsStudent(true);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsStudent(false);
        setLoading(false);
      });
  }, []);

  return (
    <Route
      {...rest}
      render={props => {
        if (isStudent === false && loading === false)
          return <Redirect to="/" />;
        if (isStudent === true && loading === false) {
          return Component ? (
            <Component {...props} student={student} />
          ) : (
            render(props)
          );
        }
      }}
    />
  );
};

export default StudentRoute;
