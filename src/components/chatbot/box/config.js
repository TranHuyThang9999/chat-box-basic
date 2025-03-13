import LinkifyIt from "linkify-it";

const linkify = new LinkifyIt();

export const getBotResponse = (messageUser) => {
    const normalizedMessage = messageUser.toLowerCase().trim();
    const showTime = new Date().toLocaleTimeString();

    const responses = {
        "mấy h rồi": showTime,
        "bạn là ai": "tôi là chatGPT Supper model 9.0",
        "source project": "đây là link project https://github.com/TranHuyThang9999/chat-box-basic",
    };

    let botResponse = responses[normalizedMessage] || "model chưa được cập nhật vui lòng thử lại vui lòng thử lại";

    const matches = linkify.match(botResponse);
    if (matches) {
        matches.forEach(({url}) => {
            botResponse = botResponse.replace(
                url,
                `<a href="${url}" target="_blank" class="text-blue-500 underline">${url}</a>`
            );
        });
    }

    return botResponse;
};
