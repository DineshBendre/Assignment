const form = document.getElementById('chat-form');
const mytextInput = document.getElementById('mytext');
const responseModel1Textarea = document.getElementById('response-model1'); // Updated

const API_KEY = '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';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mytext = mytextInput.value.trim();
    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{
                        role: 'user',
                        content: mytext
                    }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                responseModel1Textarea.value = data.choices[0].message.content; // Updated
            } else {
                responseModel1Textarea.value = 'Error: Unable to process your request.'; // Updated
            }
        } catch (error) {
            console.error(error);
            responseModel1Textarea.value = 'Error: Unable to process your request.'; // Updated
        }
    }
});
