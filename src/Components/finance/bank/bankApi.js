export const create = (userId, token, userBank) => {
  return fetch(`http://localhost:8000/bank/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: userBank,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getBank = (userId, token) => {
  return fetch(`http://localhost:8000/bank/by/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const update = (bankId, token, banks) => {
  return fetch(`http://localhost:8000/edit/bank/${bankId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: banks,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
