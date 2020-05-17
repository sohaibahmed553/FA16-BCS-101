import React from "react";

import EditLink from "./EditLink";
import DeleteLink from "./DeleteLink";

const SingleLink = (props) => {
  return (
    <tr>
      <td className="align-middle ">{props.data.Link}</td>
      <td className="align-middle text-center">
        <EditLink
          data={props.data}
          loadData={props.loadData}
          instructor={props.instructor}
        />
        <DeleteLink data={props.data} loadData={props.loadData} />
      </td>
    </tr>
  );
};

export default SingleLink;
