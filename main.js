function savetoaxios(event){
  event.preventDefault();
  const name = event.target.username.value;
  const email = event.target.emailId.value;
  const phonenumber = event.target.phonenumber.value;

  const obj = {
    name,
    email,
    phonenumber
  }

  axios.post("https://crudcrud.com/api/e40d4e4babcc401abc0a8aea6b7efc3e/appoinmentData",obj)
  .then((response)=>{
    console.log(response)
  })
  .catch((error)=>{
    console.log(error)
  })



  showNewUserOnScreen(obj)
}