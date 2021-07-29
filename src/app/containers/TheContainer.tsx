import React from "react";
import { RouteComponentProps } from "react-router-dom";
import TheAppbar from "./TheAppbar";
import TheContent from "./TheContent";
import TheDrawer from "./TheDrawer";

const TheContainer = (props: RouteComponentProps) => {
  return (
    <div>
      <TheAppbar />
      <TheDrawer {...props} />
      <hr />
      <TheContent />
    </div>
  );
};

export default TheContainer;
