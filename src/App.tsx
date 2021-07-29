import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TheContainer from "./app/containers/TheContainer";

const App = () => {
  return (
    <BrowserRouter>
      {/** <Switch> */}
      <Route path="/" render={(props) => <TheContainer {...props} />} />
      {/** </Switch> */}
    </BrowserRouter>
  );
};

export default App;
