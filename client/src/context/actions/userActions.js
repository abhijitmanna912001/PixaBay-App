export const SET_USER = (user) => {
  return { type: "SET_USER", user: user };
};

export const GET_USER = (user) => {
  return { type: "GET_USER" };
};

export const SET_USER_NULL = (user) => {
  return { type: "SET_USER_NULL", user: null };
};
