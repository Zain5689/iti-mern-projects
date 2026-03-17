import { Outlet, Link } from 'react-router';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';

export default function MainLayout() {
	return (
		<div className='min-h-screen flex flex-col bg-slate-50'>
			{/* Navbar UI */}
			<header className='sticky top-0 z-10 w-full border-b bg-white shadow-sm p-4'>
				<div className='container mx-auto flex justify-between items-center'>
					<h1 className='text-xl font-bold'>Platzi Store</h1>
					<NavigationMenu>
						<NavigationMenuList className='flex gap-4'>
							<NavigationMenuItem>
								<Link to='/' className='font-medium hover:text-blue-600'>
									Home
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link to='/products' className='font-medium hover:text-blue-600'>
									Products
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</header>

			{/* Main Content */}
			<main className='flex-grow container mx-auto p-4'>
				<Outlet />
			</main>

			{/* Footer UI */}
			<footer className='border-t bg-white p-6 text-center text-sm text-slate-500'>
				<p>© 2026 ITI by ELDash with 💖</p>
			</footer>
		</div>
	);
}
