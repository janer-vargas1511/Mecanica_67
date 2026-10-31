import { useState, useRef, useEffect } from "react";
import apiRequest from "../services/api";
import "./Chatbot.css";
import ReactMarkdown from "react-markdown";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "¡Hola! Soy el asistente virtual de Mecánicas Six-Seven. ¿En qué puedo ayudarte?",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(event) {
    event.preventDefault();

    const cleanMessage = message.trim();

    if (!cleanMessage || loading) return;

    const userMessage = {
      role: "user",
      text: cleanMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const data = await apiRequest("/chat", {
        method: "POST",
        body: JSON.stringify({
          message: cleanMessage,
        }),
      });

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: error.message || "No pude procesar tu consulta. Inténtalo nuevamente.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chatbot-container">
      {isOpen && (
        <section className="chatbot-window">
          <header className="chatbot-header">
            <div className="chatbot-profile">
              <div className="chatbot-avatar">67</div>

              <div>
                <h3>Mec67 Assistant</h3>
                <span>Asistente virtual</span>
              </div>
            </div>

            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chatbot"
            >
              ×
            </button>
          </header>

          <div className="chatbot-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`chat-message ${item.role} ${
                  item.error ? "error" : ""
                }`}
              >
                <div className="chatbot-markdown">
                  <ReactMarkdown>{item.text}</ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message assistant typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={2000}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={!message.trim() || loading}
              aria-label="Enviar mensaje"
            >
              ➤
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className={`chatbot-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente"}
      >
        {isOpen ? "×" : "💬"}
      </button>
    </div>
  );
}

export default Chatbot;
