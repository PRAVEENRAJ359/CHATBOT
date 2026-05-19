import { useState } from 'react';
import { Link } from 'react-router-dom';
import { hrPolicies } from '../data/enterpriseData';
import { Search, ChevronDown, ChevronRight, MessageSquare, Calendar, Clock, Home, Shield, Gift, Wallet, Bot } from 'lucide-react';

const iconMap = { Calendar, Clock, Home, Shield, Gift, Wallet };

export default function HRSupportPage() {
  const [activeCategory, setActiveCategory] = useState('leavePolicy');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (key) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  const categories = Object.entries(hrPolicies);
  const filteredCategories = searchQuery
    ? categories.map(([key, cat]) => [key, { ...cat, items: cat.items.filter(item => item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase())) }]).filter(([, cat]) => cat.items.length > 0)
    : categories.filter(([key]) => key === activeCategory);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', maxWidth: '1100px', margin: '0 auto', padding: '80px 1.5rem 3rem' }}>
      <div className="animate-slide-up">
        <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex' }}>HR Support Module</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>HR Policies & <span className="gradient-text">Guidelines</span></h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Access comprehensive information about company HR policies, benefits, and procedures.</p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
        <input className="input" placeholder="Search HR policies..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ paddingLeft: '3rem', maxWidth: '500px' }} />
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Category Tabs */}
        {!searchQuery && (
          <div style={{ width: '220px', flexShrink: 0 }} className="hr-tabs">
            {categories.map(([key, cat]) => {
              const Icon = iconMap[cat.icon] || Calendar;
              return (
                <button key={key} onClick={() => setActiveCategory(key)} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem 1rem',
                  borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 500,
                  marginBottom: '0.25rem', textAlign: 'left', transition: 'all 0.15s',
                  background: activeCategory === key ? 'rgba(59,130,246,0.1)' : 'transparent',
                  color: activeCategory === key ? 'var(--primary-400)' : 'var(--text-secondary)',
                }}>
                  <Icon size={16} /> {cat.title}
                </button>
              );
            })}
            <Link to="/chat" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '1rem', textDecoration: 'none' }}>
              <Bot size={14} /> Ask AI Assistant
            </Link>
          </div>
        )}

        {/* FAQ Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {filteredCategories.map(([key, cat]) => (
            <div key={key} style={{ marginBottom: '2rem' }}>
              {searchQuery && <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.125rem' }}>{cat.title}</h3>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cat.items.map((item, i) => {
                  const itemKey = `${key}-${i}`;
                  const isOpen = openItems[itemKey];
                  return (
                    <div key={i} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                      <button onClick={() => toggleItem(itemKey)} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                        padding: '1rem 1.25rem', border: 'none', background: 'transparent', cursor: 'pointer',
                        color: 'var(--text-primary)', fontSize: '0.9375rem', fontWeight: 600, textAlign: 'left', gap: '1rem',
                      }}>
                        <span>{item.question}</span>
                        {isOpen ? <ChevronDown size={18} style={{ flexShrink: 0 }} /> : <ChevronRight size={18} style={{ flexShrink: 0 }} />}
                      </button>
                      {isOpen && (
                        <div style={{ padding: '0 1.25rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.8, borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {filteredCategories.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
              <Search size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .hr-tabs { width: 100% !important; } }`}</style>
    </div>
  );
}
