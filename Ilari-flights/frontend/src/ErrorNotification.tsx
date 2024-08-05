const ErrorNotification = ({ text }: { text: string }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(255,0,0,0.5)",
        borderRadius: "10px",
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <b>{text}</b>
    </div>
  );
};

export default ErrorNotification;
