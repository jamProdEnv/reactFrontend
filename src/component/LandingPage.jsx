import { useState } from "react";
import { CubeGeometry } from "./threeComponent/CubeGeometry";
import { Sprite } from "./threeComponent/Sprite";
import { ArrowForwardIcon } from "@mui/icons-material/ArrowForward";
import { ArrowBackIcon } from "@mui/icons-material/ArrowBack";
import classes from "../CSS/LandingPage.module.css";

const scenes = [
  { id: "cube", component: CubeGeometry },
  { id: "rain", component: Sprite },
];

export function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevScene = () => {
    setCurrentIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const nextScene = () => {
    setCurrentIndex((prev) => (prev + 1) % scenes.length);
  };

  const ActiveScene = scenes[currentIndex].component;

  return (
    <div className={classes.container}>
      <div className={classes.nav}>
        <button onClick={prevScene}>
          <ArrowBackIcon />
        </button>
        <span>{scenes[currentIndex].id.toUpperCase()}</span>

        <button onClick={nextScene}>
          <ArrowForwardIcon />
        </button>
      </div>
      <div className={classes.sceneWrapper}>
        <ActiveScene />
      </div>
    </div>
  );
}
