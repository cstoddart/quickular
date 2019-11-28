import firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
});

const db = app.firestore();

export function createGame({ gameId, playerName }) {
  db.collection(gameId)
    .doc('gameStats')
    .set({ started: false });
}

export function startGame({ gameId }) {
  db.collection(gameId)
    .doc('gameStats')
    .update({
      started: true,
    });
}

export function createPlayer({ gameId, playerName }) {
  db.collection(gameId)
    .doc(playerName)
    .set({ ready: true });
}

export function setPlayerReactionTime({ gameId, playerName, reactionTime }) {
  const documentRef = db.collection(gameId).doc(playerName);
  documentRef
    .get()
    .then(function(document) {
      documentRef.update({ reactionTime });
    })
    .catch(function(error) {
      console.warn(error);
    });
}

export function watchPlayers({ gameId, setPlayers }) {
  const unsubscribe = db.collection(gameId)
    .onSnapshot(function(document) {
      const players = document.docs
        .filter((document) => document.id !== 'gameStats')
        .map((document) => ({
          name: document.id,
          ...document.data(),
        }));
      setPlayers(players);
    });
  return unsubscribe;
}

export function watchGameStarted({ gameId, setGameStarted }) {
  const unsubscribe = db.collection(gameId)
    .doc('gameStats')
    .onSnapshot(function(document) {
      const { started } = document.data();
      setGameStarted(started);
    });
  return unsubscribe;
}
