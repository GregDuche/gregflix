import {sanitize} from "./Utils";

const users = [
  {
    name: 'greg',
    avatar: 'avatar-3'
  }
];

const movies = [
  {
    title: 'My example movie',
    poster: '/img/movieData/01/movie01.png',
    description: 'This is the promo content. Wait a few seconds, it will start playing muted in the background. If you click watch now, it\'ll open the player and continue playing',
    promoted: true,
    src: 'https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd',
    srcType: 'application/dash+xml',
    type: 'movie'
  },
  {
    title: 'Parkour',
    poster: '/img/movieData/01/movie01.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae imperdiet libero, semper rutrum mi. Suspendisse elementum odio ornare suscipit semper. ',
    promoted: false,
    src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
    srcType: 'application/x-mpegURL',
    type: 'movie'
  },
  {
    title: 'My third movie',
    poster: '/img/movieData/01/movie01.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae imperdiet libero, semper rutrum mi. Suspendisse elementum odio ornare suscipit semper. ',
    promoted: false,
    src: 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest.mpd',
    srcType: 'application/dash+xml',
    type: 'movie'
  },
  {
    title: 'My fourth movie',
    poster: '/img/movieData/01/movie01.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae imperdiet libero, semper rutrum mi. Suspendisse elementum odio ornare suscipit semper. ',
    promoted: false,
    src: 'https://dash.akamaized.net/dash264/TestCasesUHD/2b/11/MultiRate.mpd',
    srcType: 'application/dash+xml',
    type: 'movie'
  },
  {
    title: 'Big Buck Bunny',
    poster: '/img/movieData/01/movie01.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae imperdiet libero, semper rutrum mi. Suspendisse elementum odio ornare suscipit semper. ',
    promoted: false,
    src: 'http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8',
    srcType: 'application/x-mpegURL',
    type: 'movie'
  },

  {
    title: 'My last movie',
    poster: '/img/movieData/01/movie01.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae imperdiet libero, semper rutrum mi. Suspendisse elementum odio ornare suscipit semper. ',
    promoted: false,
    src: 'http://www.streambox.fr/playlists/test_001/stream.m3u8',
    srcType: 'application/x-mpegURL',
    type: 'movie'
  },
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

export const getMovies = () => {
  return new Promise((resolve) => {
    resolve(movies);
  });
};
