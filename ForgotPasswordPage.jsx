import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="gradient-hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div className="glass-card animate-slide-up" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #2563eb, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Bot size={28} color="white" />
        </div>
        {sent ? (
          <div className="animate-slide-up">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Check Your Email</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Forgot Password?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>Enter your email to receive a reset link</p>
            <form onSubmit={handleSubmit}>
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <Mail size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                <input className="input" type="email" placeholder="you@gail.co.in" value={email} onChange={e => setEmail(e.target.value)} style={{ paddingLeft: '2.75rem' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>
                Send Reset Link <ArrowRight size={16} />
              </button>
            </form>
            <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <Link to="/login" style={{ color: 'var(--primary-400)', textDecoration: 'none' }}><ArrowLeft size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Back to login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
