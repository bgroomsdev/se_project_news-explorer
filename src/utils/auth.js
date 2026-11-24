export const authorize = () => {
  return new Promise((resolve) => {
    resolve({ token: "a-fake-jwt-token" });
  });
};

export const register = (email, _password, name) => {
  return new Promise((resolve) => {
    resolve({ data: { email, name } });
  });
};

export const checkToken = () => {
  return new Promise((resolve) => {
    resolve({
      data: {
        name: "Elise",
        email: "elise@example.com",
        _id: "fake-user-id-123",
      },
    });
  });
};
