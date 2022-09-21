import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth'
import { Ref, ref } from 'vue'
import useFirebase from './useFirebase'

const user: Ref<User | null> = ref(null)

export default () => {
  const { auth } = useFirebase()
  const setUser = (u: User | null) => (user.value = u)

  console.log(auth)

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<Ref<User | null>> => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((u: UserCredential) => {
          console.log(u)
          updateProfile(u.user, {
            displayName: name,
          })
            .then(() => {
              setUser(u.user)
              resolve(user) // TODO: return user
            })
            .catch((error) => reject(error))
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // TOOD: login

  const login = async (email: string, password: string): Promise<Ref<User | null>> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((u: UserCredential) => {
          console.log(u)
          setUser(u.user)
          resolve(user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // TODO: restore Auth

  const restoreUser = (): Promise<Ref<User | null>> => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((u: User | null) => {
        if (u) {
          setUser(u)
          resolve(user)
        } else {
          resolve(ref(null))
        }
      })
    })
  }

  // TODO: logout

  const logout = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          setUser(null)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // TODO: forgot password

  const forgotPass = (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log('pass email sent')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // TODO: track user

  return {
    user,

    register,
    setUser,
    login,
    logout,
    restoreUser,
    forgotPass,
  }
}
