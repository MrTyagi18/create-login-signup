// Function to make a Fetch API request
function makeRequest(url, method, data) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }
    return response.json();
  });
}

// Handle login form submission
function handleLogin() {
  var mobileNumber = document.getElementById("mobileNumber").value;

  // Make a Fetch API request to get the OTP
  makeRequest("https://prune.co.in/api/accounts/get_otp/", "POST", {
    phone_number: mobileNumber,
    country_code: "+91",
    is_login: "true",
  })
    .then((response) => {
      document.getElementById("login-layout").style.display = "none";
      document.getElementById("otp-layout").style.display = "block";
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleOtp() {
  var mobileNumber = document.getElementById("mobileNumber").value;
  var Otp = document.getElementById("otp").value;

  // Make a Fetch API request to get the OTP
  makeRequest("https://prune.co.in/api/accounts/verify/", "POST", {
    phone_number: mobileNumber,
    country_code: "+91",
    otp: Otp,
  })
    .then((response) => {
      if (response.otp == Otp) {
        window.location.href = "welcome.html"; //welcome pager
      } else {
        alert("wrong otp");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
// Handle signup form submission
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var mobileNumber = document.getElementById("mobileNumber").value;
    var email = document.getElementById("email").value;
    var gender = document.getElementById("gender").value;
    var dob = document.getElementById("dob").value;
    console.log(event);
    console.log(dob);
    // Make a Fetch API request to verify the OTP
    makeRequest("https://prune.co.in/api/accounts/verify/", "POST", {
      phone_number: mobileNumber,
      country_code: "+91",
    })
      .then((response) => {
        console.log(response.phone_number); // OTP verification response from the server
        // Redirect to the welcome page after successful OTP verification
        if (response === "OTP verified") {
          window.location.href = "login.html";
        }
        console.log(response.otp);
      })
      .catch((error) => {
        console.error(error);
      });
  });
