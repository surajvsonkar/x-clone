import LeftBar from '@/components/LeftBar';
import './globals.css';
import RightBar from '@/components/RightBar';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div className='flex justify-between max-w-screen-md lg:max-w-screen-lg mx-auto xl:max-w-screen-xl xxl:max-w-screen-xxl'>
					<div className='px-2 xsm:px-4 xxl:px-8'>
						<LeftBar />
					</div>
					<div className='lg:min-w-[600px] border-x-[1px] border-x-borderGray flex-1'>{children}</div>
					<div className='ml-4 md:ml-8 hidden lg:flex flex-1'>
						<RightBar />
					</div>
				</div>
			</body>
		</html>
	);
}
