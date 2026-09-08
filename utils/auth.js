import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../services/api/userApi";

const CURRENT_USER_KEY = "chill_current_user";

// =========================
// CREATE USER
// =========================

export async function registerUser(userData) {
  try {
    const users = await getUsers();

    // Cek username
    const existingUser = users.find(
      (user) => user.username === userData.username,
    );

    if (existingUser) {
      return {
        success: false,
        message: "Username sudah terdaftar.",
      };
    }

    // Buat user baru
    const newUser = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      myList: [],
    };

    const user = await addUser(newUser);

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Register error:", error);

    return {
      success: false,
      message: "Terjadi kesalahan saat membuat akun.",
    };
  }
}

// =========================
// LOGIN
// =========================

export async function loginUser(username, password) {
  try {
    const users = await getUsers();

    const user = users.find(
      (user) =>
        user.username === username &&
        user.password === password,
    );

    if (!user) {
      return {
        success: false,
        message: "Username atau password salah.",
      };
    }

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(user),
    );

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Login error:", error);

    return {
      success: false,
      message: "Gagal menghubungkan ke server.",
    };
  }
}

// =========================
// CURRENT USER
// =========================

export function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

// =========================
// DELETE USER
// =========================

export async function deleteCurrentUser() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      message: "User belum login.",
    };
  }

  try {
    await deleteUser(currentUser.id);

    localStorage.removeItem(CURRENT_USER_KEY);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete account error:", error);

    return {
      success: false,
      message: "Gagal menghapus akun.",
    };
  }
}

// =========================
// UPDATE USER
// =========================

export async function updateCurrentUser(updatedData) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      message: "User belum login.",
    };
  }

  try {
    const updatedUser = await updateUser(
      currentUser.id,
      {
        ...currentUser,
        ...updatedData,
      },
    );

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(updatedUser),
    );

    return {
      success: true,
      user: updatedUser,
    };
  } catch (error) {
    console.error("Update error:", error);

    return {
      success: false,
      message: "Terjadi kesalahan saat update profil.",
    };
  }
}

// =========================
// LOGOUT
// =========================

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}