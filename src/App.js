import {getMovies, getUsers, saveUser} from "./Api";
import {sanitize} from "./Utils";
import catalogTemplate from './templates/catalog.html';
import movieTemplate from './templates/movie.html'

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

        avatar.onclick = () => {
          this.runCatalog();
        }
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

  /**
   * Displays the catalog page
   */
  runCatalog() {
    this.container.innerHTML = catalogTemplate;

    getMovies().then((content) => {
      let promoted = content.find((element) => element.promoted);
      document.getElementById('promoted-content-poster').style['background-image'] = `url(${promoted.poster})`;
      document.getElementById('promoted-content').innerHTML = `<header>
                    <h1>${sanitize(promoted.title)}</h1>
                    <p>${sanitize(promoted.description)}</p>
                </header>`;
      let player = videojs('promoted-player');
      player.src({src: promoted.src, type: promoted.srcType});
      player.play();
      player.on('timeupdate', () => {
        if (player.currentTime() > 1) {
          document.getElementById('promoted-player').classList.remove('hidden');
          document.getElementById('promoted-content-poster').style.opacity = '0';
        }
      });

      let movies = content.filter((item) => item.type === 'movie');
      let movieContainer = document.getElementById('movie-list');
      for (let movie of movies) {
        let template = `<div class="movie">
                <img src="${movie.poster}" alt="" />
                <h3>${sanitize(movie.title)}</h3>
                <p>${sanitize(movie.description)}</p>
            </div>`;
        let div = document.createElement('div');
        div.innerHTML = template;
        div.onclick = () => {
          this.runMovie(movie);
        };
        movieContainer.appendChild(div);
      }
    }, () => {
      // @todo display error messages
    });
  }

  /**
   * Displays the selected movie
   * @param movie
   */
  runMovie(movie) {
    this.container.innerHTML = movieTemplate;
    let player = videojs('playback-player', {
      fill:true
    });
    player.src({src: movie.src, type: movie.srcType});
    player.play();

  }

  start () {
    const content = document.getElementById('content');
    content.classList.add('loaded');
    this.runHomePage();
  }
}
