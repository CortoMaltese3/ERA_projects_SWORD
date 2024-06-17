import React from "react";
import { Grid, Box } from "@mui/material";

import AdaptationMeasuresInput from "./components/input/AdaptationMeasuresInput";
import DataInput from "./components/input/DataInput";
import Header from "./components/nav/Header";
import LoadModal from "./components/loaders/LoadModal";
import MainTabs from "./components/main/MainTabs";
import MainView from "./components/main/MainView";
import NavigateAlert from "./components/alerts/NavigateAlert";
import ResultsView from "./components/results/ResultsView";
import useStore from "./store";

import "./App.css";

const App = () => {
  const { selectedAppOption } = useStore();

  return (
    <>
      {selectedAppOption === "" ? (
        <NavigateAlert />
      ) : (
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <MainTabs />
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            overflow="auto"
            className="main-content"
          >
            <Grid
              container
              spacing={2}
              sx={{
                padding: 2,
                flexGrow: 1,
              }}
            >
              <Grid item xs={12} md={2}>
                <DataInput />
                <AdaptationMeasuresInput />
              </Grid>
              <Grid item xs={12} md={8}>
                <MainView />
              </Grid>
              <Grid item xs={12} md={2}>
                <ResultsView />
              </Grid>
            </Grid>
          </Box>
          <LoadModal />
        </Box>
      )}
    </>
  );
};

export default App;
