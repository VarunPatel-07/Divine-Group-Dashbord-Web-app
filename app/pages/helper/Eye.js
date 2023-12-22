import React from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
function Eye(props) {
  const { isEyeClose } = props;
  if (isEyeClose) {
    return <BsEye />;
  } else {
    return <BsEyeSlash />;
  }
}

export default Eye;
