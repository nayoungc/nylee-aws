// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@/context/ThemeContext';
import { LocaleProvider } from '@/context/LocaleContext';
// import { AuthProvider } from '@/context/AuthContext';
// import './i18n';
// import amplifyConfig from '../amplifyConfig';
//import AppRoutes from './AppRoutes';

// Amplify.configure(amplifyConfig);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LocaleProvider>
        {/* <AuthProvider> */}
          <Router>
            {/* <AppRoutes /> */}
          </Router>
        {/* </AuthProvider> */}
      </LocaleProvider>
    </ThemeProvider>
  );
};
export default App;