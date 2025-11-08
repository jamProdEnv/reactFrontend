import { Outlet } from "react-router-dom";
import { GlobalHeader } from "./GlobalHeader";

export function Wrapper() {
  return (
    <>
      <GlobalHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}
