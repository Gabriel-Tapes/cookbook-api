import { User } from './User'

describe('User tests', () => {
  test('Create an user', () => {
    const user = new User({
      name: 'Joe Doe',
      email: 'joe.doe@email.com',
      password: 'password213',
      accessLevel: 'admin'
    })

    expect(user).toBeInstanceOf(User)
    expect(user.name).toBe('Joe Doe')
  })

  it('Should not be possible to create an user without name', () => {
    expect(() => {
      return new User({
        name: '',
        email: 'joe.doe@gmail.com',
        password: '123456',
        accessLevel: 'user'
      })
    }).toThrow()
  })

  it('Should not be possible to create an user without email', () => {
    expect(() => {
      return new User({
        name: 'Joe Doe',
        email: '',
        password: '123456',
        accessLevel: 'user'
      })
    }).toThrow()
  })

  it('Should not be possible to create an user without password', () => {
    expect(() => {
      return new User({
        name: 'Joe Doe',
        email: 'joe.doe@gmail.com',
        password: '',
        accessLevel: 'user'
      })
    }).toThrow()
  })

  test('Cannot any set empty prop for user', () => {
    const user = new User({
      name: 'Joe Doe',
      email: 'joe.doe@email.com',
      password: '12345678',
      accessLevel: 'admin'
    })

    expect(() => {
      user.name = ''
    }).toThrow()

    expect(() => {
      user.email = ''
    }).toThrow()

    expect(() => {
      user.password = ''
    }).toThrow()
  })
})
