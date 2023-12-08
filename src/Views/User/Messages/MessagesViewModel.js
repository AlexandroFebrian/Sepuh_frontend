import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

export default function MessagesViewModel(){
    const { checkToken, getAllChats, sendMessage } = fetch();

    const isLogin = useSelector((state) => state.user.isLogin);
    const user = useSelector((state) => state.user.userDetail);
    
    const [contacts, setContacts] = useState(null);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");
    const [height, setHeight] = useState(8);
    const [selectedChat, setSelectedChat] = useState(null);
    const chatRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        checkToken();
        scrollToBottom();
        
        const newSocket = io(import.meta.env.VITE_SOCKET_URL);
        setSocket(newSocket);
        
        return () => {
            newSocket.disconnect();
        }
    }, []);
    
    console.log("onlineUsers: ", onlineUsers);

    useEffect(() => {
        if (socket === null) return;

        if (user) {
            socket.emit("addNewUser", user._id);
            socket.on("getOnlineUsers", (res) => {
                setOnlineUsers(res);
            });
    
            return () => {
                socket.off("getOnlineUsers");
            }
        }
    }, [socket, user]);

    useEffect(() => {
        if (!user) return;
        getAllChats(setContacts);
        scrollToBottom();
    }, [user]);

    useEffect(() => {
        scrollToBottom();
        if (selectedChat){
            setSelectedChat(contacts.find((c) => c._id == selectedChat._id));
        }

        const chat_with = JSON.parse(localStorage.getItem("chat_with"));
        if (chat_with && contacts) {
            setSelectedChat(contacts.find((c) => c._id == chat_with._id));
            localStorage.removeItem("chat_with");
            console.log(chat_with);
        }
    }, [contacts, height, selectedChat]);

    useEffect(() => {
        if (socket === null || contacts === null) return;

        socket.on("getMessage", (res) => {
            const currentDate = new Date();
            const chat = contacts.find((c) => c._id == res.chat_id);
            const sender = chat.users.find((u) => u.user._id == res.receiver_id);
            
            chat.messages.push({
                value: res.message,
                sender: sender,
                time: currentDate
            });
            setContacts([ ...contacts ]);

            return () => {
                socket.off("getMessage");
            }
        });
    }, [socket, contacts]);

    function selectContactHandler(index) {
        setSelectedChat(contacts[index]);
    }

    function scrollToBottom() {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }

    async function sendMessageHandler(chat_id, receiver_id) {
        if (message != "") {
            sendMessage(receiver_id, message, setContacts);
            if (socket !== null) {
                socket.emit("sendMessage", {
                    message: message,
                    chat_id: chat_id,
                    receiver_id: receiver_id
                });
            }
            setMessage("");
        }
    }

    return {
        isLogin,
        user,
        contacts,
        search,
        setSearch,
        selectedChat,
        setSelectedChat,
        selectContactHandler,
        height,
        setHeight,
        scrollToBottom,
        chatRef,
        sendMessageHandler,
        message,
        setMessage,
        onlineUsers
    }
}