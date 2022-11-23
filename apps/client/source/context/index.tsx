import React from "react";

interface Props {
  children: React.ReactNode;
}

const ContextProvider = (props: Props) => {
  return (
    <React.Fragment>
        {props.children}
    </React.Fragment>
  );
};

export default ContextProvider;