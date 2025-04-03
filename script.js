let llm_model = 'unknown'
let ip_address = ''
let messageHistory = [];

const select = document.getElementById('llm-model-list');
function isValidIPv4Address(ip) {
    // IPv4���ɥ쥹����Ҏ��F�ѥ��`��
    const regexPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    return regexPattern.test(ip);
}

function isValidIPv6Address(ip) {
    // IPv6���ɥ쥹����Ҏ��F�ѥ��`��
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

    //        // ������`������¤Υ�å��`���˺Ϥ碌��
    //        const chatMessages = document.querySelector('.chat-messages');
    //        chatMessages.scrollTop = chatMessages.scrollHeight;
    //
    //        // AI����Υ�å��`���α�ʾ�ʂ�
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
    //        // ������`������¤Υ�å��`���˺Ϥ碌��
    //        chatMessages.scrollTop = chatMessages.scrollHeight;
    //
    //        send_message(receivedMessageTextContainer, '����ˤ���');

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

    // ���ť�å��`���α�ʾ
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message sent';

    const messageTextContainer = document.createElement('div');
    messageTextContainer.className = 'message-text';
    messageTextContainer.textContent = messageText;

    messageContainer.appendChild(messageTextContainer);

    document.querySelector('.chat-messages').appendChild(messageContainer);
    messageInput.value = '';
    messageInput.focus();

    // ������`������¤Υ�å��`���˺Ϥ碌��
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // AI����Υ�å��`���α�ʾ�ʂ�
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

    // ������`������¤Υ�å��`���˺Ϥ碌��
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
    // ��`���`�Υ�å��`�����Ěs��׷��
    messageHistory.push({
        role: 'user',
        content: resultString+messageText
    });

    // POST�ꥯ�����Ȥ�����
    try {

        const response = await fetch('http://127.0.0.1:11434/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: llm_model, // ʹ�ä����ǥ���
                messages: [...messageHistory] // ��å��`���Ěs������
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

                // JSON��å��`���΄I��
                try {
                    const jsonResponse = JSON.parse(chunk.trim());

                    if (jsonResponse.message && jsonResponse.message.content) {
                        // ��å��`����һ����Хåե���׷��
                        fullMessage += jsonResponse.message.content;

                        // �����׷�ӱ�ʾ
                        receivedMessageTextContainer.textContent += jsonResponse.message.content;

                        // ������`������¤Υ�å��`���˺Ϥ碌��
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }
                } catch (e) {
                    // JSON�ѩ`������`�ϟoҕ�����Хåե���󥰤�@�A
                }
            }

            // ȫ��å��`����������Ěs��׷��
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
                // ��ȡ name �ֶ�
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
    // ����һ��Promise�����ڴ����첽�����Ľ��
    return Excel.run(function (context) {
        // ��ȡ��ѡ��Χ
        var selectedRange = context.workbook.getSelectedRange();
        selectedRange.load("values");

        // ����context.sync()�Ľ��
        return context.sync().then(function () {
            let resultString = '';

            // ��������ѡ����Ԫ���ֵ
            if (selectedRange.values) {
                for (let rowIndex = 0; rowIndex < selectedRange.values.length; rowIndex++) {
                    let cellValues = [];
                    for (let colIndex = 0; colIndex < selectedRange.values[rowIndex].length; colIndex++) {
                        cellValues.push(selectedRange.values[rowIndex][colIndex]);
                    }
                    resultString += cellValues.join(", ");
                    if (rowIndex < selectedRange.values.length - 1) { // ��Ҫ�����һ����ӻ��з�
                        resultString += '\n';
                    }
                }
            }

            console.log("��ѡ��Ԫ���ֵƴ�ӳ��ַ���: " + resultString);

            // ����ƴ�Ӻõ��ַ���
            return resultString;
        });
    }).catch(function (error) {
        console.error(error);
        throw error; // �׳������Ա�����߿��Բ���
    });
}
window.addEventListener('load', fetchModels);