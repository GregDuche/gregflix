import {getUsers, saveUser} from "./Api";
import {sanitize} from "./Utils";

export default class App {

  constructor(appId) {
      this.container = document.getElementById(appId);
      this.setUp();
  }

  /**
   * Registers the app to self execute when page is loaded
   */
  setUp () {
    if (document.readyState === 'complete') {
      this.start();
    } else {
      window.addEventListener('load', (event) => {
        this.start();
      });
    }
  }

  /**
   * Displays element on the home page - user selection and form
   */
  runHomePage() {
    const usersContainer = document.getElementById('select-user');
    usersContainer.innerHTML = '';
    getUsers().then((users) => {
      users.map((user) => {
        const avatar = document.createElement('div');
        avatar.className = `avatar ${user.avatar}`;
        avatar.innerHTML = sanitize(user.name);
        usersContainer.appendChild(avatar);
      });
    }, () => {
      // in this case, we don't care if this fails. We can add a new profile
    });

    const add = document.createElement('button');
    add.innerHTML = '+';
    add.className = 'add-profile';
    add.onclick = () => {
      const userForm = document.getElementById('user-form');
      const addUser = document.getElementById('add-user');

      addUser.onclick = (e) => {
        e.preventDefault();
        // if (checkUserForm()) { @todo: check user form
        const formData = new FormData(document.querySelector('#user-input'));
        let user = {};
        for (const entry of formData.entries()) {
          user[entry[0]] = entry[1];
        }
        saveUser(user).then(() => {
          // @todo: empty form
          userForm.classList.remove('visible');
          this.runHomePage();
        }, () => {
          const error = document.getElementById('form-error');
          error.classList.remove('hidden');
        })
      };

      userForm.classList.toggle('visible');
    };

    usersContainer.appendChild(add);
  }

  start () {
    const content = document.getElementById('content');
    content.classList.add('loaded');
    this.runHomePage();
  }
}
