const submitLoginForm = document.querySelector(".submit-login-form")
submitLoginForm.addEventListener("click", async (event) => {
    const API_BASE_URL = 'https://api.noroff.dev';
    event.preventDefault();
    if (!validateLoginForm()) {
      return false;
    }
  
    const user = {
      email: document.forms["login"]["email"].value,
      password: document.forms["login"]["password"].value,
    }

    response = await loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, user);
    if (response.statusCode == 401) {
        if (response.errors.length > 0) {
            alert(response.errors[0].message);
        }
        return false;
    }
    window.location.href = `profile.html?name=${response.email}&email=${response.email}`;
}, true);

/**
 * Log in user with provided credentials authenticate 
 * Stores JWT access token, user email and name. 
 * @param {string} url 
 * @param {object} data 
 * @returns login request response/error
 */
async function loginUser(url, data) {
    try {
        const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        };
        const response = await fetch(url, postData);
        const json = await response.json();
        const accessToken = json.accessToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('email', json.email);
        localStorage.setItem('name', json.name);
        return json;
    } catch (error) {
        return error;
    }
}

/**
 * Validates email and password in login form.
 */

function validateLoginForm() {
    let x = document.forms["login"]["email"].value;
    if (!validateEmail(x)) {
        alert("Email address must be valid");
        return false; 
    }

    x = document.forms["login"]["password"].value;
    if (x.length < 8) {
        alert("Password must be at least 8 characters");
        return false;
    }
    return true;
}