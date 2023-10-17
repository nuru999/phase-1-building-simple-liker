// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const hearts = document.querySelectorAll(".like");

  // Initially, hide the error modal
  errorModal.classList.add("hidden");

  // Helper function to toggle the heart's state
  function toggleHeart(heart) {
    heart.classList.toggle("activated-heart");
  }

  // Helper function to handle the server response
  function handleServerResponse(response) {
    if (response === "success") {
      toggleHeart(this); // Make the heart full and red
    } else {
      errorModal.classList.remove("hidden"); // Show the error modal
      setTimeout(() => {
        errorModal.classList.add("hidden"); // Hide the error modal after 3 seconds
      }, 3000);
    }
  }

  // Attach event listeners to all heart icons
  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(handleServerResponse.bind(heart)) // Bind the current heart as the context
        .catch((error) => console.error(error)); // Handle any server call errors
    });
  });
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
