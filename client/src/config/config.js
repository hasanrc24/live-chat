export const getSender = (loggedUser, chatUsers) => {
  return chatUsers[0]?._id === loggedUser?._id ? chatUsers[1] : chatUsers[0];
};
