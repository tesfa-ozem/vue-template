<template>
  <div class="main-container">
    <div class="container" v-bind:class="{ 'right-panel-active': isActive }" id="container">
      <div class="form-container sign-up-container">
        <form @submit.prevent="register">
          <h1>Create Account</h1>
          <div class="social-container">
            <a href="#" class="social">
              <i class="lab la-facebook-f"></i>
            </a>
            <a href="#" class="social">
              <i class="lab la-google-plus-g"></i>
            </a>
            <a href="#" class="social">
              <i class="lab la-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name"/>
          <input type="email" v-model="email" placeholder="Email"/>
          <input type="password" v-model="password" placeholder="Password"/>
          <input type="password" v-model="password_confirmation" placeholder="Confirm Password"/>
          <button type="button" @click="register() ">Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form>
          <h1>Sign in</h1>
          <div class="social-container">
            <a href="#" class="social">
              <i class="lab la-facebook-f"></i>
            </a>
            <a href="#" class="social">
              <i class="lab la-google-plus-g"></i>
            </a>
            <a href="#" class="social">
              <i class="lab la-linkedin-in"></i>
            </a>
          </div>
          <span>or use your account</span>
          <input type="text" v-model="email" placeholder="User Name"/>
          <input type="password" v-model="password" placeholder="Password"/>
          <a href="#">Forgot your password?</a>
          <button @click="login()" type="button">Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" @click="toggleOverlay()" id="signIn">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" @click="toggleOverlay()" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  @Component
  export default class ComponentName extends Vue {
    isActive = false;
    user_name = "";
    login_password = "";
    name = "";
    email = "";
    password = "";
    password_confirmation = "";
    is_admin = null;

    toggleOverlay() {
      if (this.isActive) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    }

    login() {

      let auth = {
        username: this.email,
        password: this.password
      };

      this.$store
        .dispatch("singin", auth)
        .then(() => {
          this.$router.push("/onboarding")
          this.$store.commit("set_animation", false);
        })
        .catch(err => {
          this.$store.commit("set_animation", false);
        });
    }

    register() {
      this.$store.commit("set_animation", true);
      let data = {
        username: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("signup", data)
        .then((resp) => {
          console.log("any")
          this.$store.commit("set_animation", false);
        })
        .catch(err => {
          alert(err)
          this.$store.commit("set_animation", false);
        });
    }

    get isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }

    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
</script>

<style scoped>
  .main-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    font-family: "IBM Plex Sans", sans-serif;
    padding-top: 150px;
  }


  h1 {
    font-weight: bold;
    margin: 0;
    font-family: "IBM Plex Sans", sans-serif;
  }

  h2 {
    text-align: center;
    font-family: "IBM Plex Sans", sans-serif;
  }

  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
    font-family: "IBM Plex Sans", sans-serif;
  }

  span {
    font-size: 12px;
    font-family: "IBM Plex Sans", sans-serif;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
    font-family: "IBM Plex Sans", sans-serif;
  }

  button {
    border-radius: 20px;
    border: 1px solid #ffffff;
    background-color: #09792a;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background-color: transparent;
    border-color: #FFFFFF;
  }

  form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%, 100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    background: rgb(13, 66, 0);
    background: linear-gradient(45deg, rgba(13, 66, 0, 1) 0%, rgba(9, 121, 42, 1) 37%, rgba(0, 255, 102, 1) 100%);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }

  .social-container {
    margin: 20px 0;
  }

  .social-container a {
    border: 1px solid #DDDDDD;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }

  footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
  }

  footer p {
    margin: 10px 0;
  }

  footer i {
    color: red;
  }

  footer a {
    color: #3c97bf;
    text-decoration: none;
  }
</style>
