  // Initialize Firebase
var config = {
  apiKey: "AIzaSyB5SYlYd7xoUUNl1OOhaWYSN0dwjGCUJes",
  authDomain: "loginpage-c5a98.firebaseapp.com",
  databaseURL: "https://loginpage-c5a98.firebaseio.com",
  projectId: "loginpage-c5a98",
  storageBucket: "loginpage-c5a98.appspot.com",
  messagingSenderId: "765492572399"
};
  
firebase.initializeApp(config);

var database = firebase.database();

$('#login-submit-btn').on('click', function(event) {
  event.preventDefault();

  var userName = $('#login-user-name').val().trim().toLowerCase();

  var password = $('#login-password').val().trim();

  checkIfUserExists(userName, password, true);
});

$('#new-submit-btn').on('click', function(event) {
  event.preventDefault();

  var userName = $('#new-user-name').val().trim().toLowerCase();

  var password = $('#new-password').val().trim();

  checkIfUserExists(userName, password, false);

}); 

function checkIfUserExists(userName, password, userIsLoginIn) {
  database.ref('users/' + userName).once('value')
    .then(function(snapshot) {
        if(userIsLoginIn) {
          if(snapshot.exists()) {
            if(password === snapshot.child('password').val())
            {
              // Allow login
              showUserLoginMessage('Login allowed');
            } else {
              showUserLoginMessage('Incorrect User Name or Password');
            }
          } else {
            // User does not exist, point user to create user
            showUserLoginMessage('Incorrect User Name or Password');
          }
        } else {
          // New user being registered
          if(snapshot.exists()) {
            // User already exists
            showNewUserMessage('User Name is already in use');
          } else {
            // User can be added to database
            addUserToDatabase(userName, password);

            showNewUserMessage('User has been registered');
          }
        }
    });
}

function addUserToDatabase(userName, password) {
  var newUserObj = {
    username: userName,
    password: password,
  };

  database.ref('/users/' + userName).set(newUserObj);
  
}

function showUserLoginMessage(message) {
  $('#login-messages').text(message);
}

function showNewUserMessage(message) {
  $('#new-user-messages').text(message);
}
