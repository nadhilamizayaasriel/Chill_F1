const USERS_KEY = "chill_users";
const CURRENT_USER_KEY = "chill_current_user";

export function getUsers() {
  const users = localStorage.getItem(USERS_KEY);

  if (!users) {
    return [];
  }

  return JSON.parse(users);
}

export function registerUser(userData) {
  const users = getUsers();

  const existingUser = users.find(
    (user) => user.username === userData.username
  );

  if (existingUser) {
    return {
      success: false,
      message: "Username sudah terdaftar.",
    };
  }

  const newUser = {
    id: Date.now(),
    username: userData.username,
    email: userData.email,
    password: userData.password,
    myList: [],
  };

  const updatedUsers = [...users, newUser];

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(updatedUsers)
  );

  return {
    success: true,
    user: newUser,
  };
}

export function loginUser(username, password) {
  const users = getUsers();

  const user = users.find(
    (user) =>
      user.username === username &&
      user.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Username atau password salah.",
    };
  }

  const currentUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password,
  };

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(currentUser)
  );

  return {
    success: true,
    user: currentUser,
  };
}

export function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

export function updateCurrentUser(updatedData) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      message: "User belum login.",
    };
  }

  const users = getUsers();

  const updatedUsers = users.map((user) => {
    if (user.id !== currentUser.id) {
      return user;
    }

    return {
      ...user,
      ...updatedData,
    };
  });

  const updatedCurrentUser = {
    ...currentUser,
    ...updatedData,
  };

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(updatedUsers),
  );

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(updatedCurrentUser),
  );

  return {
    success: true,
    user: updatedCurrentUser,
  };
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}