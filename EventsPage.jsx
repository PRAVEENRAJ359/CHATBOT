import { useState } from 'react';
import { companyEvents } from '../data/enterpriseData';
import { Calendar, MapPin, Users, Clock, Video, Filter, Search, CheckCircle, Tag } from 'lucide-react';

const typeColors = { conference: '#3b82f6', meeting: '#8b5cf6', training: '#06b6d4', social: '#10b981' };
const typeLabels = { conference: 'Conference', meeting: 'Meeting', training: 'Training', social: 'Social' };

export default function EventsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState(new Set());

  const filtered = companyEvents.filter(e => {
    const matchType = filter === 'all' || e.type === filter;
    const matchSearch = !searchQuery || e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  const toggleRegister = (id) => {
    setRegisteredEvents(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isUpcoming = (dateStr) => new Date(dateStr) >= new Date();

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', maxWidth: '1200px', margin: '0 auto', padding: '80px 1.5rem 3rem' }}>
      <div className="animate-slide-up">
        <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex' }}><Calendar size={12} /> Events Module</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Company <span className="gradient-text">Events</span></h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Stay updated with upcoming events, meetings, training sessions, and more.</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1', maxWidth: '400px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input className="input" placeholder="Search events..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ paddingLeft: '2.75rem' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          {['all', 'conference', 'meeting', 'training', 'social'].map(type => (
            <button key={type} onClick={() => setFilter(type)} className={filter === type ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'} style={{ textTransform: 'capitalize' }}>
              {type === 'all' ? 'All Events' : typeLabels[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(event => (
          <div key={event.id} className="glass-card card-glow" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.6875rem', fontWeight: 700, background: `${typeColors[event.type]}20`, color: typeColors[event.type], border: `1px solid ${typeColors[event.type]}30`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {typeLabels[event.type]}
              </span>
              {event.isVirtual && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem', color: '#06b6d4' }}>
                  <Video size={12} /> Virtual
                </span>
              )}
            </div>

            <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{event.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>{event.description}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} style={{ color: 'var(--primary-400)' }} /> {formatDate(event.date)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={14} style={{ color: 'var(--primary-400)' }} /> {event.time}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={14} style={{ color: 'var(--primary-400)' }} /> {event.location}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1rem' }}>
              {event.tags.map((tag, i) => (
                <span key={i} style={{ fontSize: '0.6875rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', background: 'var(--hover-bg)', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Tag size={9} /> {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                <Users size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                {event.registeredCount}/{event.maxCapacity}
              </div>
              {isUpcoming(event.date) && (
                <button onClick={() => toggleRegister(event.id)} className={registeredEvents.has(event.id) ? 'btn btn-sm' : 'btn btn-primary btn-sm'}
                  style={registeredEvents.has(event.id) ? { background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' } : {}}>
                  {registeredEvents.has(event.id) ? <><CheckCircle size={14} /> Registered</> : 'Register'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-tertiary)' }}>
          <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
          <p>No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
