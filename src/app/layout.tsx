import LeftBar from '@/components/LeftBar';
import './globals.css';
import RightBar from '@/components/RightBar';
import {ClerkProvider} from '@clerk/nextjs'

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
