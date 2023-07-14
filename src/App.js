import React from "react";

// routing
import Routes from "./routes";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

import theme from "./theme";

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </StyledEngineProvider>
  );
};

export default App;



// import './App.css';
// import React, { Component } from 'react';

// class App extends Component {
//   render() { 
//     return (
//       <button className='btn btn-primary btn-sm'>Pavan</button>
//     );
//   }
// }
 
// export default App;
