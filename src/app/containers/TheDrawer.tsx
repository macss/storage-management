import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import routes from "../../routes";

const TheDrawer = ({ history, location }: RouteComponentProps) => {
  return (
    <div>
      <ul>
        {routes.map((route, idx) => {
          if (route.path.match(/:/)) {
            return;
          }

          return (
            <li key={idx}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          );
        })}
      </ul>

      {location.pathname !== "/main" && location.pathname !== "/" && (
        <button onClick={history.goBack}>{"<- Voltar"}</button>
      )}
    </div>
  );
};

export default TheDrawer;
