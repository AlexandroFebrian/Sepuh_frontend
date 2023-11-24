import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './router.jsx'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './style/ChakraTheme.js'

import { Provider } from 'react-redux'
import store from './redux/store.js'
import 'animate.css';

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';

const materialTheme = materialExtendTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <CssBaseline enableColorScheme />
          <ChakraProvider theme={theme}>
            <RouterProvider router={Router} />
          </ChakraProvider>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </Provider>
  </React.StrictMode>,
)
