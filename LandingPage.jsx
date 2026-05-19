import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, Users, Monitor, FileText, Calendar, Shield, Zap, ArrowRight, Sparkles, Brain, Lock } from 'lucide-react';

function AnimatedCounter({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

function FloatingBot() {
  return (
    <div style={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto' }} className="animate-float">
      {/* Outer glow ring */}
      <div style={{ position: 'absolute', inset: '10px', borderRadius: '50%', border: '2px solid rgba(59,130,246,0.2)', animation: 'spin-slow 20s linear infinite' }}>
        <div style={{ position: 'absolute', top: '-4px', left: '50%', width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
      </div>
      <div style={{ position: 'absolute', inset: '30px', borderRadius: '50%', border: '1px solid rgba(6,182,212,0.15)', animation: 'spin-slow 15s linear infinite reverse' }}>
        <div style={{ position: 'absolute', bottom: '-4px', right: '30%', width: '6px', height: '6px', borderRadius: '50%', background: '#06b6d4' }} />
      </div>
      {/* Central bot */}
      <div style={{
        position: 'absolute', inset: '60px', borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(6,182,212,0.2))',
        backdropFilter: 'blur(20px)', border: '1px solid rgba(59,130,246,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem',
        boxShadow: '0 0 60px rgba(59,130,246,0.15), inset 0 0 60px rgba(59,130,246,0.05)',
      }}>
        <Bot size={64} strokeWidth={1.5} style={{ color: '#60a5fa' }} />
        <div style={{ display: 'flex', gap: '4px' }}>
          <div className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa' }} />
          <div className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa' }} />
          <div className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa' }} />
        </div>
      </div>
      {/* Floating icons */}
      {[
        { Icon: MessageSquare, top: '15%', left: '-5%', delay: '0s' },
        { Icon: Shield, top: '5%', right: '5%', delay: '1s' },
        { Icon: FileText, bottom: '15%', left: '-8%', delay: '2s' },
        { Icon: Brain, bottom: '5%', right: '0%', delay: '0.5s' },
      ].map(({ Icon, delay, ...pos }, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos, width: '44px', height: '44px', borderRadius: '12px',
          background: 'rgba(59,130,246,0.1)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: `float 4s ease-in-out infinite`, animationDelay: delay,
        }}>
          <Icon size={20} style={{ color: '#60a5fa' }} />
        </div>
      ))}
    </div>
  );
}

const features = [
  { icon: MessageSquare, title: 'AI Chat Assistant', desc: 'NLP-powered chatbot for instant answers to HR, IT, and organizational queries.', color: '#3b82f6' },
  { icon: Users, title: 'HR Support', desc: 'Complete HR policy access: leave, attendance, benefits, insurance, and payroll.', color: '#8b5cf6' },
  { icon: Monitor, title: 'IT Helpdesk', desc: 'Self-service IT support for password resets, VPN, email, and device issues.', color: '#06b6d4' },
  { icon: FileText, title: 'Document Intelligence', desc: 'Upload documents for AI-powered summarization, keyword extraction, and insights.', color: '#10b981' },
  { icon: Calendar, title: 'Company Events', desc: 'Stay updated with upcoming events, training sessions, and announcements.', color: '#f59e0b' },
  { icon: Shield, title: 'Enterprise Security', desc: 'JWT auth, 2FA, content filtering, and comprehensive security monitoring.', color: '#ef4444' },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="gradient-hero" style={{ position: 'relative', overflow: 'hidden', paddingTop: '120px', paddingBottom: '80px' }}>
        {/* Background particles */}
        <div className="particles-bg">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`, height: `${2 + Math.random() * 4}px`,
              animationDelay: `${Math.random() * 5}s`, animationDuration: `${5 + Math.random() * 10}s`,
              opacity: 0.1 + Math.random() * 0.2,
            }} />
          ))}
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
            <div className="animate-slide-up">
              {/* SIH Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: '9999px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: '1.5rem', fontSize: '0.8125rem', color: 'var(--primary-400)' }}>
                <Sparkles size={14} /> Smart India Hackathon 2024 — SIH1706
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
                <span className="gradient-text">Intelligent</span>
                <br />Enterprise Assistant
              </h1>

              <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '540px' }}>
                AI-powered chatbot platform that enhances organizational efficiency through NLP and Deep Learning.
                Get instant answers for HR policies, IT support, and company information.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}>
                <Link to="/chat" className="btn btn-primary btn-lg">
                  <MessageSquare size={18} /> Try Assistant <ArrowRight size={16} />
                </Link>
                <Link to="/documents" className="btn btn-secondary btn-lg">
                  <FileText size={18} /> Upload Documents
                </Link>
                <Link to="/admin" className="btn btn-ghost btn-lg" style={{ border: '1px solid var(--border-color)' }}>
                  <Lock size={16} /> Admin Dashboard
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                {[
                  { value: 15000, suffix: '+', label: 'Queries Resolved' },
                  { value: 1200, suffix: '+', label: 'Active Users' },
                  { value: 99, suffix: '%', label: 'Uptime' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="stat-value gradient-text"><AnimatedCounter target={stat.value} suffix={stat.suffix} /></div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated Bot */}
            <div className="animate-fade-in hero-bot" style={{ animationDelay: '0.3s' }}>
              <FloatingBot />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Zap size={12} /> Platform Features
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Everything Your Enterprise Needs
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
            A comprehensive AI-driven platform designed to streamline organizational operations and empower employees.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {features.map((f, i) => (
            <div key={i} className="glass-card card-glow" style={{ padding: '2rem', cursor: 'pointer', animationDelay: `${i * 0.1}s` }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px', marginBottom: '1.25rem',
                background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${f.color}30`,
              }}>
                <f.icon size={24} style={{ color: f.color }} />
              </div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.125rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(6,182,212,0.1))' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to Transform Your Enterprise?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Start using the Intelligent Enterprise Assistant today. Sign up for free and experience AI-powered organizational support.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/signup" className="btn btn-primary btn-lg">Get Started Free</Link>
            <Link to="/chat" className="btn btn-secondary btn-lg">Live Demo</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-bot { display: none; }
        }
      `}</style>
    </div>
  );
}
