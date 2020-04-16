export const create = (userId, token, userToDo) => {
  return fetch(`http://localhost:8000/todo/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: userToDo,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getToDo = (userId, token) => {
  return fetch(`http://localhost:8000/todo/by/${userId}`, {
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

export const singleToDo = (toDoId, token) => {
  return fetch(`http://localhost:8000/todo/${toDoId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const remove = (toDoId, token) => {
  return fetch(`http://localhost:8000/remove/${toDoId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const update = (toDoId, token, todos) => {
  return fetch(`http://localhost:8000/edit/todo/${toDoId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: todos,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
