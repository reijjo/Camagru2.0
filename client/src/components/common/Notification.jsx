const Notification = ({ message }) => {
  if (message === null || message === undefined) {
    return null;
  }

  return (
    <div className="info" style={message.style}>
      {message.message}
    </div>
  );
};

export default Notification;
