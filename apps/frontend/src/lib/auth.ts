import { ref, computed } from 'vue'
import { client } from './client'

type AuthUser = {
  id: number
  email: string
  fullName: string | null
  initials: string
  createdAt: string
  updatedAt: string
}

const token = ref<string | null>(localStorage.getItem('auth_token'))
const user = ref<AuthUser | null>(null)

export const isLoggedIn = computed(() => !!token.value)

function storeToken(t: string) {
  token.value = t
  localStorage.setItem('auth_token', t)
}

function clearToken() {
  token.value = null
  user.value = null
  localStorage.removeItem('auth_token')
}

export async function login(email: string, password: string) {
  const data = await client.api.auth.accessTokens.store({ body: { email, password } })
  storeToken(data.token)
}

export async function register(
  email: string,
  password: string,
  passwordConfirmation: string,
  fullName: string
) {
  const data = await client.api.auth.newAccount.store({
    body: { email, password, passwordConfirmation, fullName },
  })
  storeToken(data.token)
}

export async function logout() {
  try {
    await client.api.profile.accessTokens.destroy({})
  } catch {
    // token may already be invalid
  }
  clearToken()
}

export async function fetchProfile() {
  const data = await client.api.profile.profile.show({})
  user.value = data as AuthUser
  return data
}

export { user }
