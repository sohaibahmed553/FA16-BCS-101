import React from "react";

import EditModal from "./EditModal";
import DeleteChallenge from "./DeleteChallenge";

import "antd/dist/antd.css";

const EditSingleQuestion = (props) => {
  return (
    <tr>
      <td className="align-middle ">{props.data.Questions}</td>
      <td className="align-middle ">{props.data.A}</td>
      <td className="align-middle ">{props.data.B}</td>
      <td className="align-middle ">{props.data.C}</td>
      <td className="align-middle ">{props.data.D}</td>
      <td className="align-middle text-center">{props.data.Answer}</td>
      <td className="align-middle text-center">
        <EditModal
          data={props.data}
          onEditQuestions={props.onEditQuestions}
          instructor={props.instructor}
        />
        <DeleteChallenge
          data={props.data}
          onDeleteQuestion={props.onEditQuestions}
        />
      </td>
    </tr>
  );
};

export default EditSingleQuestion;
