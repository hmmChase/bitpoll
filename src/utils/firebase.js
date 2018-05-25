import firebase from 'firebase';
import { config } from '../private/firebase';

firebase.initializeApp(config);

export const provider = new firebase.auth.GithubAuthProvider();
export const auth = firebase.auth();

export default firebase;
