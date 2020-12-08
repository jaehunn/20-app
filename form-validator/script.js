const formEl = document.getElementById("form");
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("confirm-password");

// Show input error message
function showError(inputEl, message) {
  const formControlEl = inputEl.parentElement;
  const smallEl = formControlEl.querySelector("small");

  formControlEl.className = "form-control error";
  smallEl.innerText = message;
}

// Show success outline
function showSuccess(inputEl) {
  const formControlEl = inputEl.parentElement;

  formControlEl.className = "form-control success";
}

// Get fieldname
function getFieldName(inputEl) {
  return inputEl.id.charAt(0).toUpperCase() + inputEl.id.slice(1);
}

// Check email is valid
// @see https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function checkEmail(emailEl) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(emailEl.value.trim())) showSuccess(emailEl);
  else showError(emailEl, "Email is not valid");
}

// Check passwords match
function checkPasswordMatch(passwordEl, confirmPasswordEl) {
  if (passwordEl.value !== confirmPasswordEl.value)
    showError(confirmPasswordEl, "Password do not match");
}

// Check required fields
function checkRequired(inputEls) {
  inputEls.forEach(function (inputEl) {
    if (!inputEl.value.trim())
      showError(inputEl, `${getFieldName(inputEl)} is required`);
    else showSuccess(inputEl);
  });
}

// Check input length
function checkLength(inputEl, min, max) {
  if (inputEl.value.length < min) {
    showError(
      inputEl,
      `${getFieldName(inputEl)} must be at least ${min} characters`
    );
  } else if (inputEl.value.length > max) {
    showError(
      inputEl,
      `${getFieldName(inputEl)} must be less than ${max} characters`
    );
  } else showSuccess(inputEl);
}

// Event listeners
formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([usernameEl, emailEl, passwordEl, confirmPasswordEl]);

  checkLength(usernameEl, 3, 15);
  checkLength(passwordEl, 6, 20);

  checkEmail(emailEl);

  checkPasswordMatch(passwordEl, confirmPasswordEl);
});
