import {useState, useEffect, useRef} from "react";
import {getBotResponse} from "./config";
import EmojiPicker from "emoji-picker-react";

const ChatBox = () => {
    const [listMessageHistory, setListMessageHistory] = useState<{ user: string; bot: string }[]>([]);
    const [messageUser, setMessageUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setListMessageHistory([{user: "", bot: "Tôi có thể giúp gì cho bạn?"}]);
        }, 500);

        return () => clearTimeout(timer); // Xóa timeout nếu component bị unmount
    }, []);


    const handleBotResponse = () => {
        if (!messageUser.trim()) return;

        setIsLoading(true);

        setTimeout(() => {
            const response = getBotResponse(messageUser);
            setListMessageHistory(prev => [...prev, {user: messageUser, bot: response}]);
            setMessageUser('');
            setIsLoading(false);
        }, 1000);
    };

    const onEmojiClick = (emojiObject) => {
        setMessageUser((prevInput) => prevInput + emojiObject.emoji);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [listMessageHistory]);

    return (
        <div className="w-full max-w-sm md:max-w-lg mx-auto bg-white p-3 md:p-4 shadow-lg rounded-lg min-h-[400px]">
            <div className="flex justify-center font-semibold">Chat bot</div>

            {/* Lịch sử trò chuyện */}
            <div className="h-64 overflow-y-auto border-b mb-4 p-2">
                {listMessageHistory.map((msg, index) => (
                    <div key={index} className="mb-2">
                        {/* Tin nhắn user (bên phải) */}
                        <div className="flex justify-end">
                            <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
                                {msg.user}
                            </div>
                        </div>
                        {/* Tin nhắn bot (bên trái) */}
                        <div className="flex justify-start mt-1">
                            <div className="bg-gray-200 text-gray-800 rounded-lg p-2 max-w-xs">
                                <span dangerouslySetInnerHTML={{__html: msg.bot}}/>
                            </div>
                        </div>

                    </div>
                ))}
                <div ref={chatEndRef}/>
            </div>

            {/* Input & Button */}
            <div className="relative w-full">
                {/* Input chính */}
                <input
                    type="text"
                    value={messageUser}
                    onChange={(e) => setMessageUser(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleBotResponse()}
                    placeholder="Nhập tin nhắn..."
                    className="w-full p-3 pl-10 pr-20 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    required
                />

                {/* Nút upload file (📎) bên trái */}
                <label className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer">
                    <input type="file" hidden onChange={(e) => console.log(e.target.files)}/>
                    <span className="text-gray-500 hover:text-gray-700">📎</span>
                </label>

                {/* Nút chọn emoji (😊) */}
                <button
                    onClick={() => setShowPicker((prev) => !prev)}
                    className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    😊
                </button>

                {showPicker && (
                    <div className="absolute bottom-12 right-0">
                        <EmojiPicker onEmojiClick={onEmojiClick}/>
                    </div>
                )}

                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border-l-2 border-l-blue-500 text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-100 transition"
                    onClick={handleBotResponse}
                    disabled={isLoading}
                >
                    {isLoading ? "..." : (
                        <svg
                            className="w-6 h-6 stroke-blue-500 fill-none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 2L11 13" />
                            <path d="M22 2L15 22 11 13 2 9 22 2z" />
                        </svg>
                    )}
                </button>


            </div>


        </div>
    );
};

export default ChatBox;
