export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1]?.name : users[0]?.name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);

  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes()}`;

  return `${formattedDate} ${formattedTime}`;
};
