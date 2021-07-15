import {getUsers, saveUser} from "../Api";
import {sanitize} from "../Utils";

export default class Users {

  /**
   * Create the avatar element
   * @param user
   * @returns {HTMLDivElement}
   */
  static createAvatar(user) {
    const avatar = document.createElement('div');
    avatar.className = `avatar ${user.avatar}`;
    avatar.innerHTML = sanitize(user.name);
    return avatar;
  }

  /**
   * Activates user interaction for profiles
   * @param app
   */
  static run(app) {
    this.usersContainer = document.getElementById('select-user');
    this.usersContainer.innerHTML = '';

    getUsers().then((users) => {
      users.map((user) => {
        const avatar = Users.createAvatar(user);
        this.usersContainer.appendChild(avatar);

        avatar.onclick = () => {
          app.runCatalog();
        }
      });
    }, () => {
      // in this case, we don't care if this fails. We can add a new profile
    });

    Users.displayAddButton(app);
  }

  /**
   * Display the add button and binds events
   * @param app
   */
  static displayAddButton(app) {
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
          app.runHomePage();
        }, () => {
          const error = document.getElementById('form-error');
          error.classList.remove('hidden');
        })
      };

      userForm.classList.toggle('visible');
    };

    this.usersContainer.appendChild(add);
  }

}
