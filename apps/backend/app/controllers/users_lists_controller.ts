import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersListsController {
  async show({ serialize }: HttpContext) {
    const users = await User.all()
    return serialize(users)
  }
}
