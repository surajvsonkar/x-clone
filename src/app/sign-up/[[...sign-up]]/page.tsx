'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import Link from 'next/link';
export default function SignUpPage() {
	return (
		<div className="h-screen flex items-center justify-between p-8">
			<div className="hidden md:flex w-1/2 items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="250"
					height="500"
					viewBox="0 0 24 24"
				>
					<path
						fill="white"
						d="M 26.609375 29.023438 L 3.425781 29.023438 L 3.425781 26.707031 L 24.3125 26.707031 L 24.3125 23.242188 L 3.390625 23.242188 L 3.441406 0.015625 L 11.46875 0.015625 L 11.46875 17.117188 L 9.167969 17.117188 L 9.167969 2.335938 L 5.738281 2.335938 L 5.695312 20.925781 L 26.609375 20.925781 L 26.609375 29.023438"
					/>
				</svg>
			</div>
			<div className="w-full md:w-1/2 flex flex-col gap-4">
				<h1 className="text-2xl xsm:text-4xl md:text-6xl font-bold">
					Happening now
				</h1>
				<h1 className="text-2xl">Join today.</h1>
				<SignUp.Root>
					<SignUp.Step name="start" className="flex flex-col gap-4">
						<Clerk.Connection
							name="google"
							className="bg-white rounded-full p-2 text-black w-72 flex items-center justify-center gap-2 font-bold"
						>
							<svg viewBox="0 0 24 24" width={24} height={24}>
								<path
									d="M18.977 4.322L16 7.3c-1.023-.838-2.326-1.35-3.768-1.35-2.69 0-4.95 1.73-5.74 4.152l-3.44-2.635c1.656-3.387 5.134-5.705 9.18-5.705 2.605 0 4.93.977 6.745 2.56z"
									fill="#EA4335"
								></path>
								<path
									d="M6.186 12c0 .66.102 1.293.307 1.89L3.05 16.533C2.38 15.17 2 13.63 2 12s.38-3.173 1.05-4.533l3.443 2.635c-.204.595-.307 1.238-.307 1.898z"
									fill="#FBBC05"
								></path>
								<path
									d="M18.893 19.688c-1.786 1.667-4.168 2.55-6.66 2.55-4.048 0-7.526-2.317-9.18-5.705l3.44-2.635c.79 2.42 3.05 4.152 5.74 4.152 1.32 0 2.474-.308 3.395-.895l3.265 2.533z"
									fill="#34A853"
								></path>
								<path
									d="M22 12c0 3.34-1.22 5.948-3.107 7.688l-3.265-2.53c1.07-.67 1.814-1.713 2.093-3.063h-5.488V10.14h9.535c.14.603.233 1.255.233 1.86z"
									fill="#4285F4"
								></path>
							</svg>
							Sign up with Google
						</Clerk.Connection>
						<Clerk.Connection
							name="apple"
							className="bg-white rounded-full p-2 text-black w-72 flex items-center justify-center gap-2 font-bold"
						>
							<svg viewBox="0 0 24 24" width={24} height={24}>
								<path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
							</svg>
							Sign up with Apple
						</Clerk.Connection>
                        <div className='flex flex-col gap-4'>
                            Sign up with Credentials
                            <Clerk.Field name="emailAddress" className='flex flex-col gap-2'>
                                <Clerk.Input placeholder='E-mail' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm'/>
                                <Clerk.FieldError className='text-red-300 text-sm'/>
                            </Clerk.Field>
                            <Clerk.Field name="password" className='flex flex-col gap-2'>
                                <Clerk.Input placeholder='password' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm'/>
                                <Clerk.FieldError className='text-red-300 text-sm'/>
                            </Clerk.Field>
                            <SignUp.Captcha/>
                            <SignUp.Action submit className='bg-iconBlue rounded-full p-2 text-white font-bold w-72 text-center'>
                                Sign up
                            </SignUp.Action>
                        </div>
					</SignUp.Step>
                    <SignUp.Step name='continue' className='flex flex-col'>
                        <Clerk.Field name='username'>
                            <Clerk.Input placeholder='username' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm'/>
                            <Clerk.FieldError className='text-red-300 text-sm'/>
                        </Clerk.Field>
                        <SignUp.Action submit className='w-72 text-center text-iconBlue underline'>Continue</SignUp.Action>
                    </SignUp.Step>
                    <SignUp.Step name='verifications'>
                        <SignUp.Strategy name='email_code'>
                            <h1 className='text-sm mb-2'>Check your email</h1>
                            <Clerk.Field name='code' className='flex flex-col gap-4'>
                                <Clerk.Input placeholder='Verification code' className='py-2 px-6 rounded-full text-black w-72 placeholder:text-sm' />
                                <Clerk.FieldError className='text-red-300 text-sm'/>
                            </Clerk.Field>
                            <SignUp.Action submit className='mt-2 underline text-iconBlue text-sm'>verify</SignUp.Action>
                        </SignUp.Strategy>
                    </SignUp.Step>
					<div className="w-72 flex items-center gap-4">
						<div className="h-px bg-borderGray flex-grow"></div>
						<span className="text-textGrayLight">or</span>
						<div className="h-px bg-borderGray flex-grow"></div>
					</div>
					<Link
						href={'/sign-in'}
						className="bg-iconBlue rounded-full p-2 text-white font-bold w-72 text-center"
					>
						Already have an account?
					</Link>
					<p className="w-72 text-xs">
						By signin up, you agree to the{' '}
						<span className="text-iconBlue">Terms of Service</span> and{' '}
						<span className="text-iconBlue">Privacy Policy,</span> including{' '}
						<span className="text-iconBlue">Cookie Use.</span>
					</p>
				</SignUp.Root>
			</div>
		</div>
	);
}
