import { useState, useEffect, useRef } from "react";

const ChatBox = () => {
    const [listMessageHistory, setListMessageHistory] = useState<{ user: string; bot: string }[]>([]);
    const [messageUser, setMessageUser] = useState('');
    const [messageBot, setMessageBot] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);

    const showTime = new Date().toLocaleTimeString();

    const handleBotResponse = () => {
        if (!messageUser.trim()) return;

        setIsLoading(true);
        setMessageBot('');

        setTimeout(() => {
            let response;
            if (messageUser.toLowerCase() === "time now") {
                response = showTime;
            } else if (messageUser.toLowerCase() === "you name") {
                response = "bot chat ...";
            } else {
                response = "Vui lòng thử lại";
            }

            setMessageBot(response);
            setListMessageHistory(prev => [...prev, { user: messageUser, bot: response }]);

            setMessageUser('');
            setIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [listMessageHistory]);

    return (
        <div className="w-full max-w-sm md:max-w-lg mx-auto bg-white p-3 md:p-4 shadow-lg rounded-lg min-h-[400px]">
            <div className={'flex justify-center font-semibold'}>Chat bot</div>
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
                                {msg.bot}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && <div className="text-gray-500 text-center">Đang phản hồi...</div>}

                {/* Thẻ div ẩn để scroll xuống cuối */}
                <div ref={chatEndRef}/>
            </div>

            {/* Input & Button */}
            <div className="relative w-full">
                <input
                    type="text"
                    value={messageUser}
                    onChange={(e) => setMessageUser(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    onClick={handleBotResponse}
                    disabled={isLoading}
                >
                    {isLoading ? "..." : "Send"}
                </button>
            </div>

        </div>
    );
};

export default ChatBox;
