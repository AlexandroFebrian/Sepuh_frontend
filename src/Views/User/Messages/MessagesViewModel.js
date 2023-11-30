import { useSelector } from "react-redux";
import fetch from "../../../Client/fetch";
import { useEffect, useState } from "react";

export default function MessagesViewModel(){
    const { checkToken, getAllChats } = fetch();

    const isLogin = useSelector((state) => state.user.isLogin);
    const user = useSelector((state) => state.user.userDetail);
    
    const [contacts, setContacts] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        if (!user) return;
        getAllChats(setContacts);
    }, [user]);

    function selectContactHandler(index) {
        setSelectedChat(contacts[index]);
    }

    return {
        isLogin,
        user,
        contacts,
        search,
        setSearch,
        selectedChat,
        setSelectedChat,
        selectContactHandler
    }
}