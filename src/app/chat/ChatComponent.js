'use client';

import { useState } from 'react';
import { fetchTradingAssistantResponse, isCompanyQuery } from './chatUtils';
import styles from './page.module.css';

// Helper function to format messages
const formatMessage = (message) => {
  // Remove excessive whitespace
  let formattedMessage = message.replace(/\s+/g, ' ').trim();

  // Add line breaks for better readability
  formattedMessage = formattedMessage.replace(/\. /g, '.\n\n');

  // Highlight key points
  formattedMessage = formattedMessage.replace(/(\*\*.*?\*\*)/g, '<strong>$1</strong>');

  return formattedMessage;
};

// New Typing Animation Component
const TypingAnimation = () => {
  return (
    <div className={styles.typingAnimation}>
      <div className={styles.typingDot}></div>
      <div className={styles.typingDot}></div>
      <div className={styles.typingDot}></div>
    </div>
  );
};

export default function ChatComponent() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi, what can I help you with?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Fetch AI response
      const aiResponse = await fetchTradingAssistantResponse(newMessages);

      // Add AI response to messages with formatting
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponse
      }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Could you please try your question again?'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatSection}>
        <div className={styles.chatHeader}>
          <h2 className={styles.chatTitle}>{process.env.NEXT_PUBLIC_CompanyNameAbv}{process.env.NEXT_PUBLIC_CompanyNameAbSec} AI</h2>
        </div>
        <div className={styles.chatMessages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.role === 'user'
                  ? styles.userMessage
                  : styles.assistantMessage
              }
              // Use dangerouslySetInnerHTML to render formatted text
              dangerouslySetInnerHTML={{
                __html: formatMessage(msg.content)
                  .replace(/\n/g, '<br/>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }}
            />
          ))}
          {isLoading && (
            <div className={styles.assistantMessage}>
              <TypingAnimation />
            </div>
          )}
        </div>
        <div className={styles.chatInputContainer}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a trading question..."
            className={styles.chatInput}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className={styles.sendButton}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}