const submitCreateProfileForm = document.querySelector(".submit-create-profile-form")

submitCreateProfileForm.addEventListener("click", async (event) => {
  const API_BASE_URL = 'https://api.noroff.dev';
  event.preventDefault();
  if (!validateCreateProfileForm()) {
    return false;
  }

  const newUser = {
    name: document.forms["create-profile"]["name"].value,
    email: document.forms["create-profile"]["email"].value,
    password: document.forms["create-profile"]["password"].value,
  }

  let response = await registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, newUser);
  if (response.statusCode === 400) {
    if (response.errors.length > 0) {
      alert(response.errors[0].message);
    }
    return false;
  }

  response = await loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, newUser);
  if (response.statusCode == 401) {
    if (response.errors.length > 0) {
        alert(response.errors[0].message);
    }
    return false;
  }
  window.location.href = `profile.html?name=${response.name}&email=${response.email}`;
  return true;
}, true);

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
    // console.log(response);
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}


function validateCreateProfileForm() {
  let x = document.forms["create-profile"]["name"].value;
  if (x.length <= 5) {
    alert("Username must be more than 5 characters");
    return false;
  }
  " cecsun"

  if (x.split(" ").length >= 2) {
    alert("Username cannot contain spaces ");
    return false;
  }

  x = document.forms["create-profile"]["email"].value;
  if (!validateEmail(x)) {
      alert("Email address must be valid");
      return false; 
  }

  if (!validateNoroffEmail(x)) {
      alert("Email must be of type @stud.noroff.no or @noroff.no");
      return false;
  }

  x = document.forms["create-profile"]["password"].value;
  if (x.length < 8) {
    alert("Password must be at least 8 characters");
    return false;
  }
  return true;
}

function validateEmail(email) {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

function validateNoroffEmail(email) {
  const validEmailDomains = ["stud.noroff.no", "noroff.no"];
  emailParts = email.split("@");
  lastEmailPart = emailParts[emailParts.length-1];
  for (let i = 0; i < validEmailDomains.length; i++) {
    if (lastEmailPart === validEmailDomains[i]) {
      return true;
    }
  }
  return false;
}

// const user = {
//   name: 'test_account_a',
//   email: 'test-account-a@noroff.no',
//   password: 'my-password',
// };

// registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);