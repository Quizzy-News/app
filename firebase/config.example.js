/**
 * Firebase web configuration for Quizzy.News.
 *
 * Copy this file to firebase/config.js before building:
 *
 *     cp firebase/config.example.js firebase/config.js
 *
 * config.js is gitignored; this example is not.
 *
 * NOTE ON SECRECY: these values are NOT secrets. A Firebase web config is
 * compiled into every browser bundle by design — you can read these exact
 * values today by viewing source on https://quizzy.news. What actually
 * protects your data is Firestore Security Rules, not hiding this file.
 * They are committed here so a fresh clone builds without hunting for
 * credentials.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyDIpEdbHCrwgudlLPb8uh-D8rg9A-gyX-I",
  authDomain: "qz-news.firebaseapp.com",
  projectId: "qz-news",
  storageBucket: "qz-news.appspot.com",
  messagingSenderId: "949669847499",
  appId: "1:949669847499:web:a796fdc3aa2029b833964e",
  measurementId: "G-WET2TDDVTY",
};
