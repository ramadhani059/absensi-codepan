import React from "react";
import { NativeBaseProvider } from "native-base";

import { AuthProvider } from "./src/Context/AuthContext";

import Navigation from "./src/Navigation/index";

const App = () => {
  return (
    <AuthProvider>
      <NativeBaseProvider flex="1">
        <Navigation />
      </NativeBaseProvider>
    </AuthProvider>
  );
};

export default App;