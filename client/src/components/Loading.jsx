import React from "react";
import ReactLoading from 'react-loading';

export default function Loading({ loading }) {
  return loading ? (
    <div className="m-3 d-flex justify-content-center">
      <ReactLoading type={'spin'} color={'#E27D60'} height={100} width={100} />
    </div>
  ) : null;
}