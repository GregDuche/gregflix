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

  runCatalog() {
    let catalogTemplate = `
    <section id="content" class="loaded catalog">
        <header>
            <div class="logo">
                <img src="/img/gregflix.png" alt="GregFlix logo"/>
            </div>
            <div class="user" id="user-profile"></div>
        </header>
        <section id="promoted">
            <video id="promoted-player" muted class="hidden"></video>
            <div id="promoted-content-poster" style="background-image:url('/img/movieData/01/movie01.png'); "></div>
            <div id="promoted-content">
                <header>
                    <h1>My example movie</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae imperdiet libero, semper rutrum mi. Suspendisse elementum odio ornare suscipit semper. Curabitur quis cursus purus. Etiam non ligula dignissim, lacinia tellus a, accumsan neque. Maecenas vel pretium metus. Suspendisse dapibus quam lacus, ac tincidunt est lobortis sit amet. Mauris feugiat, quam scelerisque volutpat pretium, ligula nisl bibendum metus, eu luctus est turpis eget massa. Nulla facilisi.</p>
                </header>
            </div>
        </section>
        <section id="watching-now"></section>
        <section id="Sci Fi"></section>
    </section>`;

    this.container.innerHTML = catalogTemplate;

    let player = videojs('promoted-player');
    player.src({src: 'https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd', type: 'application/dash+xml'});
    player.play();
    player.on('timeupdate', () => {
      if (player.currentTime() > 1) {
        document.getElementById('promoted-player').classList.remove('hidden');
        document.getElementById('promoted-content-poster').style.opacity = '0';
      }
    });
  }

  start () {
    const content = document.getElementById('content');
    content.classList.add('loaded');
    this.runHomePage();
  }
}
