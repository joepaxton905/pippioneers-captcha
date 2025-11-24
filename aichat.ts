// Reference implementation for AI chat interactions
export async function fetchAIResponse(messages: Array<{ role: string, content: string }>) {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SITE_URL_OPENROUTER_API_KEY}`,
                "HTTP-Referer": `${process.env.NEXT_PUBLIC_SITE_URL}`,
                "X-Title": `${process.env.NEXT_PUBLIC_YOUR_SITE_NAME}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "deepseek/deepseek-r1-0528:free",
                "messages": messages,
                "max_tokens": 300,
                "temperature": 0.7
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch AI response');
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error fetching AI response:', error);
        throw error;
    }
}

// Example usage
async function exampleChatInteraction() {
    const messages = [
        {
            role: "system",
            content: "You are a helpful trading assistant."
        },
        {
            role: "user",
            content: "What are some basic strategies for stock trading?"
        }
    ];

    try {
        const aiResponse = await fetchAIResponse(messages);
        console.log(aiResponse);
    } catch (error) {
        console.error('Chat interaction failed:', error);
    }
}