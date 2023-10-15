function savetoaxios(event) {
  event.preventDefault();
  const name = event.target.username.value;
  const email = event.target.emailId.value;
  const phonenumber = event.target.phonenumber.value;

  const obj = {
    name,
    email,
    phonenumber,
  };

  axios
    .post(
      "https://crudcrud.com/api/e40d4e4babcc401abc0a8aea6b7efc3e/appoinmentData",
      obj
    )
    .then((response) => {
      console.log(response);
      showNewUserOnScreen(obj);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showNewUserOnScreen(user) {
  const userList = document.getElementById("userList");
  const listItem = document.createElement("li");
  listItem.textContent = `Name: ${user.name}, Email: ${user.email}, Phone: ${user.phonenumber}`;
  userList.appendChild(listItem);
}

// Load saved users when the page loads
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/e40d4e4babcc401abc0a8aea6b7efc3e/appoinmentData"
    )
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        showNewUserOnScreen(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const form = document.getElementById("userForm");
form.addEventListener("submit", savetoaxios);
