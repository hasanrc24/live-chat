export const getSender = (loggedUser, chatUsers) => {
  return chatUsers[0]?._id === loggedUser?._id ? chatUsers[1] : chatUsers[0];
};

export const formatTime = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedTime = `${formattedHours}.${formattedMinutes}${ampm}`;
  return formattedTime;
};

export const isSameSender = (allMessages, message, i, userId) => {
  return (
    i < allMessages.length - 1 &&
    (allMessages[i + 1].sender._id !== message.sender._id ||
      allMessages[i + 1].sender._id === undefined) &&
    allMessages[i].sender._id !== userId
  );
};

export const isLastMessage = (allMessages, i, userId) => {
  return (
    i === allMessages.length - 1 &&
    allMessages[allMessages.length - 1].sender._id !== userId &&
    allMessages[allMessages.length - 1].sender._id
  );
};
