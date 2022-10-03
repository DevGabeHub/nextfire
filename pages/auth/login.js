import { FcGoogle } from 'react-icons/fc'
import { AiFillFacebook } from 'react-icons/ai'
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const Login = () => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  //Sign in with google
  const googleProvider = new GoogleAuthProvider()
  const GoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  //Sign in with facebook
  const facebookProvider = new FacebookAuthProvider()
  const FacebookLogin = async () => {
    try {
      const res = await signInWithPopup(auth, facebookProvider)
      const credential = FacebookAuthProvider.credentialFromResult(res)
      const token = credential.accessToken
      let photoURL = res.user.photoURL + '?height=500%access_token' + token
      await updateProfile(auth.currentUser, { photoURL })
      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user])

  return (
    <div className='shadow-xl mt-32 p-10 rounded-xl text-gray-700 max-w-md mx-auto'>
      <h2 className='text-3xl font-medium'>Join Today</h2>
      <div className='py-4'>
        <h3 className='py-4'>Sign in with one of the providers</h3>
      </div>
      <div className='flex flex-col gap-4'>
        <button
          onClick={GoogleLogin}
          className='text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2'
        >
          <FcGoogle className='text-2xl' />
          Sign in with Google
        </button>
        <button
          onClick={FacebookLogin}
          className='text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2'
        >
          <AiFillFacebook className='text-2xl text-blue-500' />
          Sign in with Facebook
        </button>
      </div>
    </div>
  )
}

export default Login
