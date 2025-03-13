import { useEffect, useRef, useState } from "react"
import EmojiPicker from "emoji-picker-react"
import { getBotResponse } from "./config";


const ChatBox = () => {
    const [isChatVisible, setIsChatVisible] = useState(true)
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
        <div className="fixed bottom-5 right-5">

            {/* Main chat container - Always visible */}
            <div className="w-full max-w-sm md:max-w-lg mx-auto bg-white shadow-lg rounded-lg">
                {/* Header with integrated toggle button */}
                <div
                    className="flex items-center justify-between font-semibold text-gray-800 border-b border-gray-300 p-3 md:p-4">
                    {/* Tên chatbox với icon */}
                    <div className="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2l1.5 3 3.5.5-2.5 2.5.5 3.5L12 10l-3 1.5.5-3.5L7 5.5l3.5-.5L12 2z"></path>
                        </svg>
                        <span className="text-lg font-bold text-blue-600">Supper model 9.0</span>
                    </div>

                    {/* Nút đóng/mở chatbox */}
                    <button
                        className="text-blue-600 hover:text-blue-700 transition-all flex items-center"
                        onClick={() => setIsChatVisible(!isChatVisible)}
                    >
                        {isChatVisible ? (
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
                        ) : (
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
                                <path d="M5 15l7-7 7 7"></path>
                            </svg>
                        )}
                    </button>
                    <div ref={chatEndRef} />
                </div>

                {/* Chat content - Only visible when isChatVisible is true */}
                {isChatVisible && (
                    <div className="p-3 md:p-4 min-h-[400px]">
                        {/* Lịch sử trò chuyện */}
                        <div className="h-64 overflow-y-auto border-b mb-4 p-2">
                            {listMessageHistory.map((msg, index) => (
                                <div key={index} className="mb-2">
                                    {msg.user && (
                                        <div className="flex justify-end">
                                            <div
                                                className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">{msg.user}</div>
                                        </div>
                                    )}

                                    <div className="flex justify-start mt-1">
                                        <div className="bg-gray-200 text-gray-800 rounded-lg p-2 max-w-xs break-words">
                                            <span dangerouslySetInnerHTML={{ __html: msg.bot }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Hiệu ứng chờ */}
                        {isLoading && <span className="animate-pulse text-blue-500 text-2xl">...</span>}

                        {/* Input & Button */}
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={messageUser}
                                onChange={(e) => setMessageUser(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleBotResponse()}
                                placeholder="Nhập tin nhắn..."
                                className="w-full p-3 pl-10 pr-14 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
                            />

                            {/* Nút upload file */}
                            <label className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                <input type="file" hidden onChange={(e) => console.log(e.target.files)} />
                                <span className="text-gray-500 hover:text-gray-700">📎</span>
                            </label>

                            {/* Nút chọn emoji */}
                            <button
                                onClick={() => setShowPicker((prev) => !prev)}
                                className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                😊
                            </button>

                            {showPicker && (
                                <div className="absolute bottom-12 right-0 z-10">
                                    <EmojiPicker onEmojiClick={(emoji) => setMessageUser(messageUser + emoji.emoji)} />
                                </div>
                            )}

                            {/* Nút gửi */}
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 active:bg-blue-700 transition-all"
                                onClick={handleBotResponse}
                                disabled={isLoading}
                            >
                                <svg
                                    className="w-5 h-5 transform rotate-45"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatBox

