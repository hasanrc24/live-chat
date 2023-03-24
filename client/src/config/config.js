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
