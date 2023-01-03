

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCSOsAdb5KlBTWg8OaI-kb3Np_apubBzBs",
    authDomain: "clone-7e368.firebaseapp.com",
    databaseURL: "https://clone-7e368-default-rtdb.firebaseio.com",
    projectId: "clone-7e368",
    storageBucket: "clone-7e368.appspot.com",
    messagingSenderId: "156834042204",
    appId: "1:156834042204:web:4717c05711d9747a88b199",
    measurementId: "G-VF48NF5E0E"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Create a users collection
const usersRef = db.collection('users');

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // Sign in user
  firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
    // Close the login modal
    const loginModal = document.querySelector('#modal-login');
    M.Modal.getInstance(loginModal).close();
    loginForm.reset();
  }).catch(function(error) {
    // Handle errors here
    console.error(error);
  });
});

function addToCart(item) {
  // Get the user's ID
  const userId = firebase.auth().currentUser.uid;

  // Get the user's document
  const userRef = usersRef.doc(userId);

  // Add the item to the user's cart
  userRef.update({
    cart: firebase.firestore.FieldValue.arrayUnion(item)
  });
}

const addButton = document.querySelector('#add-to-cart-button');

addButton.addEventListener('click', () => {
  const item = {
    name: 'Item Name',
    price: 19.99
  };
  addToCart(item);
});
