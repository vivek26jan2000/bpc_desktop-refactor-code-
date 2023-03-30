import React, { useState } from "react";

const AuthContext = React.createContext({
  agentConfig: null, // add a state to hold the obj data
});

export const AuthContextProvider = (props) => {
  const [agentConfig, setAgentConfig] = useState(null); // initialize the state with null

  const agentConfigHandler = (configObj) => {
    // define a handler function to set the obj data
    setAgentConfig(configObj);
  };

  const contextValue = {
    agentConfig: agentConfig, // include the state in the context value
    setAgentConfig: agentConfigHandler, // include the handler function in the context value
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
