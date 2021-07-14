import {sanitize} from "./Utils";

const users = [
  {
    name: 'greg',
    avatar: 'avatar-3'
  }
];

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const saveUser = (input) => {
  return new Promise((resolve) => {
    let user = {}
    user.name = sanitize(input.name);
    user.email = sanitize(input.email);
    user.avatar = sanitize(input.avatar || 'avatar-1');
    users.push(user);
    resolve();
  });
};

