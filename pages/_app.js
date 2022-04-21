import { ImagePopup } from '../components/ImagePopup'
import { AuthProvider } from '../context/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
