import React from "react";

import EditStage from "./EditStage";

const SingleStage = (props) => {
  return (
    <tr>
      <td className="align-middle ">{props.stage.StTitle}</td>
      <td className="align-middle text-center">
        <EditStage
          data={props.stage}
          loadData={props.loadData}
          instructor={props.instructor}
        />
      </td>
    </tr>
  );
};

export default SingleStage;
