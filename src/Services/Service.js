const emailExists = async (value) => {
  const respo = await fetch("http://localhost:1337/api/emailExists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailExist: value }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.error(err);
    });
  return respo;
};

const getUserData = async () => {
  const response = fetch("http://localhost:1337/api/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((details) => details);
  return response;
};

const sendUserData = async (values) => {
  const response=await fetch("http://localhost:1337/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: values.firstName,
      lastname: values.lastName,
      email: values.email,
      age: values.age,
      password: values.password,
      role: values.role,
    }),
  }).then((res)=>res).catch((err)=>console.error(err))
  return response;
};
const searchData = async (event) => {
  const response = await fetch("http://localhost:1337/api/searchUsers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload: event }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error("Fetch error:", error);
    });
  return response;
};
const filterData = async (data) => {
  const age = data?.age ? data?.age : 0;
  const role = data?.role ? data?.role : "";
  const response = await fetch("http://localhost:1337/api/filterUsers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload1: age, payload2: role }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => data)
    .catch((err) => console.error(err));
  return response;
};

export default {
  emailExists,
  getUserData,
  sendUserData,
  searchData,
  filterData,
};
