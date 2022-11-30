import React from 'react';
import {translateType} from "../utils/translateType";
type WillUseRest = {
  data : {
    category: "takeoff" | "vacation" | "replace",
    useType: "tmo" | "tao" | "tdo",
    deduction: number,
  };
  date : string;
}
const WillUseRest = ({} : WillUseRest) => {
  return (
<></>
  );
};

export default WillUseRest;
