import {useState, useEffect, useRef} from "react";
import {getBotResponse} from "./config";

const ChatBox = () => {
    const [listMessageHistory, setListMessageHistory] = useState<{ user: string; bot: string }[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setListMessageHistory([{user: "", bot: "Tôi có thể giúp gì cho bạn?"}]);
        }, 500);

        return () => clearTimeout(timer); // Xóa timeout nếu component bị unmount
    }, []);

    const [messageUser, setMessageUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

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
                    className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => console.log("Chọn emoji!")}
                >
                    😊
                </button>

                {/* Nút gửi tin nhắn (📤) bên phải */}
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    onClick={handleBotResponse}
                    disabled={isLoading}
                >
                    {isLoading ? "..." : "📤"}
                </button>
            </div>


        </div>
    );
};

export default ChatBox;
