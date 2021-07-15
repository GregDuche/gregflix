import catalogTemplate from "../templates/catalog.html";
import {getMovies} from "../Api";
import {sanitize} from "../Utils";

export default class Catalog {
  run(app) {
    this.app = app;
    app.container.innerHTML = catalogTemplate;

    getMovies().then((content) => {
      this.showPromoted(content);
      this.showMovies(content);
    }, () => {
      // @todo display error messages
    });
  }

  /**
   * Displays the promotional content on top of the page
   * @param content
   */
  showPromoted(content) {
    let promoted = content.find((element) => element.promoted);
    if (promoted) {
      this.poster = document.getElementById('promoted-content-poster');
      if (this.poster) {
        this.poster.style['background-image'] = `url(${promoted.poster})`;
      }

      const promotedContent = document.getElementById('promoted-content');
      if (promotedContent) {
        promotedContent.innerHTML = `<header>
                    <h1>${sanitize(promoted.title)}</h1>
                    <p>${sanitize(promoted.description)}</p>
                    <button id="promo-watch-now">Watch now</button>
                </header>`;
        this.loadPlayer(promoted);
        this.bindWatchEvent(promoted);
      }
    }
  }

  showMovies(content) {
    const movieContainer = document.getElementById('movie-list');
    for (let movie of content.filter((item) => item.type === 'movie')) {
      let template = `<div class="movie">
                <img src="${movie.poster}" alt="" />
                <h3>${sanitize(movie.title)}</h3>
                <p>${sanitize(movie.description)}</p>
            </div>`;
      let div = document.createElement('div');
      div.innerHTML = template;
      div.onclick = () => {
        this.app.runMovie(movie);
      };
      movieContainer.appendChild(div);
    }
  }

  /**
   * Loads player for promo content
   * @param movie
   */
  loadPlayer(movie) {
    if (typeof movie.src === 'string' && typeof movie.srcType === 'string') {
      this.player = videojs('promoted-player');
      this.player.src({src: movie.src, type: movie.srcType});
      this.player.play();
      this.player.on('timeupdate', () => {
        if (this.player.currentTime() > 1) {
          this.player.el().classList.remove('hidden');
          if (this.poster) {
            this.poster.style.opacity = '0';
          }
        }
      });
    }
  }

  bindWatchEvent(movie) {
    const watchNow = document.getElementById('promo-watch-now');
    watchNow.onclick = () => {
      movie.player = this.player;
      this.app.runMovie(movie);
    }
  }

}
