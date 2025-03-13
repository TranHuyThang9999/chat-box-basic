import { useEffect, useRef, useState } from "react"
import EmojiPicker from "emoji-picker-react"
import { getBotResponse } from "./config";


const ChatBox = () => {
    const [isChatVisible, setIsChatVisible] = useState(false)
    const [messageUser, setMessageUser] = useState("")
    const [listMessageHistory, setListMessageHistory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const chatEndRef = useRef(null)

    const handleBotResponse = () => {
        if (!messageUser.trim()) return;
        setIsLoading(true);
        setShowPicker(false);
        setTimeout(() => {
            const botResponse = getBotResponse(messageUser);
            setListMessageHistory([...listMessageHistory, { user: messageUser, bot: botResponse }]);
            setMessageUser("");
            setIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [listMessageHistory]);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            {/* Chat bubble button - Always visible when chat is collapsed */}
            {!isChatVisible && (
                <button 
                    onClick={() => setIsChatVisible(true)}
                    className="w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 active:bg-blue-700 transition-all flex items-center justify-center animate-bounce"
                    aria-label="Open chat"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-7 h-7" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    {listMessageHistory.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {listMessageHistory.length}
                        </span>
                    )}
                </button>
            )}

            {/* Main chat container - Only visible when expanded */}
            {isChatVisible && (
                <div className="w-full sm:w-80 md:w-96 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 animate-fadeIn">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 flex items-center justify-between text-white sticky top-0 z-10">
                        {/* Avatar and name */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 2l1.5 3 3.5.5-2.5 2.5.5 3.5L12 10l-3 1.5.5-3.5L7 5.5l3.5-.5L12 2z"></path>
                                </svg>
                            </div>
                            <span className="font-medium truncate">Supper model 9.0</span>
                        </div>

                        {/* Close button */}
                        <button
                            className="text-white/80 hover:text-white transition-all"
                            onClick={() => setIsChatVisible(false)}
                            aria-label="Close chat"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6L6 18"></path>
                                <path d="M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Chat content */}
                    <div className="p-3 min-h-[450px] max-h-[80vh] flex flex-col bg-gray-50">
                        {/* Welcome message if no messages */}
                        {listMessageHistory.length === 0 && (
                            <div className="flex-grow flex items-center justify-center text-center p-4">
                                <div>
                                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-8 h-8 text-blue-500"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="font-medium text-gray-800 mb-1">Chào mừng bạn!</h3>
                                    <p className="text-gray-500 text-sm">Hãy đặt câu hỏi để bắt đầu trò chuyện.</p>
                                </div>
                            </div>
                        )}

                        {/* Chat messages */}
                        <div className="flex-grow h-[400px] overflow-y-auto space-y-3 mb-3">
                            {listMessageHistory.map((msg, index) => (
                                <div key={index} className="space-y-2">
                                    {msg.user && (
                                        <div className="flex justify-end">
                                            <div className="bg-blue-500 text-white rounded-2xl rounded-tr-none py-2 px-3 max-w-[80%] break-words shadow-sm">
                                                {msg.user}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-start">
                                        <div className="flex items-end space-x-1">
                                            <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4 text-gray-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M12 2l1.5 3 3.5.5-2.5 2.5.5 3.5L12 10l-3 1.5.5-3.5L7 5.5l3.5-.5L12 2z"></path>
                                                </svg>
                                            </div>
                                            <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none py-2 px-3 max-w-[80%] break-words shadow-sm">
                                                <span dangerouslySetInnerHTML={{ __html: msg.bot }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Typing indicator */}
                        {isLoading && (
                            <div className="flex items-center space-x-1 mb-2">
                                <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-gray-500"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 2l1.5 3 3.5.5-2.5 2.5.5 3.5L12 10l-3 1.5.5-3.5L7 5.5l3.5-.5L12 2z"></path>
                                    </svg>
                                </div>
                                <div className="bg-white text-gray-800 rounded-full py-2 px-4 shadow-sm">
                                    <span className="flex space-x-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Input area */}
                        <div className="relative w-full mt-auto bg-white rounded-full shadow-md border border-gray-200">
                            <input
                                type="text"
                                value={messageUser}
                                onChange={(e) => setMessageUser(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleBotResponse()}
                                placeholder="Nhập tin nhắn..."
                                className="w-full p-2 pl-10 pr-12 rounded-full focus:outline-none text-sm"
                            />


                            {/* Attachment button */}
                            <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label="Add attachment"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </button>

                            {/* Emoji button */}
                            <div className="absolute right-10 top-1/2 -translate-y-1/2">
                                <button
                                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                                    onClick={() => setShowPicker(!showPicker)}
                                    aria-label="Add emoji"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                    </svg>
                                </button>
                                {showPicker && (
                                    <div className="absolute bottom-10 right-0">
                                        <EmojiPicker
                                            onEmojiClick={(emojiObject) => {
                                                setMessageUser((prevMsg) => prevMsg + emojiObject.emoji);
                                            }}
                                            width={280}
                                            height={350}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Send button */}
                            <button
                                className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors"
                                onClick={handleBotResponse}
                                disabled={isLoading || !messageUser.trim()}
                                aria-label="Send message"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChatBox
