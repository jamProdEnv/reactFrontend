import { useState } from "react";
import { CubeGeometry } from "./threeComponent/CubeGeometry";
import { Sprite } from "./threeComponent/Sprite";
import { DominoPhysics } from "./threeComponent/DominoPhysics";
import classes from "../CSS/LandingPage.module.css";

const items = [
  { type: "img", src: "/models1.jpg" },
  { type: "img", src: "/models2.jpg" },
  { type: "img", src: "/models3.jpg" },
  { type: "img", src: "/models4.jpg" },
  { type: "img", src: "/models5.png" },
  { type: "img", src: "/models6.jpg" },
  { type: "img", src: "/models7.png" },
  { type: "component", label: "Sprite Raindrops", component: Sprite },
  { type: "component", label: "Cube Geometry", component: CubeGeometry },
  { type: "component", label: "Domino Physics", component: DominoPhysics },
];

export function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const ActiveItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <div className={classes.container}>
      {/* ============================= */}
      {/* Full-screen card/component */}
      {/* ============================= */}
       {/* FULLSCREEN MODAL */}
      {ActiveItem && (
        <div
          className={classes.modalOverlay}
        
        >
          
          <div
            className={classes.modalContent}
            //  explain what stopPropagation() function does
          
          >
            <button className={classes.modalClose}   onClick={() => setActiveIndex(null)}>close</button>
            {ActiveItem.type === "img" && (
              <img src={ActiveItem.src} alt=""/>
            )}

            {ActiveItem.type === "component" && (
              <div className={classes.threeWrapper}>
                <ActiveItem.component />
                 </div>
              
            )}
          </div>
        </div>
      )}
      {/* {ActiveItem && (
        <div className={classes.fullViewOverlay}>
          <button
            className={classes.modalClose}
            onClick={() => setActiveIndex(null)}
          >
            Close
          </button>

          {ActiveItem.type === "img" && (
            <img src={ActiveItem.src} alt="" className={classes.fullImage} />
          )}

          {ActiveItem.type === "component" && (
            <div className={classes.threeWrapper}>
              <ActiveItem.component />
            </div>
          )}
        </div>
      )} */}

      {/* ============================= */}
      {/* Regular Banner + Carousel */}
      {/* ============================= */}
      <div className={classes.banner}>
        {!ActiveItem && (
          <div className={classes.slider} style={{ "--quantity": items.length }}>
            {items.map((item, index) => (
              <div
                key={index}
                className={classes.item}
                style={{ "--position": index + 1 }}
                onClick={() => setActiveIndex(index)}
              >
                {item.type === "img" && <img src={item.src} alt="" />}
                {item.type === "component" && (
                  <div className={classes.image}>
                    (Click) <br />
                    {item.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============================= */}
      {/* Content, author, and model remain */}
      {/* ============================= */}
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
  );
}