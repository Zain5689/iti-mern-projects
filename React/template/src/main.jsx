import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ThemeProvider } from './components/theme-provider';
import App from './App';
import MainLayout from './layouts/MainLayout';
import NotFound404 from './pages/NotFound404';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			// Root Route
			{
				index: true,
				element: <App />,
			},
			// Dynamic route
		],
	},

	// Wildcard Route 404
	{
		path: '*', // Wildcard Route 404: match all unknown urls
		element: <NotFound404 />,
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>,
);
