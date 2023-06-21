"use client";
// @ts-nocheck
import React, { useRef, useEffect, useState } from "react";
// import { SearchBox } from "@mapbox/search-js-react";
// import styles from "../app/page.module.css";
import { SearchBoxRetrieveResponse } from "@mapbox/search-js-core";
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

const DynamicSearchBox = dynamic(
  () => import("@mapbox/search-js-react").then((module) => module.SearchBox),
  {
    ssr: false,
  }
);

interface DestinationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number | null>>;
  setLat: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Destination({
  setCurrentPage,
  setLng,
  setLat,
}: DestinationProps) {
  const [destination, setDestination] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setCurrentPage((currPage) => currPage + 1);
    e.preventDefault();
  };

  const handleRetrieve = (e: SearchBoxRetrieveResponse) => {
    setLng(e.features[0].properties.coordinates.longitude);
    setLat(e.features[0].properties.coordinates.latitude);
    setDestination(e.features[0].properties.name);
    setIsDisabled(false);
  };

  const handleChange = () => {
    setIsDisabled(true);
  };

  return (
    <>
      <h1>Where are you headed?</h1>
      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <DynamicSearchBox
            options={{
              language: "en",
              types: "place",
            }}
            value={destination}
            accessToken={
              "pk.eyJ1IjoibGFpOTYiLCJhIjoiY2xpdWVhdmQ3MHkybjNobzdnbjJwcmx6YSJ9.0CYohMf5CN77cD-BOo7mhw"
            }
            onRetrieve={handleRetrieve}
            onChange={handleChange}
          />

          <Button variant="contained" disabled={isDisabled} type="submit">
            Continue
          </Button>
        </FormControl>
      </form>
    </>
  );
}
