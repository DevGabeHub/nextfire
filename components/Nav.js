import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'

const Nav = () => {
  const [user, loading] = useAuthState(auth)
  return (
    <nav className='flex justify-between items-center py-10'>
      <Link href={'/'}>Logo</Link>
      <ul>
        {!user && (
          <Link href='/auth/login'>
            <li className='py-2 px-4 text-lg bg-teal-500 rounded-lg text-white font-medium ml-8 cursor-pointer'>
              Join Now
            </li>
          </Link>
        )}
        {user && (
          <div>
            <Link href={'/dashboard'}>
              <img
                src={user.photoURL}
                alt='avatar'
                referrerPolicy='o-referrer'
                className='w-12 rounded-full'
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  )
}

export default Nav
