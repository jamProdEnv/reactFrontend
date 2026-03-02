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
  {type: "img", src: "/models7.png"},
 
  { type: "component", label: "Sprite Raindrops", component: Sprite },
  { type: "component", label: "Cube Geometry", component: CubeGeometry },
  { type: "component", label: "Domino Physics", component: DominoPhysics },
];

export function LandingPage() {
 
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const ActiveItem = activeIndex !== null ? items[activeIndex] : null;
 
  const expandedItem =
    expandedIndex !== null ? items[expandedIndex] : null;

  return (
    <div className={classes.container}>
     
      {expandedItem && (
        <div
          className={classes.modalOverlay}
        
        >
          
          <div
            className={classes.modalContent}
           
            onClick={(e) => e.stopPropagation()}
          >
            <button className={classes.modalClose}   onClick={() => setExpandedIndex(null)}>close</button>
            {expandedItem.type === "img" && (
              <img src={expandedItem.src} alt="" className={classes.fullImage}/>
            )}

            {expandedItem.type === "component" && (
              // <div key={expandedIndex} className={classes.threeWrapper}>
                <expandedItem.component />
                //  {/* </div> */}
              
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
                {/* {item.type === "img" && (
                  <img src={item.src} alt="" />
                )}

                {item.type === "component" && (
                  <div className={classes.image}>
                    (Click) <br/>
                    {item.label}
                  </div>
                )} */}
                 {item.type === "img" && <img src={item.src} alt="" />}
                                {item.type === "component" && (
                                  <div className={classes.image}>
                                    (Click) <br />
                                    {item.label}
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