import { useState } from "react";

import { Minimize } from "@mui/icons-material";
import { Close } from "@mui/icons-material";
import { OpenInFull } from "@mui/icons-material";

export function MinMaxSizeUtility({ minimized, closed }) {
  const [isMinimized, setMinimized] = useState(false);
  const [isClosed, setClosed] = useState(false);
  return (
    <>
      {minimized && (
        <header>
          <button onClick={() => setMinimized(true)}>
            <OpenInFull />
          </button>
          <button onClick={() => setClosed(false)}>
            <Close />
          </button>
        </header>
      )}
    </>
  );
}
