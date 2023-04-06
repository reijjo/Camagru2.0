const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="info" style={message.style}>
      {message.message}
    </div>
  );
};

export default Notification;
