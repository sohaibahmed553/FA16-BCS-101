import React from "react";
import { Row, Col } from "antd";
import axios from "axios";

import SingleBadge from "./SingleBadge";
import AddBadge from "./AddBadge";

const ManageBadges = props => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await axios.get("http://localhost:4000/api/badges").then(res => {
      setData(res.data);
      setLoading(false);
    });
  };

  return (
    <div>
      <Row>
        <Col span={19}></Col>
        <Col span={4}>
          <AddBadge loadData={loadData} />
        </Col>
        <Col span={1}></Col>
      </Row>
      <br />
      <table className="table table-striped table-sm table-bordered small">
        <thead>
          <tr>
            <th className="w-25">Badge Name</th>
            <th className="w-75">Badge Detail</th>
            <th>Action</th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {data.map((data, index) => (
              <SingleBadge data={data} key={index} loadData={loadData} />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ManageBadges;
