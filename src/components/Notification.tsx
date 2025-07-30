'use client';

import { useEffect, useState } from 'react';
import Image from './Image';
import { socket } from '@/socket';

type NotificationType = {
	id: string;
	senderUsername: string;
	type: 'like' | 'comment' | 'rePost' | 'follow';
	link: string;
};

const Notification = () => {
	const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [open,setOpen] = useState(false)
    console.log(notifications)
    console.log(open)

	useEffect(() => {
		socket.on('getNotification', (data: NotificationType) => {
			setNotifications((prev) => [...prev, data]);
		});
	}, []);


    const reset = ()=> {
        setNotifications([])
        setOpen(false)
    }
	return (
		<div className="relative">
			<div className="cursor-pointer rounded-full hover:bg-[#181818] flex p-2 items-center gap-4" onClick={()=>setOpen((prev)=> !prev)}>
				<Image
					path={`icons/notification.svg`}
					alt="notification"
					width={24}
					height={24}
				/>
				<span className="hidden xxl:inline">Notifications</span>
			</div>
            {open && <div className='absolute -right-full p-4 rounded-lg bg-white text-black flex flex-col gap-4 w-max'>
                <h1 className='text-xl text-textGray'>Notifications</h1>
                {notifications.map(n=>(
                    <div className='cursor-pointer' key={n.id}>
                        <a href={`${n.senderUsername}`}><b>{n.senderUsername}</b></a>{" "}{n.type === "like" ? "liked your post" : n.type === "rePost" ? "reposted your post" : n.type=== "comment" ? "replied on your post" : "followed you"}
                    </div>
                ))}
                <button onClick={reset} className='bg-black text-white p-2 text-sm rounded-lg'>
                    Mark as read
                </button>
            </div>}
		</div>
	);
};

export default Notification;
