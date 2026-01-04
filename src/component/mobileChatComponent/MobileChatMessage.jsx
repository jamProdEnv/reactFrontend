import PropTypes from "prop-types";
export function MobileChatMessage({ room, username, message, replayed }) {
  return (
    <div>
      {username ? (
        <span>
          <code>[{room}]</code>
          <b>{username}</b> : {message}
        </span>
      ) : (
        <i>{message}</i>
      )}
    </div>
  );
}

MobileChatMessage.propTypes = {
  username: PropTypes.string,
  message: PropTypes.string.isRequired,
  replayed: PropTypes.bool,
  room: PropTypes.string,
};
