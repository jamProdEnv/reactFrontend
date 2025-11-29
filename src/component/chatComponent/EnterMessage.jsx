import { useState } from "react";
import PropTypes from "prop-types";
import classes from "../../CSS/ChatCSS/EnterMessage.module.css";
export function EnterMessage({ onSend }) {
  const [message, setMessage] = useState("");

  function handleSend(e) {
    e.preventDefault();
    onSend(message);
    setMessage("");
  }

  return (
    <form className={classes.enterMessageForm} onSubmit={handleSend}>
      {/* <input
        className={classes.enterMessageInput}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      /> */}
      <textarea
        className={classes.enterMessageInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <input
        className={classes.enterMessageSubmit}
        type="submit"
        value="send"
      />
    </form>
  );
}

EnterMessage.propTypes = {
  onSend: PropTypes.func.isRequired,
};
