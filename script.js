let llm_model = 'unknown'
let ip_address = ''
let messageHistory = [];

const select = document.getElementById('llm-model-list');
function isValidIPv4Address(ip) {
    // IPv4アドレスの屎�ｱ蹶Fパタ�`ン
    const regexPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    return regexPattern.test(ip);
}

function isValidIPv6Address(ip) {
    // IPv6アドレスの屎�ｱ蹶Fパタ�`ン
    const regexPattern = /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$|^(?:[A-F0-9]{1,4}:){1,7}:$|^(?:[A-F0-9]{1,4}:){1,6}:[A-F0-9]{1,4}$|^(?:[A-F0-9]{1,4}:){1,5}(?::[A-F0-9]{1,4}){1,2}$|^(?:[A-F0-9]{1,4}:){1,4}(?::[A-F0-9]{1,4}){1,3}$|^(?:[A-F0-9]{1,4}:){1,3}(?::[A-F0-9]{1,4}){1,4}$|^(?:[A-F0-9]{1,4}:){1,2}(?::[A-F0-9]{1,4}){1,5}$|^[A-F0-9]{1,4}:(?:(?::[A-F0-9]{1,4}){1,6})$|^:(?:(?::[A-F0-9]{1,4}){1,7}|:)$|^(?:[A-F0-9]{1,4}:){1,7}:$|^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}(?:(?:\.[A-F0-9]{1,3}){3}\.[A-F0-9]{1,3})?$/i;

    return regexPattern.test(ip);
}

document.getElementById('apply-button').addEventListener('click', async function () {
    llm_model = document.getElementById('llm-model-list').value;
    //        ip_address = document.getElementById('ip-address-input').value;

    //        if (ip_address.length === 0) {
    //            return;
    //        }
    //
    //        if ((ip_address !== 'localhost') && (isValidIPv4Address(ip_address) === false) && (isValidIPv6Address(ip_address) === false)) {
    //            return;
    //        }

    //        // スクロ�`ルを恷仟のメッセ�`ジに栽わせる
    //        const chatMessages = document.querySelector('.chat-messages');
    //        chatMessages.scrollTop = chatMessages.scrollHeight;
    //
    //        // AIからのメッセ�`ジの燕幣����
    //        const receivedMessageContainer = document.createElement('div');
    //        receivedMessageContainer.className = 'message received';
    //
    //        const receivedIconContainer = document.createElement('div');
    //        receivedIconContainer.className = 'icon';
    //        receivedIconContainer.style.backgroundImage = 'url(./operator-icon.png)';
    //
    //        const receivedMessageTextContainer = document.createElement('div');
    //        receivedMessageTextContainer.className = 'message-text';
    //
    //        receivedMessageContainer.appendChild(receivedIconContainer);
    //        receivedMessageContainer.appendChild(receivedMessageTextContainer);
    //
    //        document.querySelector('.chat-messages').appendChild(receivedMessageContainer);
    //
    //        // スクロ�`ルを恷仟のメッセ�`ジに栽わせる
    //        chatMessages.scrollTop = chatMessages.scrollHeight;
    //
    //        send_message(receivedMessageTextContainer, 'こんにちは');

});

document.getElementById('send-button').addEventListener('click', async function () {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    //    if (messageText === null) {
    //        return;
    //    }
    //
    //    if (ip_address.length === 0) {
    //        return;
    //    }
    //
    //    if ((ip_address !== 'localhost') && (isValidIPv4Address(ip_address) === false) && (isValidIPv6Address(ip_address) === false)) {
    //        return;
    //    }

    // 僕佚メッセ�`ジの燕幣
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message sent';

    const messageTextContainer = document.createElement('div');
    messageTextContainer.className = 'message-text';
    messageTextContainer.textContent = messageText;

    messageContainer.appendChild(messageTextContainer);

    document.querySelector('.chat-messages').appendChild(messageContainer);
    messageInput.value = '';
    messageInput.focus();

    // スクロ�`ルを恷仟のメッセ�`ジに栽わせる
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // AIからのメッセ�`ジの燕幣����
    const receivedMessageContainer = document.createElement('div');
    receivedMessageContainer.className = 'message received';

    const receivedIconContainer = document.createElement('div');
    receivedIconContainer.className = 'icon';
    receivedIconContainer.style.backgroundImage = 'url(https://cdn.deepseek.com/chat/icon.png)';

    const receivedMessageTextContainer = document.createElement('div');
    receivedMessageTextContainer.className = 'message-text';

    receivedMessageContainer.appendChild(receivedIconContainer);
    receivedMessageContainer.appendChild(receivedMessageTextContainer);

    document.querySelector('.chat-messages').appendChild(receivedMessageContainer);

    // スクロ�`ルを恷仟のメッセ�`ジに栽わせる
    chatMessages.scrollTop = chatMessages.scrollHeight;

    send_message(receivedMessageTextContainer, messageText);
});

