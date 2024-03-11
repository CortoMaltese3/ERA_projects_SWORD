import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import APIService from "../../APIService";
import AlertMessage from "../alerts/AlertMessage";

const hazardDict = {
  thailand: ["flood", "drought", "heatwaves", "river_flood"],
  egypt: ["flash_flood", "heatwaves", "river_flood"],
};

const HazardCard = ({
  onChangeHazardFile,
  onChangeValidHazard,
  onHazardSelect,
  selectedAppOption,
  selectedCountry,
  selectedHazard,
  selectedHazardFile,
}) => {
  const { t } = useTranslation();

  const [fetchHazardMessage, setFetchHazardMessage] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [showMessage, setShowMessage] = useState(true);

  const hazards = hazardDict[selectedCountry] || [];

  const handleCardSelect = (hazard) => {
    if (selectedHazard === hazard) {
      onHazardSelect("");
    } else {
      onHazardSelect(hazard);
    }
    onChangeHazardFile("");
    onChangeValidHazard(false);
    setFetchHazardMessage("");
  };

  const isButtonSelected = (hazard) => selectedHazard === hazard;

  const handleLoadButtonClick = (event) => {
    // Reset the value of the fetched Hazard data if existing
    setFetchHazardMessage("");
    onChangeHazardFile("");
    onChangeValidHazard(false);
    const file = event.target.files[0];
    if (file) {
      onChangeHazardFile(file.name);
      onChangeValidHazard(true);
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const clearUploadedFile = () => {
    onChangeHazardFile("");
    onChangeValidHazard(false);
    // Reset the value of the file input to avoid issues when trying to upload the same file
    document.getElementById("hazard-contained-button-file").value = "";
  };

  const clearFetchedData = () => {
    setFetchHazardMessage("");
    onChangeValidHazard(false);
  };

  const handleFetchButtonClick = (event) => {
    // Reset the value of the file input if already selected
    onChangeHazardFile("");
    setFetchHazardMessage("");
    onChangeValidHazard(false);
    const body = {
      country: selectedCountry,
      dataType: selectedHazard,
    };
    APIService.CheckDataType(body)
      .then((response) => {
        setMessage(response.result.status.message);
        response.result.status.code === 2000 ? setSeverity("success") : setSeverity("error");
        setShowMessage(true);
        setFetchHazardMessage(response.result.status.message);
        onChangeValidHazard(response.result.status.code === 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        bgcolor: "#DCEFF2",
        border: "2px solid #3B919D",
        borderRadius: "16px",
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          color="text.primary"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: "#F79191",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "24px",
          }}
        >
          {t("card_hazard_title")}
        </Typography>

        {/* Hazard selection section */}
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          {hazards.map((hazard) => (
            <CardActionArea
              key={hazard}
              onClick={() => handleCardSelect(hazard)}
              sx={{
                backgroundColor: isButtonSelected(hazard) ? "#F79191" : "#FFCCCC",
                borderRadius: "8px",
                margin: "16px",
                marginLeft: 0,
                textAlign: "center",
                padding: "8px 0",
                transition: "transform 0.1s ease-in-out", // Add transition for transform
                "&:active": {
                  transform: "scale(0.96)", // Slightly scale down when clicked
                },
              }}
            >
              <Typography variant="body1" color="text.primary">
                {t(`card_hazard_${hazard}`)}
              </Typography>
            </CardActionArea>
          ))}
        </Box>

        {/* Load button section */}
        {selectedCountry && selectedAppOption === "explore" && (
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <Box>
              <label htmlFor="hazard-contained-button-file">
                <Button
                  component="span"
                  sx={{
                    bgcolor: "#FFEBEB",
                    color: "#000000",
                    fontWeight: "bold",
                    margin: 2,
                    "&:hover": { bgcolor: "#FFCCCC" },
                    transition: "transform 0.1s ease-in-out", // Add transition for transform
                    "&:active": {
                      transform: "scale(0.96)", // Slightly scale down when clicked
                    },
                  }}
                  variant="contained"
                >
                  {t("card_hazard_load_button")}
                  <input
                    accept=".hdf5"
                    hidden
                    id="hazard-contained-button-file"
                    multiple={false}
                    onChange={handleLoadButtonClick}
                    type="file"
                  />
                </Button>
              </label>
            </Box>

            {/* Fetch button section */}
            <Box>
              <Button
                component="span"
                sx={{
                  bgcolor: "#FFEBEB",
                  color: "#000000",
                  fontWeight: "bold",
                  margin: 2,
                  "&:hover": { bgcolor: "#FFCCCC" },
                  transition: "transform 0.1s ease-in-out", // Add transition for transform
                  "&:active": {
                    transform: "scale(0.96)", // Slightly scale down when clicked
                  },
                }}
                variant="contained"
                onClick={handleFetchButtonClick}
              >
                {t("card_hazard_fetch_button")}
              </Button>
            </Box>
          </Box>
        )}

        {/* Display uploaded file name section */}
        {selectedHazardFile && selectedAppOption === "explore" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Typography variant="body2" color="text.primary" sx={{ textAlign: "center" }}>
              {t("card_exposure_economic_upload_file")}: {selectedHazardFile}
            </Typography>
            <IconButton onClick={clearUploadedFile} size="small" sx={{ color: "#F35A5A" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {/* Display fetch Exposure data message section */}
        {fetchHazardMessage && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Typography variant="body2" color="text.primary" sx={{ textAlign: "center" }}>
              {t("card_exposure_economic_fetch_exposure")}: {fetchHazardMessage}
            </Typography>
            <IconButton onClick={clearFetchedData} size="small" sx={{ color: "#F35A5A" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {/* Remarks section */}
        <Box sx={{ padding: 2, backgroundColor: "#F2F2F2", borderRadius: "8px" }}>
          <Typography variant="body2" color="text.primary">
            {t("card_hazard_remarks")}
          </Typography>
        </Box>
      </CardContent>

      {/* Alert message section */}
      {message && showMessage && (
        <AlertMessage
          handleCloseMessage={handleCloseMessage}
          message={message}
          severity={severity}
          showMessage={showMessage}
        />
      )}
    </Card>
  );
};

export default HazardCard;
