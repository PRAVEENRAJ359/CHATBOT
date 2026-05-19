import { useState } from 'react';
import { adminAnalytics } from '../data/enterpriseData';
import { Users, MessageSquare, Clock, Zap, Shield, FileText, Filter, Eye, EyeOff, BarChart3, TrendingUp, UserCheck, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="glass-card" style={{ padding: '1.5rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
      <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${color}30` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <TrendingUp size={16} style={{ color: '#10b981' }} />
    </div>
    <div style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>{value}</div>
    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{label}</div>
    {sub && <div style={{ fontSize: '0.6875rem', color: '#10b981', marginTop: '0.25rem' }}>{sub}</div>}
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const data = adminAnalytics;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'filtered', label: 'Content Logs', icon: Filter },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', maxWidth: '1300px', margin: '0 auto', padding: '80px 1.5rem 3rem' }}>
      <div className="animate-slide-up" style={{ marginBottom: '2rem' }}>
        <span className="badge badge-warning" style={{ marginBottom: '1rem', display: 'inline-flex' }}><Shield size={12} /> Admin Only</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin <span className="gradient-text">Dashboard</span></h1>
        <p style={{ color: 'var(--text-secondary)' }}>Monitor platform performance, manage users, and review system analytics.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard icon={Users} label="Total Users" value={data.totalUsers.toLocaleString()} sub="+23 this week" color="#3b82f6" />
        <StatCard icon={UserCheck} label="Active Now" value={data.activeUsers} sub="31% of total" color="#10b981" />
        <StatCard icon={MessageSquare} label="Total Queries" value={data.totalQueries.toLocaleString()} sub="+847 today" color="#8b5cf6" />
        <StatCard icon={Clock} label="Avg Response" value={`${data.avgResponseTime}s`} sub="Under 5s target ✓" color="#06b6d4" />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', border: 'none',
            borderBottom: activeTab === tab.id ? '2px solid var(--primary-500)' : '2px solid transparent',
            background: 'transparent', color: activeTab === tab.id ? 'var(--primary-400)' : 'var(--text-secondary)',
            cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem', whiteSpace: 'nowrap',
          }}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="admin-grid">
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>Query Volume (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.queryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={12} />
                <YAxis stroke="var(--text-tertiary)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.8125rem' }} />
                <Bar dataKey="queries" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>Category Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={data.categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3}>
                  {data.categoryDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.8125rem' }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginTop: '0.5rem' }}>
              {data.categoryDistribution.map((cat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
                  <span style={{ marginLeft: 'auto', fontWeight: 600 }}>{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', gridColumn: 'span 2' }} className="glass-card resp-span">
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem' }}>Response Time Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.queryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={12} />
                <YAxis stroke="var(--text-tertiary)" fontSize={12} unit="s" />
                <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.8125rem' }} />
                <Line type="monotone" dataKey="responseTime" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === 'users' && (
        <div className="glass-card" style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                {['User', 'Email', 'Role', 'Department', 'Status', 'Last Active'].map(h => (
                  <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.recentUsers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--hover-bg)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '0.875rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span style={{ fontWeight: 600 }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td style={{ padding: '0.875rem 1.25rem' }}>
                    <span className={`badge ${user.role === 'admin' ? 'badge-warning' : 'badge-primary'}`}>{user.role}</span>
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', color: 'var(--text-secondary)' }}>{user.department}</td>
                  <td style={{ padding: '0.875rem 1.25rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: user.status === 'online' ? '#10b981' : user.status === 'away' ? '#f59e0b' : 'var(--text-tertiary)' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} /> {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', color: 'var(--text-tertiary)' }}>{user.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Documents */}
      {activeTab === 'documents' && (
        <div className="glass-card" style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                {['File', 'Uploader', 'Department', 'Size', 'Date', 'Keywords', 'Status'].map(h => (
                  <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.documentLogs.map(doc => (
                <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.875rem 1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={16} style={{ color: 'var(--primary-400)' }} /> {doc.filename}
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', color: 'var(--text-secondary)' }}>{doc.uploader}</td>
                  <td style={{ padding: '0.875rem 1.25rem', color: 'var(--text-secondary)' }}>{doc.department}</td>
                  <td style={{ padding: '0.875rem 1.25rem', color: 'var(--text-secondary)' }}>{doc.size}</td>
                  <td style={{ padding: '0.875rem 1.25rem', color: 'var(--text-tertiary)' }}>{doc.date}</td>
                  <td style={{ padding: '0.875rem 1.25rem' }}><span className="badge badge-primary">{doc.keywords}</span></td>
                  <td style={{ padding: '0.875rem 1.25rem' }}>
                    <span className={`badge ${doc.status === 'Processed' ? 'badge-success' : 'badge-warning'}`}>{doc.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Filtered Content */}
      {activeTab === 'filtered' && (
        <div>
          <div className="glass-card" style={{ padding: '1rem 1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertTriangle size={18} style={{ color: '#f59e0b' }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Content filtering is active. {data.filteredLogs.length} messages filtered in the last 48 hours.</span>
          </div>
          <div className="glass-card" style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  {['Timestamp', 'User', 'Original', 'Filtered', 'Words Detected'].map(h => (
                    <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.filteredLogs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.875rem 1.25rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                    <td style={{ padding: '0.875rem 1.25rem', fontWeight: 600 }}>{log.user}</td>
                    <td style={{ padding: '0.875rem 1.25rem', color: 'var(--error)', fontStyle: 'italic' }}>{log.originalMessage}</td>
                    <td style={{ padding: '0.875rem 1.25rem', color: 'var(--text-secondary)' }}>{log.filteredMessage}</td>
                    <td style={{ padding: '0.875rem 1.25rem' }}>
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                        {log.words.map((w, i) => <span key={i} className="badge badge-error">{w}</span>)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: 'Authentication', items: [{ l: 'JWT Token Auth', s: 'Active' }, { l: '2FA Enforcement', s: 'Enabled' }, { l: 'Session Timeout', s: '30 min' }, { l: 'Password Policy', s: '12+ chars' }] },
            { title: 'Content Security', items: [{ l: 'Bad Language Filter', s: 'Active' }, { l: 'Dictionary Size', s: '48 words' }, { l: 'Messages Filtered', s: data.filteredLogs.length.toString() }, { l: 'Filter Mode', s: 'Replace' }] },
            { title: 'Access Control', items: [{ l: 'Admin Users', s: data.recentUsers.filter(u => u.role === 'admin').length.toString() }, { l: 'Employee Users', s: data.recentUsers.filter(u => u.role === 'employee').length.toString() }, { l: 'Active Sessions', s: data.recentUsers.filter(u => u.status === 'online').length.toString() }, { l: 'Failed Logins (24h)', s: '3' }] },
            { title: 'Data Protection', items: [{ l: 'Encryption', s: 'AES-256' }, { l: 'Data Backup', s: 'Daily' }, { l: 'Log Retention', s: '90 days' }, { l: 'GDPR Compliant', s: 'Yes' }] },
          ].map((section, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={16} style={{ color: 'var(--primary-400)' }} /> {section.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {section.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{item.l}</span>
                    <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>{item.s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`@media (max-width: 768px) { .admin-grid { grid-template-columns: 1fr !important; } .resp-span { grid-column: span 1 !important; } }`}</style>
    </div>
  );
}
