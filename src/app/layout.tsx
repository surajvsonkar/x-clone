import LeftBar from '@/components/LeftBar';
import './globals.css';
import RightBar from '@/components/RightBar';
import { ClerkProvider } from '@clerk/nextjs';
import QueryProvider from './providers/QueryProvider';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<QueryProvider>
				<html lang="en">
					<body>{children}</body>
				</html>
			</QueryProvider>
		</ClerkProvider>
	);
}
