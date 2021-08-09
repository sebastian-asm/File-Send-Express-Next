import AuthState from '../context/auth/AuthState';
import AppState from '../context/app/AppState';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </AuthState>
  );
}

export default MyApp;
