import { useState, useEffect } from 'react';
import { systemMetrics } from '../data/enterpriseData';
import { Cpu, HardDrive, Activity, Users, Clock, Gauge, Wifi, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

function GaugeChart({ value, max = 100, label, color, icon: Icon }) {
  const pct = (value / max) * 100;
  const statusColor = pct > 80 ? '#ef4444' : pct > 60 ? '#f59e0b' : '#10b981';
  return (
    <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
      <Icon size={24} style={{ color, marginBottom: '0.75rem' }} />
      <div style={{ position: 'relative', width: '120px', height: '60px', margin: '0 auto 0.75rem', overflow: 'hidden' }}>
        <svg width="120" height="60" viewBox="0 0 120 60">
          <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="var(--border-color)" strokeWidth="8" strokeLinecap="round" />
          <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke={statusColor} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${pct * 1.57} 157`} style={{ transition: 'stroke-dasharray 1s ease' }} />
        </svg>
        <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', fontSize: '1.25rem', fontWeight: 800 }}>
          {value}{max === 100 ? '%' : ''}
        </div>
      </div>
      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}

export default function MetricsPage() {
  const [metrics, setMetrics] = useState(systemMetrics);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 5)),
        activeConnections: Math.max(1, Math.min(20, prev.activeConnections + Math.floor((Math.random() - 0.5) * 3))),
        requestsPerMin: Math.max(50, Math.min(300, prev.requestsPerMin + Math.floor((Math.random() - 0.5) * 30))),
        avgResponseTime: Math.max(0.5, Math.min(4.5, prev.avgResponseTime + (Math.random() - 0.5) * 0.5)),
      }));
      setLastUpdate(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const healthColor = metrics.cpu < 70 && metrics.memory < 80 ? '#10b981' : metrics.cpu < 85 ? '#f59e0b' : '#ef4444';
  const healthText = metrics.cpu < 70 && metrics.memory < 80 ? 'Healthy' : metrics.cpu < 85 ? 'Warning' : 'Critical';

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', maxWidth: '1200px', margin: '0 auto', padding: '80px 1.5rem 3rem' }}>
      <div className="animate-slide-up" style={{ marginBottom: '2rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex' }}><Activity size={12} /> System Metrics</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Scalability <span className="gradient-text">Metrics</span></h1>
            <p style={{ color: 'var(--text-secondary)' }}>Real-time system performance monitoring. Auto-refreshes every 5 seconds.</p>
          </div>
          <div className="glass-card" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: healthColor, boxShadow: `0 0 8px ${healthColor}` }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: healthColor }}>{healthText}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Updated: {lastUpdate.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gauges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <GaugeChart value={Math.round(metrics.cpu)} label="CPU Usage" color="#3b82f6" icon={Cpu} />
        <GaugeChart value={Math.round(metrics.memory)} label="Memory Usage" color="#8b5cf6" icon={HardDrive} />
        <GaugeChart value={metrics.activeConnections} max={20} label="Active Sessions" color="#06b6d4" icon={Users} />
        <GaugeChart value={metrics.requestsPerMin} max={300} label="Requests/min" color="#10b981" icon={Activity} />
        <GaugeChart value={parseFloat(metrics.avgResponseTime.toFixed(1))} max={5} label="Avg Response (s)" color="#f59e0b" icon={Clock} />
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Uptime', value: metrics.uptime, icon: CheckCircle, color: '#10b981' },
          { label: 'Max Parallel Users', value: '20', icon: Users, color: '#3b82f6' },
          { label: 'Target Response Time', value: '< 5 sec', icon: Gauge, color: '#06b6d4' },
          { label: 'Network Latency', value: '12ms', icon: Wifi, color: '#8b5cf6' },
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <stat.icon size={20} style={{ color: stat.color }} />
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="metrics-grid">
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>CPU & Memory Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={metrics.history}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="time" stroke="var(--text-tertiary)" fontSize={11} />
              <YAxis stroke="var(--text-tertiary)" fontSize={11} unit="%" />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.8125rem' }} />
              <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fill="rgba(59,130,246,0.1)" strokeWidth={2} />
              <Area type="monotone" dataKey="memory" stroke="#8b5cf6" fill="rgba(139,92,246,0.1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>Requests & Response Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={metrics.history}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="time" stroke="var(--text-tertiary)" fontSize={11} />
              <YAxis stroke="var(--text-tertiary)" fontSize={11} />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.8125rem' }} />
              <Line type="monotone" dataKey="requests" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} />
              <Line type="monotone" dataKey="responseTime" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .metrics-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
