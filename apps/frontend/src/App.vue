<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { client } from './lib/client';
import { ref } from 'vue'
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const fullName = ref('');
const myUser = ref(null);
async function showUser() {
  const user = await client.api.users;
  myUser.value = user;
}
async function createUser() {

  const user = await client.api.auth.newAccount.store({
    body: {
      email: email.value,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value,
      fullName: fullName.value
    }
  });
  console.log(user);
}
</script>
<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <button @click="createUser">Create User</button>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
        <input v-model="email" type="email" name="email" placeholder="Email" />
        <input v-model="password" type="password" name="password" placeholder="Password" />
        <input v-model="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirm Password" />
        <input v-model="fullName" type="text" name="fullName" placeholder="Full Name" />
        <button type="submit" @click="createUser">Create Account</button>
        <button @click="showUser">Show User</button>
        <p>{{ myUser?.id }}</p>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
