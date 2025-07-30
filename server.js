import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';
import {v4 as uuidv4} from 'uuid'

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let onlineUsers = []

const addUser = (username,socketId)=> {
    const isExist = onlineUsers.find(user=>user.socketId == socketId)

    if(!isExist) {
        onlineUsers.push({username,socketId})
        console.log(username + " added!")
    }
}

const removeUser = (socketId)=> {
    onlineUsers = onlineUsers.filter(user=>user.socketId !== socketId)
    console.log("user removed")
}

const getUser = (username)=> {
    return onlineUsers.find(user=>user.username == username)
}

app.prepare().then(() => {
	const httpServer = createServer(handler);

	const io = new Server(httpServer);

	io.on('connection', (socket) => {
		socket.on("newUser", (username)=> {
            addUser(username,socket.id)
        })

        socket.on("sendNotification", ({receiverUsername,data}) => {
            const receiver = getUser(receiverUsername)
            console.log(receiver)

            io.to(receiver.socketId).emit("getNotification", {
                id: uuidv4(),
                ...data,
            })
        })

        socket.on("disconnect", ()=> {
            removeUser(socket.id)
        })
	});

	httpServer
		.once('error', (err) => {
			console.error(err);
			process.exit(1);
		})
		.listen(port, () => {
			console.log(`> Ready on http://${hostname}:${port}`);
		});
});
