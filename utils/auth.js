const CURRENT_USER_KEY = "chill_current_user";

const API_URL =
  "https://6a8e839ba12b7de8cc0ea7c9.mockapi.io/api/chill1/users";

// =========================
// READ USERS
// =========================

export async function getUsers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Gagal mengambil data user.");
  }

  return await response.json();
}

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

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Gagal membuat akun.",
      };
    }

    const user = await response.json();

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

    // Simpan user yang sedang login
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
  const user = localStorage.getItem(
    CURRENT_USER_KEY,
  );

  if (!user) {
    return null;
  }

  return JSON.parse(user);
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
    const response = await fetch(
      `${API_URL}/${currentUser.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...currentUser,
          ...updatedData,
        }),
      },
    );

    if (!response.ok) {
      return {
        success: false,
        message: "Gagal memperbarui profil.",
      };
    }

    const updatedUser = await response.json();

    // Update user yang sedang login
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