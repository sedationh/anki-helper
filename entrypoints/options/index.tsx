import { createRoot } from 'react-dom/client';
import { Settings } from './components/Settings';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<Settings />); 