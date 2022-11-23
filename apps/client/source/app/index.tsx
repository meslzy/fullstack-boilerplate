import React from "react";

import {Outlet, RouterProvider} from "@tanstack/react-router";

import router from "@app/routes";

const App = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router}>
        <Outlet/>
      </RouterProvider>
    </React.Fragment>
  );
};

export default App;