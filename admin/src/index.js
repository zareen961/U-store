import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import store from './store'
import App from './App'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fff',
            contrastText: '#f3818d',
        },
        secondary: {
            dark: '#e84545',
            main: '#f3818d',
            contrastText: '#fff',
        },
    },
})

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)
