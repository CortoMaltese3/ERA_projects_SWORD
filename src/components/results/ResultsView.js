import React from "react";

import { Box } from "@mui/material";

import ResultsViewTitle from "../title/ResultsViewTitle";
import EconomicResultsCard from "./EconomicResultsCard";
import MacroEconomicResultsCard from "./MacroEconomicResultsCard";
import OutputResultsCard from "./OutputResultsCard";

const ResultsView = ({ selectedTab, onChangeActiveMap }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ResultsViewTitle selectedTab={selectedTab} />
        {selectedTab === 1 && <EconomicResultsCard onActiveMapSelect={onChangeActiveMap} />}
        {selectedTab === 2 && <MacroEconomicResultsCard />}
        {selectedTab === 3 && <OutputResultsCard />}
      </Box>
    </Box>
  );
};

export default ResultsView;