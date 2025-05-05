// api.js
const BASE_URL = "http://127.0.0.1:8000/api";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login/`, {  // <-- notice the slash
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};


export const signupUser = async ( email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
  
      return data;
    } catch (error) {
      throw error;
    }
  };

