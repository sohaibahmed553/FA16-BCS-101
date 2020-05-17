import React from "react";

const Logout = (props) => {
  React.useEffect(() => {
    localStorage.removeItem("instructortoken");
    window.location.reload(false);
  });
  return <React.Fragment />;
};

export default Logout;