async function send_message(receivedMessageTextContainer, messageText) {

    //console.log(messageText);
    //console.log(ip_address);
    //console.log(llm_model);
    if (select.options.length > 0) {
        llm_model = select.options[0].value;
    }
    const resultString = await getSelectedCellsAsString();
    // ユ�`ザ�`のメッセ�`ジを堕�sに弖紗
    messageHistory.push({
        role: 'user',
        content: resultString+messageText
    });

    // POSTリクエストの僕佚
    try {

        const response = await fetch('http://127.0.0.1:11434/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: llm_model, // 聞喘するモデル兆
                messages: [...messageHistory] // メッセ�`ジ堕�sを僕佚
            })
        });

        if (response.ok) {
            const chatMessages = document.querySelector('.chat-messages');
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullMessage = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                // JSONメッセ�`ジの�I尖
                try {
                    const jsonResponse = JSON.parse(chunk.trim());

                    if (jsonResponse.message && jsonResponse.message.content) {
                        // メッセ�`ジの匯何をバッファに弖紗
                        fullMessage += jsonResponse.message.content;

                        // 鮫中に弖紗燕幣
                        receivedMessageTextContainer.textContent += jsonResponse.message.content;

                        // スクロ�`ルを恷仟のメッセ�`ジに栽わせる
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }
                } catch (e) {
                    // JSONパ�`スエラ�`は�o��し、バッファリングを�@�A
                }
            }

            // 畠メッセ�`ジ鞭佚瘁に堕�sに弖紗
            messageHistory.push({
                role: 'assistant',
                content: fullMessage
            });
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Request failed', error);
    }
}

async function fetchModels() {
    try {
        const response = await fetch('http://127.0.0.1:11434/api/tags');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const models = data.models || [];

        if (Array.isArray(models)) {
            models.forEach(model => {
                // 戻函 name 忖粁
                const modelName = model.name;
                const option = document.createElement('option');
                option.value = modelName;
                option.textContent = modelName;
                select.appendChild(option);
            });
        } else {
            console.error('The "models" property in the response is not an array:', models);
        }

    } catch (error) {
        console.error('Error fetching models:', error);
    }
}
function getSelectedCellsAsString() {
    // 卦指匯倖Promise��喘噐侃尖呟化荷恬議潤惚
    return Excel.run(function (context) {
        // 資函侭僉袈律
        var selectedRange = context.workbook.getSelectedRange();
        selectedRange.load("values");

        // 卦指context.sync()議潤惚
        return context.sync().then(function () {
            let resultString = '';

            // 演煽侭嗤僉協汽圷鯉議峙
            if (selectedRange.values) {
                for (let rowIndex = 0; rowIndex < selectedRange.values.length; rowIndex++) {
                    let cellValues = [];
                    for (let colIndex = 0; colIndex < selectedRange.values[rowIndex].length; colIndex++) {
                        cellValues.push(selectedRange.values[rowIndex][colIndex]);
                    }
                    resultString += cellValues.join(", ");
                    if (rowIndex < selectedRange.values.length - 1) { // 音勣壓恷朔匯佩耶紗算佩憲
                        resultString += '\n';
                    }
                }
            }

            console.log("侭僉汽圷鯉議峙憧俊撹忖憲堪: " + resultString);

            // 卦指憧俊挫議忖憲堪
            return resultString;
        });
    }).catch(function (error) {
        console.error(error);
        throw error; // 砺竃危列參宴距喘宀辛參俺資
    });
}
window.addEventListener('load', fetchModels);