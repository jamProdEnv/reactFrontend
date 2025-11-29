import { Outlet } from "react-router-dom";
import { GlobalHeader } from "./GlobalHeader";
import { GlobalFooter } from "./GlobalFooter";

import { ChatRoom } from "./chatComponent/ChatRoom";
import { userContext } from "../context/UserContext";
import classes from "../CSS/Wrapper.module.css";

export function Wrapper() {
  const { username } = userContext();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <header className={classes.header}>
            <GlobalHeader />
          </header>
          <main>
            <Outlet />

            <ChatRoom />
          </main>
          <footer>
            <GlobalFooter />
          </footer>
        </div>
      </div>
    </>
  );
}
