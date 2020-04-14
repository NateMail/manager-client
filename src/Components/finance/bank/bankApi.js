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
