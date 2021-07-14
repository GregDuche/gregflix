import {getUsers} from "./users";
import {sanitize} from "./utils";

const usersContainer = document.getElementById('select-user');
getUsers().map((user) => {
  let avatar = document.createElement('div');
  avatar.className = `avatar ${user.avatar}`;
  avatar.innerHTML = sanitize(user.name);
  usersContainer.appendChild(avatar);
});

const checkUserForm = () => {
  // @todo: implement form validation
  return true;
};

const add = document.createElement('button');
add.innerHTML = '+';
add.className = 'add-profile';
add.onclick = () => {
  const addUser = document.getElementById('add-user');
  addUser.onclick = (e) => {
    e.preventDefault();
    if (checkUserForm()) {
      console.log('SAVE USER');
    }
  }
  const userForm = document.getElementById('user-form');
  userForm.classList.toggle('visible');
};

usersContainer.appendChild(add);


const app = document.getElementById('gregflix');
const content = document.getElementById('content');
content.classList.add('loaded');
