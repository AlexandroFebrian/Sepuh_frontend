import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useRef, useState } from "react";

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

    useEffect(() => {
        checkToken();
        scrollToBottom();
    }, []);

    useEffect(() => {
        if (!user) return;
        getAllChats(setContacts);
        scrollToBottom();
    }, [user]);

    useEffect(() => {
        scrollToBottom();
    }, [height, selectedChat]);

    function selectContactHandler(index) {
        setSelectedChat(contacts[index]);
    }

    function scrollToBottom() {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }

    async function sendMessageHandler(receiver_id) {
        if (message != "") {
            sendMessage(receiver_id, message);
            window.location.reload();
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
        setMessage
    }
}