import React, { useState } from "react";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";

import Sidebar from "../components/SideBar/SideBar";
import Feed from "../components/Feed/Feed";
import Rightbar from "../components/RightBar/RightBar";
import Navbar from "../components/Navbar/Navbar";
import Add from "../components/Add/Add";

function Home() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Navbar />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode} />
            <Feed />
            <Rightbar />
          </Stack>
          <Add />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Home;
