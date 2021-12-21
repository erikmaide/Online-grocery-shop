import App from './App';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

ReactDOM.render( 
      <QueryClientProvider client={client}>
    <App />
    </QueryClientProvider>,
  document.getElementById('root')
);
