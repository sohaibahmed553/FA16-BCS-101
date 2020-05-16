import React from "react";

import EditBadge from "./EditBadge";
import DeleteBadge from "./DeleteBadge";

const SingleBadge = props => {
  return (
    <tr>
      <td className="align-middle ">{props.data.BName}</td>
      <td className="align-middle ">{props.data.BDetail}</td>
      <td className="align-middle ">
        <EditBadge data={props.data} loadData={props.loadData} />
        <DeleteBadge data={props.data} loadData={props.loadData} />
      </td>
    </tr>
  );
};

export default SingleBadge;
