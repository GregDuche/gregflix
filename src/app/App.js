import {getMovies, getUsers, saveUser} from "../Api";
import {sanitize} from "../Utils";
import catalogTemplate from '../templates/catalog.html';
import movieTemplate from '../templates/movie.html'
import Users from "./Uers";
import Catalog from "./Catalog";

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
      window.addEventListener('load', () => {
        this.start();
      });
    }
  }

  /**
   * Displays element on the home page - user selection and form
   */
  runHomePage() {
    Users.run(this);
  }

  /**
   * Displays the catalog page
   */
  runCatalog() {
    (new Catalog()).run(this);
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
