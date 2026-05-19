import { useState, useRef } from 'react';
import { Upload, FileText, Sparkles, Tag, Lightbulb, X, Loader, Download, BarChart3 } from 'lucide-react';
import { extractKeywords, summarizeText, extractInsights } from '../services/nlpEngine';

export default function DocumentsPage() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [insights, setInsights] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const fileInputRef = useRef(null);

  const sampleText = `GAIL (India) Limited - Annual Report 2025-26

Executive Summary: GAIL recorded a turnover of ₹1,32,900 crore during the financial year 2025-26, marking a growth of 12.5% over the previous year. The company's natural gas transmission volume reached 128 MMSCMD, while petrochemical production increased by 8.3% to reach 1.2 million tonnes.

Human Resources: The total employee strength stood at 4,567 as of March 31, 2026. The company hired 342 new employees during the year. Employee satisfaction index improved to 87.5% from 84.2% in the previous year. Training man-days per employee increased to 6.2 days.

Digital Transformation: GAIL invested ₹450 crore in digital initiatives including AI-powered operations monitoring, predictive maintenance systems, and enterprise resource planning upgrades. The company's chatbot system handled over 15,000 employee queries with a 94% resolution rate.

Safety Performance: Zero fatalities were recorded for the third consecutive year. The Lost Time Injury Frequency Rate (LTIFR) improved to 0.12 from 0.15. Safety training hours increased by 22% to reach 1,50,000 man-hours.

Sustainability: GAIL planted 5 lakh trees under its CSR initiative. Carbon emissions were reduced by 8.7% year-over-year. The company committed to achieving net-zero emissions by 2040. Renewable energy usage increased to 25% of total energy consumption.

Financial Highlights:
- Revenue: ₹1,32,900 crore (12.5% growth)
- Net Profit: ₹12,450 crore (18.3% growth)  
- EBITDA Margin: 15.2%
- Dividend: ₹12.50 per share
- Market Capitalization: ₹1,45,000 crore as of March 31, 2026

Corporate Governance: The Board of Directors met 8 times during the year. All mandatory committees were constituted with independent directors. The company received an A+ rating in corporate governance by ICRA.

Contact Information:
- Corporate Office: 16 Bhikaiji Cama Place, New Delhi - 110066
- Email: investor@gail.co.in
- Website: www.gailonline.com
- CIN: L40200DL1984GOI018976`;

  const handleFile = async (f) => {
    if (!f) return;
    setFile(f);
    setProcessing(true);
    setActiveTab('summary');

    // Simulate processing delay
    await new Promise(r => setTimeout(r, 1500));

    // For demo: use sample text (in production: use pdf-parse/mammoth)
    const text = sampleText;
    setExtractedText(text);

    await new Promise(r => setTimeout(r, 500));
    setSummary(summarizeText(text));

    await new Promise(r => setTimeout(r, 500));
    setKeywords(extractKeywords(text));
    setInsights(extractInsights(text));
    setProcessing(false);
  };

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); };

  const tabs = [
    { id: 'summary', label: 'Summary', icon: Sparkles },
    { id: 'keywords', label: 'Keywords', icon: Tag },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'text', label: 'Full Text', icon: FileText },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', maxWidth: '1200px', margin: '0 auto', padding: '80px 1.5rem 3rem' }}>
      <div className="animate-slide-up">
        <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex' }}><FileText size={12} /> Document Intelligence</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Document <span className="gradient-text">Intelligence</span></h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Upload PDF/DOC files for AI-powered analysis, summarization, and keyword extraction.</p>
      </div>

      {/* Upload Zone */}
      {!file && (
        <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="glass-card" style={{
            padding: '4rem 2rem', textAlign: 'center', cursor: 'pointer', maxWidth: '700px', margin: '0 auto 2rem',
            border: `2px dashed ${dragOver ? 'var(--primary-500)' : 'var(--border-color)'}`,
            background: dragOver ? 'rgba(59,130,246,0.05)' : 'var(--glass-bg)', transition: 'all 0.2s',
          }}>
          <Upload size={48} style={{ margin: '0 auto 1rem', color: 'var(--primary-400)', opacity: 0.7 }} />
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.125rem' }}>Drop files here or click to upload</h3>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>Supports PDF, DOC, DOCX files up to 25MB</p>
          <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
          <div style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); handleFile({ name: 'GAIL_Annual_Report_2026.pdf', size: 2457600 }); }}>
              <BarChart3 size={16} /> Try Sample Document
            </button>
          </div>
        </div>
      )}

      {/* Processing */}
      {processing && (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <Loader size={40} style={{ color: 'var(--primary-400)', animation: 'spin-slow 2s linear infinite', margin: '0 auto 1rem' }} />
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Processing Document...</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Extracting text, generating summary, and analyzing keywords</p>
          <div style={{ marginTop: '1.5rem', height: '4px', borderRadius: '2px', background: 'var(--border-color)', overflow: 'hidden' }}>
            <div className="animate-shimmer" style={{ height: '100%', width: '60%', borderRadius: '2px', background: 'linear-gradient(90deg, var(--primary-600), var(--cyan-500))' }} />
          </div>
        </div>
      )}

      {/* Results */}
      {file && !processing && extractedText && (
        <div>
          {/* File Info */}
          <div className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText size={24} style={{ color: 'var(--primary-400)' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{file.name || 'Sample Document'}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{((file.size || 2457600) / 1024 / 1024).toFixed(1)} MB · {keywords.length} keywords · {insights.length} insights</div>
              </div>
            </div>
            <button onClick={() => { setFile(null); setExtractedText(''); setSummary(''); setKeywords([]); setInsights([]); }} className="btn btn-ghost btn-sm"><X size={16} /></button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--primary-500)' : '2px solid transparent',
                background: 'transparent', color: activeTab === tab.id ? 'var(--primary-400)' : 'var(--text-secondary)',
                cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s',
              }}>
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            {activeTab === 'summary' && (
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} style={{ color: 'var(--primary-400)' }} /> AI-Generated Summary
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9375rem' }}>{summary}</p>
              </div>
            )}

            {activeTab === 'keywords' && (
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Tag size={18} style={{ color: '#06b6d4' }} /> Extracted Keywords
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                  {keywords.map((kw, i) => (
                    <span key={i} style={{
                      padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 500,
                      background: `rgba(59,130,246,${0.05 + kw.relevance / 500})`,
                      color: 'var(--primary-400)', border: '1px solid rgba(59,130,246,0.2)',
                    }}>
                      {kw.word} <span style={{ fontSize: '0.6875rem', opacity: 0.7 }}>({kw.count})</span>
                    </span>
                  ))}
                </div>
                {/* Bar Chart */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {keywords.slice(0, 10).map((kw, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ width: '100px', fontSize: '0.8125rem', color: 'var(--text-secondary)', textAlign: 'right' }}>{kw.word}</span>
                      <div style={{ flex: 1, height: '24px', borderRadius: '4px', background: 'var(--border-color)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${kw.relevance}%`, borderRadius: '4px', background: `linear-gradient(90deg, var(--primary-600), var(--cyan-500))`, transition: 'width 0.5s ease' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', width: '30px' }}>{kw.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lightbulb size={18} style={{ color: '#f59e0b' }} /> Key Insights
                </h3>
                {insights.length > 0 ? insights.map((ins, i) => (
                  <div key={i} className="glass-card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--primary-400)', marginBottom: '0.75rem' }}>{ins.type}</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {ins.items.map((item, j) => (
                        <span key={j} className="badge badge-primary">{item}</span>
                      ))}
                    </div>
                  </div>
                )) : <p style={{ color: 'var(--text-tertiary)' }}>No specific insights detected in this document.</p>}
              </div>
            )}

            {activeTab === 'text' && (
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} style={{ color: '#10b981' }} /> Extracted Text
                </h3>
                <pre style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', background: 'var(--hover-bg)', padding: '1.5rem', borderRadius: '0.75rem', maxHeight: '500px', overflow: 'auto' }}>
                  {extractedText}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
