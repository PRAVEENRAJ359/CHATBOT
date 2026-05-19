import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, ShieldCheck, ArrowRight } from 'lucide-react';

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const refs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) refs.current[index - 1]?.focus();
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter complete OTP'); return; }
    setVerified(true);
    setTimeout(() => navigate('/chat'), 1500);
  };

  return (
    <div className="gradient-hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div className="glass-card animate-slide-up" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: verified ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #2563eb, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', transition: 'all 0.5s' }}>
          {verified ? <ShieldCheck size={28} color="white" /> : <Bot size={28} color="white" />}
        </div>
        {verified ? (
          <div className="animate-slide-up">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#10b981' }}>Verified!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Redirecting to dashboard...</p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Two-Factor Authentication</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>Enter the 6-digit code sent to your email</p>
            {error && <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: '0.8125rem', marginBottom: '1.5rem' }}>{error}</div>}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {otp.map((digit, i) => (
                <input key={i} ref={el => refs.current[i] = el} className="otp-input" type="text" inputMode="numeric" maxLength={1} value={digit}
                  onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} />
              ))}
            </div>
            <button onClick={handleVerify} className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }}>
              Verify <ArrowRight size={16} />
            </button>
            <p style={{ marginTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
              Didn't receive code? <button style={{ color: 'var(--primary-400)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Resend OTP</button>
            </p>
            <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(59,130,246,0.08)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Demo: Enter any 6 digits to verify
            </div>
          </>
        )}
      </div>
    </div>
  );
}
