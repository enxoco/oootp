<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { TuyauError } from '@tuyau/core/client'
import { isLoggedIn, user, logout, fetchProfile } from '@/lib/auth'

const router = useRouter()
const loadError = ref('')

if (!isLoggedIn.value) {
  router.replace('/')
}

onMounted(async () => {
  if (!isLoggedIn.value) return
  try {
    await fetchProfile()
  } catch (e: any) {
    if (e instanceof TuyauError && e.isStatus(401)) {
      await logout()
      router.replace('/')
    } else {
      loadError.value = 'Could not load profile. Try refreshing.'
    }
  }
})

async function handleLogout() {
  await logout()
  router.push('/')
}
</script>

<template>
  <div class="page">
    <div class="card">
      <div v-if="loadError" class="load-error">{{ loadError }}</div>

      <div class="header">
        <div class="avatar">{{ user?.initials ?? '…' }}</div>
        <div class="user-info">
          <p class="name">{{ user?.fullName ?? user?.email ?? '…' }}</p>
          <p class="email">{{ user?.email ?? '' }}</p>
        </div>
      </div>

      <div class="section">
        <h2>OOOTP Tokens</h2>
        <p class="coming-soon">Token management coming soon.</p>
      </div>

      <button class="logout-btn" @click="handleLogout">Sign out</button>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 1rem;
}

.card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.load-error {
  color: #e55;
  font-size: 0.85rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--vt-c-indigo);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  flex-shrink: 0;
}

.name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-heading);
}

.email {
  font-size: 0.85rem;
  opacity: 0.6;
}

.section h2 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.coming-soon {
  font-size: 0.9rem;
  opacity: 0.5;
}

.logout-btn {
  align-self: flex-start;
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.9rem;
  transition: border-color 0.15s, color 0.15s;
}

.logout-btn:hover {
  border-color: #e55;
  color: #e55;
}
</style>
