import { useState } from "react";
import { CubeGeometry } from "./threeComponent/CubeGeometry";
import { Sprite } from "./threeComponent/Sprite";
import classes from "../CSS/LandingPage.module.css";
import { DominoPhysics } from "./threeComponent/DominoPhysics";

const items = [
  { type: "img", src: "/models1.jpg" },
  { type: "img", src: "/models2.jpg" },
  { type: "img", src: "/models3.jpg" },
  { type: "img", src: "/models4.jpg" },
  { type: "img", src: "/models5.png" },
  { type: "img", src: "/models6.jpg" },
  { type: "component", component: Sprite },
  { type: "component", component: CubeGeometry },
  // { type: "component", component: DominoPhysics },
];

export function LandingPage() {
  //  State of clicked card vs not clicked
  const [expandedIndex, setExpandedIndex] = useState(null);

  //  If index is available pass index to the iems list
  const expandedItem =
    expandedIndex !== null ? items[expandedIndex] : null;

  return (
    <div className={classes.container}>
      {/* FULLSCREEN MODAL */}
      {expandedItem && (
        <div
          className={classes.modalOverlay}
        
        >
          
          <div
            className={classes.modalContent}
            //  explain what stopPropagation() function does
            onClick={(e) => e.stopPropagation()}
          >
            <button className={classes.modalClose}   onClick={() => setExpandedIndex(null)}>close</button>
            {expandedItem.type === "img" && (
              <img src={expandedItem.src} alt="" />
            )}

            {expandedItem.type === "component" && (
              <expandedItem.component />
            )}
          </div>
        </div>
      )}

      <div className={classes.banner}>
        <div
          className={classes.slider}
          style={{ "--quantity": items.length }}
        >
          {items.map((item, index) => {
            const Component = item.component;

            return (
              <div
                key={index}
                className={classes.item}
                style={{ "--position": index + 1 }}
                onClick={() => setExpandedIndex(index)}
              >
                {item.type === "img" && (
                  <img src={item.src} alt="" />
                )}

                {item.type === "component" && (
                  <div className={classes.image}>
                    <Component />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={classes.content}>
          <h1 data-content="WSJR PORTFOLIO">
            WSJR PORTFOLIO
          </h1>

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
