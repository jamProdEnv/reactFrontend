import { useState } from "react";
import { CubeGeometry } from "./threeComponent/CubeGeometry";
import { Sprite } from "./threeComponent/Sprite";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import classes from "../CSS/LandingPage.module.css";
import models1 from "../assets/models1.jpg";
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
      {/* <div className={classes.nav}>
        <button onClick={prevScene}>
          <ArrowBack />
        </button>
        <span>{scenes[currentIndex].id.toUpperCase()}</span>

        <button onClick={nextScene}>
          <ArrowForward />
        </button>
      </div>
      <div className={classes.sceneWrapper}>
        <ActiveScene />
      </div> */}
      <div className={classes.banner}>
        <div className={classes.slider} style={{ "--quantity": 8 }}>
          <div className={classes.item} style={{ "--position": 1 }}>
            <img src="/models1.jpg" alt="" />
          </div>
          <div className={classes.item} style={{ "--position": 2 }}>
            <img src="/models2.jpg" alt="" />
          </div>
          <div className={classes.item} style={{ "--position": 3 }}>
            <img src="/models3.jpg" alt="" />
          </div>
          <div className={classes.item} style={{ "--position": 4 }}>
            <img src="/models4.jpg" alt="" />
          </div>
          <div className={classes.item} style={{ "--position": 5 }}>
            <img src="/models5.png" alt="" />
          </div>
          <div className={classes.item} style={{ "--position": 6 }}>
            <img src="/models6.jpg" alt="" />
          </div>
          <div className={classes.item} style={{ "--position": 7 }}>
            <div className={classes.image}>
              <Sprite />
            </div>
          </div>
          <div className={classes.item} style={{ "--position": 8 }}>
            <div className={classes.image}>
              <CubeGeometry />
            </div>
          </div>
        </div>
        <div className={classes.content}>
          <h1 data-content="WSJR PORTFOLIO">WSJR PORTFOLIO</h1>
          <div className={classes.author}>
            <h2>Joshua Middleton</h2>
            <p>Web Development</p>
            <p>Welcome To My Portfolio</p>
          </div>
          <div className={classes.model}></div>
        </div>
      </div>
    </div>
  );
}
