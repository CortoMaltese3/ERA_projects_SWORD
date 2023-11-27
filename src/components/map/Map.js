import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { scaleSequential } from "d3-scale";
import { interpolateRdYlGn } from "d3-scale-chromatic";
import "leaflet/dist/leaflet.css";

const Map = ({ activeMap }) => {
  const [mapInfo, setMapInfo] = useState({ geoJson: null, colorScale: null });
  const [activeLayer, setActiveLayer] = useState(1);

  useEffect(() => {
    // Fetch GeoJSON data when activeLayer or activeMap changes
    const fetchGeoJson = async () => {
      try {
        const response = await fetch(
          `C:\\Users\\gkalomalos\\Projects\\unu\\climada-unu\\src\\components\\map\\${activeMap}_geodata.json`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filter data for the active layer
        const filteredFeatures = data.features.filter(
          (feature) => feature.properties.layer === activeLayer
        );
        const filteredData = { ...data, features: filteredFeatures };
        const values = filteredFeatures.map((f) => f.properties.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const scale = scaleSequential(interpolateRdYlGn).domain([maxValue, minValue]);

        setMapInfo({ geoJson: filteredData, colorScale: scale });
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
        setMapInfo({ geoJson: null, colorScale: null });
      }
    };

    if (activeMap) {
      fetchGeoJson();
    }
  }, [activeMap, activeLayer]);

  const style = (feature) => {
    return {
      fillColor: mapInfo.colorScale ? mapInfo.colorScale(feature.properties.value) : "#FFF",
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      layer.bindPopup(`Name: ${feature.properties.GID_1}<br>Value: ${feature.properties.value}`);
    }
  };

  const handleLayerChange = (newLayer) => {
    setActiveLayer(newLayer);
  };

  // Define a style for each button
  const buttonStyle = (layer) => ({
    flexGrow: 0,
    margin: 1,
    minWidth: "60px",
    maxWidth: "60px",
    fontSize: "0.75rem", // Smaller font size for the text
    bgcolor: layer === activeLayer ? "#2A4D69" : "#5C87B1",
    "&:hover": { bgcolor: "#9886D6" },
  });

  // Define a style for the button container
  const buttonContainerStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 1000,
    display: "flex",
    flexDirection: "row",
  };

  return (
    <MapContainer center={[30.0, 31.0]} zoom={7} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <div style={buttonContainerStyle}>
        {[0, 1, 2].map((layer) => (
          <Button
            key={layer}
            size="small"
            sx={buttonStyle(layer)}
            onClick={() => handleLayerChange(layer)}
            variant="contained"
          >
            Admin{layer}
          </Button>
        ))}
      </div>
      {mapInfo.geoJson && mapInfo.colorScale && (
        <GeoJSON data={mapInfo.geoJson} style={style} onEachFeature={onEachFeature} />
      )}
    </MapContainer>
  );
};

export default Map;
