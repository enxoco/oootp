<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isLoggedIn, login, register } from '@/lib/auth'

const router = useRouter()

if (isLoggedIn.value) {
  router.replace('/dashboard')
}

const mode = ref<'login' | 'register'>('login')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const fullName = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    if (mode.value === 'login') {
      await login(email.value, password.value)
    } else {
      await register(email.value, password.value, passwordConfirmation.value, fullName.value)
    }
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e?.response?.message ?? e?.message ?? 'Something went wrong'
  } finally {
    loading.value = false
  }
}

function switchMode(m: 'login' | 'register') {
  mode.value = m
  error.value = ''
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="title">OOOTP</h1>
      <p class="subtitle">One-time password manager</p>

      <div class="tabs">
        <button
          :class="['tab', { active: mode === 'login' }]"
          @click="switchMode('login')"
        >
          Sign in
        </button>
        <button
          :class="['tab', { active: mode === 'register' }]"
          @click="switchMode('register')"
        >
          Create account
        </button>
      </div>

      <form @submit.prevent="submit" class="form">
        <template v-if="mode === 'register'">
          <input
            v-model="fullName"
            type="text"
            placeholder="Full name"
            autocomplete="name"
          />
        </template>

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          autocomplete="email"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="current-password"
          required
        />

        <template v-if="mode === 'register'">
          <input
            v-model="passwordConfirmation"
            type="password"
            placeholder="Confirm password"
            autocomplete="new-password"
            required
          />
        </template>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 400px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-heading);
  text-align: center;
  margin-bottom: 0.25rem;
}

.subtitle {
  text-align: center;
  color: var(--color-text);
  opacity: 0.6;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.tabs {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.tab {
  flex: 1;
  padding: 0.6rem 1rem;
  border: none;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.15s;
}

.tab.active {
  background: var(--vt-c-indigo);
  color: #fff;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form input {
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
  color: var(--color-text);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s;
}

.form input:focus {
  border-color: var(--vt-c-indigo);
}

.error {
  color: #e55;
  font-size: 0.85rem;
}

.submit-btn {
  margin-top: 0.5rem;
  padding: 0.7rem;
  background: var(--vt-c-indigo);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.15s;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
