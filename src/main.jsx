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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={Router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
