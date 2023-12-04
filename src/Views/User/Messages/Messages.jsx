import Content from "../../../components/Content/Content";
import MenuGuest from "../../../components/SidebarMenu/MenuGuest/MenuGuest";
import FreelancerDefaultMenu from "../../../components/SidebarMenu/Freelancer/FreelancerDefaultMenu/FreelancerDefaultMenu";
import NowHiring from "../../../components/NowHiring/NowHiring";
import CompanyDefaultMenu from "../../../components/SidebarMenu/Company/CompanyDefaultMenu/CompanyDefaultMenu";
import MessagesViewModel from "./MessagesViewModel";
import { Avatar, Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Textarea } from "@mui/joy";
import { FaRegPaperPlane } from "react-icons/fa6";

export default function Messages() {
    const {
        isLogin,
        user,
        contacts,
        search,
        setSearch,
        selectedChat,
        selectContactHandler,
        height,
        setHeight,
        scrollToBottom,
        chatRef,
        sendMessageHandler,
        message,
        setMessage,
        onlineUsers
    } = MessagesViewModel();

    return (
        <>
        <div className=" h-fit relative flex">
            <div className="left w-1/5 ">
                <div className="h-[calc(100vh-5rem)] w-full sticky top-[5rem]">
                    {
                        isLogin && user && user.role == "Freelancer"
                        &&
                        <FreelancerDefaultMenu />
                    }
                    {
                        isLogin && user && user.role == "Company"
                        &&
                        <CompanyDefaultMenu />
                    }
                    {
                        !isLogin
                        &&
                        <MenuGuest />
                    }
                    
                </div>
            </div>
            <div className="mid w-4/5">
                <div className=" h-full border-l-2 border-navyblue-600 z-0 flex">
                    <div className="w-3/12 h-full border-r-2 border-navyblue-800">
                        <div className="w-full px-6 h-[8.25rem] flex-col flex justify-evenly">
                            <h1 className='font-bold text-3xl mt-2'>Messages</h1>
                            <InputGroup 
                                background={"white"} 
                                rounded={"md"}
                                borderColor={"navyblue.800"}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            >
                            <InputLeftElement>
                                <FaMagnifyingGlass />
                            </InputLeftElement>

                            <Input placeholder="Search"></Input>
                            </InputGroup>
                        </div>

                        <div className="w-full h-[calc(100vh-14rem)] overflow-y-auto mt-3">
                            { contacts &&
                                contacts.filter(
                                    (c) => c.users.find(
                                        (u) => u.user.email != user.email
                                    ).user.name.toLowerCase().includes(search.toLowerCase())
                                ).map((c, i) => <div
                                    key={ i } 
                                    className={
                                        (c._id == selectedChat?._id ? "bg-ghostwhite-200" : "") + 
                                        " w-full hover:bg-ghostwhite-100 cursor-pointer"
                                    }
                                    onClick={() => selectContactHandler(i)}
                                >
                                    <div className="w-full px-6 py-5">
                                        <div className="flex items-center">
                                            <div className="w-1/5">
                                                <Avatar bg="ghostwhite.400" size={"md"} src={c.users.find((u) => u.user.email != user.email).user.profile_picture}/>
                                            </div>
                                            <div className="w-4/5">
                                                <div className="w-full flex">
                                                    <p className="w-1/2 font-semibold text-xl">{ c.users.find((u) => u.user.email != user.email).user.name }</p>
                                                    {
                                                        c.messages[c.messages.length - 1]
                                                        &&
                                                        <p className="w-1/2 text-sm opacity-80 text-end">
                                                            {
                                                                new Date(c.messages[c.messages.length - 1].time).getHours().toString().padStart(2, "0")
                                                                + ":" +
                                                                new Date(c.messages[c.messages.length - 1].time).getMinutes().toString().padStart(2, "0")
                                                            }
                                                        </p>
                                                    }
                                                </div>
                                                <div className="w-full flex">
                                                    {
                                                        c.messages[c.messages.length - 1]
                                                        &&    
                                                        <p className="truncate">{ c.messages[c.messages.length - 1].value }</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-ghostwhite-100 mx-5" />
                                </div>)
                            }
                        </div>
                    </div>

                    {
                        selectedChat
                        ?
                        <div className="w-9/12 h-full relative">
                            <div className="w-full h-24 px-5 py-4 border-b-2 border-navyblue-800 bg-ghostwhite-50 relative z-10">
                                <div className="flex items-center">
                                    <Avatar bg="ghostwhite.400" size={"lg"} src={
                                        selectedChat.users.find((u) => u.user.email != user.email).user.profile_picture
                                    }/>
                                    <div className="w-full">
                                        <h1 className="font-semibold text-3xl ms-6 duration-300">
                                            { selectedChat.users.find((u) => u.user.email != user.email).user.name }
                                        </h1>
                                        {
                                            onlineUsers.find(
                                                (ou) => ou.user_id == selectedChat.users.find(
                                                    (u) => u.user._id != user._id
                                                ).user._id
                                            )
                                            && 
                                            <p className="text-green-500 ms-6 duration-300">Online</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 w-full h-[calc(100vh-11rem)] flex flex-col">
                                <div ref={chatRef} className={"relative h-full w-full overflow-y-auto px-5 pb-5"}>
                                    { selectedChat.messages.map((m, i) => <div key={ i } className={"w-full flex flex-wrap items-end justify-" + (m.sender.email == user.email ? "end" : "start")}>
                                        { m.sender.email == user.email && <p className="me-2">
                                            {
                                                new Date(m.time).getHours().toString().padStart(2, "0")
                                                + ":" +
                                                new Date(m.time).getMinutes().toString().padStart(2, "0")
                                            }
                                        </p> }
                                        <div className={
                                            "border border-black p-5 max-w-[40%] mt-5 " +
                                                (
                                                    m.sender.email == user.email ?
                                                    "rounded-l-lg rounded-br-lg" : 
                                                    "rounded-r-lg rounded-bl-lg"
                                                )
                                        }>
                                            { m.value }
                                        </div>
                                        { m.sender.email != user.email && <p className="ms-2">
                                            {
                                                new Date(m.time).getHours().toString().padStart(2, "0")
                                                + ":" +
                                                new Date(m.time).getMinutes().toString().padStart(2, "0")
                                            }
                                        </p> }
                                    </div>)}
                                </div>
                                <div className="w-full bg-white z-10 max-h-40 min-h-fit px-5 py-3 border-t-2 border-navyblue-800 transition-all duration-300">
                                    <div className="flex items-end">
                                        <div className="w-1/12">
                                            {/* Harusnya isinya send file or idk */}
                                        </div>
                                        <div className="w-10/12">
                                            <Textarea 
                                                variant="plain"
                                                minRows={1} 
                                                maxRows={4}
                                                onChange={(e) => {
                                                    setHeight(parseInt(e.currentTarget.style.height.split("px")[0]) / 27 * 8);
                                                    setMessage(e.target.value);
                                                }}
                                                onKeyUp={(e) => setHeight(parseInt(e.currentTarget.style.height.split("px")[0]) / 27 * 8)}
                                                placeholder="Type a message…"
                                                size="lg"
                                                value={message}
                                                
                                            />
                                            {}
                                        </div>
                                        <div className="w-1/12 flex justify-center">
                                            <Button 
                                                bg="ghostwhite.50"
                                                height="3.1rem"
                                                onClick={() => sendMessageHandler(
                                                    selectedChat._id, selectedChat.users.find((u) => u.user.email != user.email).user._id
                                                )}
                                            >
                                                <FaRegPaperPlane />
                                            </Button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="w-9/12 h-full flex items-center">
                            <div className="w-full">
                                <div className="w-full flex justify-center">
                                    <img className="w-96" src="https://www.pngitem.com/pimgs/m/148-1489584_chat-png-icon-free-download-searchpng-blue-chat.png" />
                                </div>
                                <div className="w-full text-center mt-5">
                                    <h1 className="font-semibold text-4xl">Select Contact to Start a Conversation</h1>
                                </div>
                                <div className="w-full text-center mt-5">
                                    <p>Enjoy your experience chatting with the {user && user.role == "Freelancer" ? "Company" : "Freelancer"}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        </>
    )
}
