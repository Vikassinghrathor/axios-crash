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
      showNewUserOnScreen(obj, response.data._id); // Pass the user ID from the response
      resetForm();
    })
    .catch((error) => {
      console.log(error);
    });
}

function showNewUserOnScreen(user, userId) {
  const userList = document.getElementById("userList");
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    Name: ${user.name}, Email: ${user.email}, Phone: ${user.phonenumber}
    <button onclick="editUser('${userId}')">Edit</button>
    <button onclick="deleteUser('${userId}')">Delete</button>`;
  listItem.id = userId; // Set the ID for the list item
  userList.appendChild(listItem);
}

function resetForm() {
  const form = document.getElementById("userForm");
  form.reset();
}

function editUser(userId) {
  axios
    .get(
      `https://crudcrud.com/api/e40d4e4babcc401abc0a8aea6b7efc3e/appoinmentData/${userId}`
    )
    .then((response) => {
      const user = response.data;
      document.getElementById("username").value = user.name;
      document.getElementById("emailId").value = user.email;
      document.getElementById("phonenumber").value = user.phonenumber;
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function to delete a user by their ID
function deleteUser(userId) {
  axios
    .delete(
      `https://crudcrud.com/api/e40d4e4babcc401abc0a8aea6b7efc3e/appoinmentData/${userId}`
    )
    .then((response) => {
      // Remove the deleted user from the list by ID
      const userItem = document.getElementById(userId);
      userItem.remove();
      resetForm();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Load saved users when the page loads
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/e40d4e4babcc401abc0a8aea6b7efc3e/appoinmentData"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        showNewUserOnScreen(response.data[i], response.data[i]._id);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const form = document.getElementById("userForm");
form.addEventListener("submit", savetoaxios);
