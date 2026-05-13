import { createTuyau } from '@tuyau/core/client'
import { registry } from '@oootp/backend/.adonisjs/client/registry' // Adjust the import path as needed based on your project structure
export const client = createTuyau({
  baseUrl: "/",
  registry,
  headers: { Accept: 'application/json' },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      }
    ]
  }
})