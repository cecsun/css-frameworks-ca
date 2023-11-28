const API_BASE_URL = 'https://api.noroff.dev';

async function registerUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

const user = {
  name: "my_username",
  email: "first.last@stud.noroff.no",
  password: "UzI1NiIsInR5cCI",
};

const registerUrl = `${API_BASE_URL}/api/v1/social/auth/register`;

registerUser(registerUrl, user);
// registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);