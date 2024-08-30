import { login } from "../apis/services/auth.service";
import { errorHandler } from "../libs/errorhandler";
import { setSessionToken } from "../libs/session-manager";
import { toast } from "../libs/toast";
let formLogin = document.getElementById("login-form");

formLogin.addEventListener("submit", sendForm);
async function sendForm(event) {
  event.preventDefault();
  const userInput = document.getElementById("user-input");
  const passwordInput = document.getElementById("password-input");

  try {
    const response = await login({
      username: userInput.value,
      password: passwordInput.value,
    });
    toast("Login successful!","success");
    console.log(response);
    setSessionToken(response.token);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  } catch (error) {
    errorHandler(error);
  }
}
////////////////////////////////////////////////////////////////
let passwordEye = document.getElementById("password-eye");
let passwordInput = document.getElementById("password-input");

passwordEye.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
