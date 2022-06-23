import React from "react";
import { useParams } from "react-router-dom";
const AssetDetail = ({ match }) => {
  let { id } = useParams();
  //   let assetID = match.params.id;

  return (
    <div>
      {/* <h3>Hello from detail asset</h3> */}
      <p>oo{id}</p>
    </div>
  );
};

export default AssetDetail;
