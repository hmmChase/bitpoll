import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBtlh3EWl68895pmLKVoHpw95G2QYKsYf8',
  authDomain: 'bit-poll.firebaseapp.com',
  databaseURL: 'https://bit-poll.firebaseio.com',
  projectId: 'bit-poll',
  storageBucket: 'bit-poll.appspot.com',
  messagingSenderId: '1009809453468'
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GithubAuthProvider();
export const auth = firebase.auth();

export default firebase;
