import LinkifyIt from "linkify-it";

const linkify = new LinkifyIt();

export const getBotResponse = (messageUser) => {
    const normalizedMessage = messageUser.toLowerCase().trim();
    const showTime = new Date().toLocaleTimeString();

    const responses = {
        "time now": showTime,
        "name": " kkk https://redux-toolkit.js.org/introduction/why-rtk-is-redux-today",
    };

    let botResponse = responses[normalizedMessage] || "Vui lòng thử lại";

    const matches = linkify.match(botResponse);
    if (matches) {
        matches.forEach(({ url }) => {
            botResponse = botResponse.replace(
                url,
                `<a href="${url}" target="_blank" class="text-blue-500 underline">${url}</a>`
            );
        });
    }

    return botResponse;
};
