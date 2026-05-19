import { useState } from 'react';
import { Link } from 'react-router-dom';
import { itSupport } from '../data/enterpriseData';
import { Search, ChevronDown, ChevronRight, KeyRound, Globe, Mail, Wifi, Download, Monitor as MonitorIcon, Bot, AlertTriangle } from 'lucide-react';

const iconMap = { KeyRound, Globe, Mail, Wifi, Download, Monitor: MonitorIcon };

export default function ITSupportPage() {
  const [activeCategory, setActiveCategory] = useState('passwordReset');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (key) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  const categories = Object.entries(itSupport);
  const filteredCategories = searchQuery
    ? categories.map(([key, cat]) => [key, { ...cat, items: cat.items.filter(item => item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase())) }]).filter(([, cat]) => cat.items.length > 0)
    : categories.filter(([key]) => key === activeCategory);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', maxWidth: '1100px', margin: '0 auto', padding: '80px 1.5rem 3rem' }}>
      <div className="animate-slide-up">
        <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
          <MonitorIcon size={12} /> IT Support Module
        </span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>IT Support & <span className="gradient-text">Helpdesk</span></h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Self-service troubleshooting guides and IT support resources.</p>
      </div>

      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
        <input className="input" placeholder="Search IT support..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ paddingLeft: '3rem', maxWidth: '500px' }} />
      </div>

      {/* Quick Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Network Status', value: 'Operational', color: '#10b981' },
          { label: 'Email Server', value: 'Operational', color: '#10b981' },
          { label: 'VPN Gateway', value: 'Operational', color: '#10b981' },
          { label: 'Maintenance', value: 'None Scheduled', color: '#3b82f6' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '1rem 1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.375rem' }}>{s.label}</div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: s.color, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} /> {s.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {!searchQuery && (
          <div style={{ width: '220px', flexShrink: 0 }} className="it-tabs">
            {categories.map(([key, cat]) => {
              const Icon = iconMap[cat.icon] || MonitorIcon;
              return (
                <button key={key} onClick={() => setActiveCategory(key)} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem 1rem',
                  borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 500,
                  marginBottom: '0.25rem', textAlign: 'left', transition: 'all 0.15s',
                  background: activeCategory === key ? 'rgba(6,182,212,0.1)' : 'transparent',
                  color: activeCategory === key ? '#06b6d4' : 'var(--text-secondary)',
                }}>
                  <Icon size={16} /> {cat.title}
                </button>
              );
            })}
            <div className="glass-card" style={{ padding: '1rem', marginTop: '1rem', textAlign: 'center' }}>
              <AlertTriangle size={20} style={{ color: '#f59e0b', margin: '0 auto 0.5rem' }} />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Need urgent help?</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#f59e0b' }}>Ext. 4567</div>
            </div>
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          {filteredCategories.map(([key, cat]) => (
            <div key={key} style={{ marginBottom: '2rem' }}>
              {searchQuery && <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>{cat.title}</h3>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cat.items.map((item, i) => {
                  const itemKey = `${key}-${i}`;
                  return (
                    <div key={i} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                      <button onClick={() => toggleItem(itemKey)} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                        padding: '1rem 1.25rem', border: 'none', background: 'transparent', cursor: 'pointer',
                        color: 'var(--text-primary)', fontSize: '0.9375rem', fontWeight: 600, textAlign: 'left', gap: '1rem',
                      }}>
                        <span>{item.question}</span>
                        {openItems[itemKey] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </button>
                      {openItems[itemKey] && (
                        <div style={{ padding: '0 1.25rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.8, borderTop: '1px solid var(--border-color)', paddingTop: '1rem', whiteSpace: 'pre-line' }}>
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .it-tabs { width: 100% !important; } }`}</style>
    </div>
  );
}
