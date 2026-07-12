import axiosInstance from './axiosInstance'

// TODO: swap this for the real call once backend auth is up
// export const loginRequest = (email, password) =>
//   axiosInstance.post('/auth/login', { email, password }).then(res => res.data)

export const loginRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject(new Error('Email and password are required'))
        return
      }

      // fake role assignment based on email for demo purposes
      let role = 'Driver'
      if (email.toLowerCase().includes('admin')) role = 'Admin'
      else if (email.toLowerCase().includes('manager')) role = 'Manager'

      resolve({
        token: 'dummy-token-' + Date.now(),
        user: {
          name: email.split('@')[0],
          email,
          role
        }
      })
    }, 500)
  })
}

