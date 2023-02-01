import React from 'react';
import {Box} from "@chakra-ui/react";
import Navbar from "./components/Navbar";

interface IAppProps {
  page: React.ReactNode
}

function App({page}:IAppProps) {
  return (
    <Box>
      <Navbar/>
      {page}
    </Box>
  );
}

export default App;
