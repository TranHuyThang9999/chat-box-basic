import { useState } from "react";
import { Spinner } from "zmp-ui";

const ChatBox = () => {
    const [listMessageHistory, setListMessageHistory] = useState([]);
    const [messageUser, setMessageUser] = useState('');
    const [messageBot, setMessageBot] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

    const showTime = new Date().toLocaleTimeString();

    const handleBotResponse = () => {
        if (!messageUser.trim()) return; // Không xử lý tin nhắn rỗng

        setIsLoading(true); // Bắt đầu loading
        setMessageBot(''); // Xóa tin nhắn bot cũ

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
            setListMessageHistory([...listMessageHistory, { user: messageUser, bot: response }]);

            setMessageUser('');
            setIsLoading(false); // Kết thúc loading
        }, 1000); // Delay 1 giây để hiển thị spinner
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-4 shadow-lg rounded-lg">
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
                {isLoading ? "..." : ""}

            </div>

            {/* Input & Button */}
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={messageUser}
                    onChange={(e) => setMessageUser(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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
