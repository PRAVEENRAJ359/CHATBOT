import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Mic, MicOff, Bot, User, Users, Monitor, Calendar, CalendarOff, HelpCircle, Sparkles, Clock, Trash2, Plus } from 'lucide-react';
import { generateResponse, filterContent } from '../services/nlpEngine';
import { chatSuggestions, quickActions } from '../data/enterpriseData';
import { useAuth } from '../context/AuthContext';

const iconMap = { Users, Monitor, Calendar, CalendarOff, HelpCircle };

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Bot size={16} color="white" />
      </div>
      <div className="chat-bubble chat-bubble-bot" style={{ display: 'flex', gap: '4px', padding: '1rem 1.25rem' }}>
        <div className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary-400)' }} />
        <div className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary-400)' }} />
        <div className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary-400)' }} />
      </div>
    </div>
  );
}

export default function ChatDashboard() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: `Hello${user?.name ? ' ' + user.name.split(' ')[0] : ''}! 👋 I'm your Intelligent Enterprise Assistant.\n\nI can help with:\n• **HR Policies** — Leave, attendance, benefits\n• **IT Support** — Password, VPN, email\n• **Company Events** — Upcoming events\n• **Documents** — Upload & analyze\n\nHow can I assist you today?`, time: new Date(), category: 'General' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatHistory] = useState([
    { id: 1, title: 'Leave policy inquiry', time: 'Today, 9:30 AM', messages: 4 },
    { id: 2, title: 'VPN setup help', time: 'Yesterday', messages: 6 },
    { id: 3, title: 'Insurance benefits', time: 'May 17', messages: 3 },
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const { filteredMessage, isFiltered, detectedWords } = filterContent(text);

    const userMsg = { id: Date.now(), type: 'user', text: filteredMessage, time: new Date(), isFiltered, detectedWords };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));

    let botResponse;
    if (isFiltered) {
      botResponse = { text: `⚠️ Your message contained inappropriate language that was filtered: ${detectedWords.map(w => `"${w}"`).join(', ')}.\n\nPlease keep communication professional. I'm still happy to help with your query!`, category: 'Content Filter' };
    } else {
      botResponse = generateResponse(text);
    }

    setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse.text, time: new Date(), category: botResponse.category }]);
    setIsTyping(false);
  };

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(input); };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser'); return;
    }
    if (isListening) { setIsListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = 'en-US'; recognition.continuous = false;
    recognition.onresult = (e) => { setInput(e.results[0][0].transcript); setIsListening(false); };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start(); setIsListening(true);
  };

  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/^• /, '&#8226; ');
      return <div key={i} dangerouslySetInnerHTML={{ __html: formatted || '&nbsp;' }} />;
    });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', paddingTop: '64px' }}>
      {/* Sidebar */}
      <div className="chat-sidebar" style={{ width: '280px', borderRight: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '1rem' }}>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setMessages([messages[0]])}>
            <Plus size={16} /> New Chat
          </button>
        </div>

        {/* Quick Actions */}
        <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Quick Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {quickActions.map(action => {
              const Icon = iconMap[action.icon] || HelpCircle;
              return (
                <button key={action.id} onClick={() => sendMessage(`Tell me about ${action.label}`)} style={{
                  display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
                  border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8125rem',
                  transition: 'all 0.15s', textAlign: 'left', width: '100%',
                }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--hover-bg)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                   onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                  <Icon size={14} style={{ color: action.color }} /> {action.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat History */}
        <div style={{ padding: '0 1rem', flex: 1, overflow: 'auto' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>History</div>
          {chatHistory.map(chat => (
            <div key={chat.id} style={{ padding: '0.625rem 0.75rem', borderRadius: '0.5rem', marginBottom: '0.25rem', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--hover-bg)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.25rem' }}>{chat.title}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Clock size={10} /> {chat.time} · {chat.messages} messages
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
        {/* Chat Header */}
        <div className="glass" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Enterprise Assistant</div>
              <div style={{ fontSize: '0.6875rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> Online · NLP Engine Active
              </div>
            </div>
          </div>
          <span className="badge badge-primary"><Sparkles size={10} /> AI Powered</span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start', flexDirection: 'column', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flexDirection: msg.type === 'user' ? 'row-reverse' : 'row', maxWidth: '80%' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: msg.type === 'user' ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)' : 'linear-gradient(135deg, #2563eb, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {msg.type === 'user' ? <User size={14} color="white" /> : <Bot size={14} color="white" />}
                </div>
                <div>
                  <div className={`chat-bubble ${msg.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
                    {formatText(msg.text)}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: '0.375rem', textAlign: msg.type === 'user' ? 'right' : 'left', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                    {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {msg.category && msg.type === 'bot' && <span className="badge badge-primary" style={{ fontSize: '0.625rem', padding: '0.125rem 0.5rem' }}>{msg.category}</span>}
                    {msg.isFiltered && <span className="badge badge-warning" style={{ fontSize: '0.625rem', padding: '0.125rem 0.5rem' }}>Filtered</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div style={{ padding: '0 1.5rem 0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {chatSuggestions.slice(0, 4).map((s, i) => (
              <button key={i} onClick={() => sendMessage(s)} className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input ref={inputRef} className="input" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask me anything about HR, IT, events..." style={{ paddingRight: '3rem' }} />
            </div>
            <button type="button" onClick={toggleVoice} className="btn btn-secondary" style={{ padding: '0.75rem', flexShrink: 0, color: isListening ? '#ef4444' : 'var(--text-secondary)' }}>
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', flexShrink: 0 }} disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .chat-sidebar { display: none; }
        }
      `}</style>
    </div>
  );
}
