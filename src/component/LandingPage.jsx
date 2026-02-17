import { useState } from "react";
import { CubeGeometry } from "./threeComponent/CubeGeometry";
import { Sprite } from "./threeComponent/Sprite";
import classes from "../CSS/LandingPage.module.css";

const items = [
  { type: "img", src: "/models1.jpg" },
  { type: "img", src: "/models2.jpg" },
  { type: "img", src: "/models3.jpg" },
  { type: "img", src: "/models4.jpg" },
  { type: "img", src: "/models5.png" },
  { type: "img", src: "/models6.jpg" },
  { type: "component", component: Sprite },
  { type: "component", component: CubeGeometry },
];

export function LandingPage() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const expandedItem =
    expandedIndex !== null ? items[expandedIndex] : null;

  return (
    <div className={classes.container}>
      {/* FULLSCREEN MODAL */}
      {expandedItem && (
        <div
          className={classes.modalOverlay}
          onClick={() => setExpandedIndex(null)}
        >
          <div
            className={classes.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
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
