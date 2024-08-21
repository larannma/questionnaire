import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import './index.css'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
