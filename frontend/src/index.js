import ReactDOM from 'react-dom';
import './index.css';
import Root from './root';
import registerServiceWorker from './sw';

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
