import './App.css';
import Header from './components/Header';
import Home from './components/home/Home';
import { Box } from '@mui/system';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Detailview from './components/post/Detailview';
import { createTheme, responsiveFontSizes } from '@mui/material'
import { ThemeProvider } from '@mui/styles';
import Createview from './components/post/Createview';
import Updateview from './components/post/Updateview';
import { AuthContext } from './components/context/AuthProvider';
import React from 'react';
import Login from './components/Login';
import About from './components/about/About';

function App()
{
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const { user } = React.useContext(AuthContext);

  return (
    <Router>
      {
        !user ? (<Login />) :
          <>
            <Header />
            <Box style={{ marginTop: 70 }}>
              <ThemeProvider theme={theme}>
                <Routes>
                  <Route path="/" exact element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path="/details/:id" element={<Detailview />} />
                  <Route path='/create/:cat' element={<Createview />} />
                  <Route path='/update/:id' element={<Updateview />} />
                </Routes>
              </ThemeProvider>
            </Box>
          </>
      }
    </Router >
  );
}

export default App;
