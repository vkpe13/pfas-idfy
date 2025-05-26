import React, { useState, useEffect } from 'react';
import { Search, Gauge, Clock, FileText, Shield, AlertTriangle, CheckCircle, X, ExternalLink } from 'lucide-react';

function App() {
  // State management
  const [activeView, setActiveView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scannedProducts, setScannedProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  // Mock product database
  const productDatabase = [
    {
      id: 1,
      name: 'Non-stick Pan Set',
      brand: 'Generic Brand',
      category: 'Cookware',
      pfasRisk: 'high',
      pfasScore: 85,
      description: 'Traditional non-stick coating contains PFAS chemicals',
      alternatives: ['Ceramic cookware', 'Cast iron', 'Stainless steel']
    },
    {
      id: 2,
      name: 'Waterproof Jacket',
      brand: 'OutdoorGear',
      category: 'Clothing',
      pfasRisk: 'medium',
      pfasScore: 60,
      description: 'DWR coating may contain PFAS',
      alternatives: ['Wax-coated jackets', 'Natural fiber rain gear']
    },
    {
      id: 3,
      name: 'Food Storage Container',
      brand: 'SafeStore',
      category: 'Food Storage',
      pfasRisk: 'low',
      pfasScore: 15,
      description: 'PFAS-free materials used',
      alternatives: []
    }
  ];

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '1rem 2rem',
      color: 'white'
    },
    main: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1rem',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      marginBottom: '1rem'
    },
    button: {
      background: 'rgba(147, 51, 234, 0.8)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontSize: '1rem'
    }
  };

  // Risk color helper
  const getRiskColor = (risk) => {
    switch(risk) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  // Risk icon helper
  const getRiskIcon = (risk) => {
    switch(risk) {
      case 'high': return <AlertTriangle size={20} color="#ef4444" />;
      case 'medium': return <Shield size={20} color="#f59e0b" />;
      case 'low': return <CheckCircle size={20} color="#10b981" />;
      default: return <Shield size={20} color="#6b7280" />;
    }
  };

  // Search products
  const searchResults = productDatabase.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('entry.127497103', email);
      
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe9UuK-Icl0k6l9pIjEDfzJ_u8LfswiLKe5s6FDsLHwy824gg/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      
      setShowEmailCapture(false);
      setEmail('');
      alert('Thanks for subscribing! We\'ll keep you updated on PFAS safety.');
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Thanks for subscribing!');
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={32} color="#c084fc" />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              PFAS ID-FY
            </h1>
          </div>
          <button 
            onClick={() => setShowEmailCapture(true)}
            style={styles.button}
          >
            Get Alerts
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button 
            onClick={() => setActiveView('dashboard')} 
            style={{
              padding: '0.5rem 1rem',
              background: activeView === 'dashboard' ? 'rgba(147, 51, 234, 0.5)' : 'rgba(255,255,255,0.2)',
              color: 'white',
              border: `2px solid ${activeView === 'dashboard' ? '#c084fc' : 'rgba(255,255,255,0.3)'}`,
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Gauge size={16} />
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveView('products')} 
            style={{
              padding: '0.5rem 1rem',
              background: activeView === 'products' ? 'rgba(147, 51, 234, 0.5)' : 'rgba(255,255,255,0.2)',
              color: 'white',
              border: `2px solid ${activeView === 'products' ? '#c084fc' : 'rgba(255,255,255,0.3)'}`,
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Search size={16} />
            Products
          </button>
          
          <button 
            onClick={() => setActiveView('history')} 
            style={{
              padding: '0.5rem 1rem',
              background: activeView === 'history' ? 'rgba(147, 51, 234, 0.5)' : 'rgba(255,255,255,0.2)',
              color: 'white',
              border: `2px solid ${activeView === 'history' ? '#c084fc' : 'rgba(255,255,255,0.3)'}`,
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Clock size={16} />
            History
          </button>
          
          <button 
            onClick={() => setActiveView('blog')} 
            style={{
              padding: '0.5rem 1rem',
              background: activeView === 'blog' ? 'rgba(147, 51, 234, 0.5)' : 'rgba(255,255,255,0.2)',
              color: 'white',
              border: `2px solid ${activeView === 'blog' ? '#c084fc' : 'rgba(255,255,255,0.3)'}`,
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <FileText size={16} />
            Blog
          </button>
        </nav>
      </header>

      <main style={styles.main}>
        {/* Dashboard View */}
        {activeView === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
              Protect Your Family from Forever Chemicals
            </h2>
            
            {/* Risk Meter */}
            <div style={styles.card}>
              <h3 style={{ marginBottom: '1rem' }}>Your PFAS Risk Level</h3>
              <div style={{ 
                width: '100%', 
                height: '20px', 
                background: 'rgba(255,255,255,0.2)', 
                borderRadius: '10px',
                position: 'relative',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '60%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981, #f59e0b, #ef4444)',
                  borderRadius: '10px'
                }}></div>
              </div>
              <p style={{ color: '#f59e0b', fontWeight: '600' }}>Medium Risk</p>
              <p style={{ color: '#9ca3af' }}>
                Based on {scannedProducts.length} products scanned. Scan more products for a complete assessment.
              </p>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={styles.card}>
                <h4>Products Scanned</h4>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#c084fc' }}>{scannedProducts.length}</p>
              </div>
              <div style={styles.card}>
                <h4>High-Risk Items</h4>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                  {scannedProducts.filter(p => p.pfasRisk === 'high').length}
                </p>
              </div>
              <div style={styles.card}>
                <h4>Safe Alternatives Found</h4>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                  {scannedProducts.reduce((acc, p) => acc + (p.alternatives?.length || 0), 0)}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div style={{ ...styles.card, textAlign: 'center' }}>
              <h3>Start Scanning Your Products</h3>
              <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
                Discover which everyday items contain PFAS and find safer alternatives.
              </p>
              <button 
                onClick={() => setActiveView('products')}
                style={styles.button}
              >
                Scan Products Now
              </button>
            </div>
          </div>
        )}

        {/* Products View */}
        {activeView === 'products' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
              Product Search
            </h2>
            
            {/* Search Bar */}
            <div style={styles.card}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search products (e.g., 'non-stick pan', 'waterproof jacket')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ ...styles.input, flex: 1 }}
                />
                <Search size={20} color="white" />
              </div>
            </div>

            {/* Search Results */}
            <div style={{ display: 'grid', gap: '1rem' }}>
              {searchResults.map(product => (
                <div key={product.id} style={styles.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {getRiskIcon(product.pfasRisk)}
                        {product.name}
                      </h3>
                      <p style={{ color: '#9ca3af' }}>{product.brand} • {product.category}</p>
                      <p style={{ margin: '0.5rem 0' }}>{product.description}</p>
                      
                      {/* PFAS Score */}
                      <div style={{ margin: '1rem 0' }}>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>PFAS Risk Score</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '100px',
                            height: '8px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '4px'
                          }}>
                            <div style={{
                              width: `${product.pfasScore}%`,
                              height: '100%',
                              background: getRiskColor(product.pfasRisk),
                              borderRadius: '4px'
                            }}></div>
                          </div>
                          <span style={{ fontWeight: '600', color: getRiskColor(product.pfasRisk) }}>
                            {product.pfasScore}/100
                          </span>
                        </div>
                      </div>

                      {/* Alternatives */}
                      {product.alternatives.length > 0 && (
                        <div>
                          <p style={{ fontWeight: '600', color: '#10b981' }}>Safer Alternatives:</p>
                          <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
                            {product.alternatives.map((alt, index) => (
                              <li key={index} style={{ color: '#9ca3af' }}>{alt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => {
                        setScannedProducts(prev => [...prev, product]);
                        setSelectedProduct(product);
                      }}
                      style={{ ...styles.button, marginLeft: '1rem' }}
                    >
                      Add to History
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {searchTerm && searchResults.length === 0 && (
              <div style={styles.card}>
                <p style={{ textAlign: 'center', color: '#9ca3af' }}>
                  No products found. Try searching for "cookware", "clothing", or "food storage".
                </p>
              </div>
            )}
          </div>
        )}

        {/* History View */}
        {activeView === 'history' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
              Scanned Products History
            </h2>
            
            {scannedProducts.length === 0 ? (
              <div style={styles.card}>
                <p style={{ textAlign: 'center', color: '#9ca3af' }}>
                  No products scanned yet. Visit the Products tab to start scanning!
                </p>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <button 
                    onClick={() => setActiveView('products')}
                    style={styles.button}
                  >
                    Start Scanning
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {scannedProducts.map((product, index) => (
                  <div key={index} style={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {getRiskIcon(product.pfasRisk)}
                          {product.name}
                        </h3>
                        <p style={{ color: '#9ca3af' }}>{product.brand}</p>
                        <p style={{ 
                          color: getRiskColor(product.pfasRisk),
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          fontSize: '0.875rem'
                        }}>
                          {product.pfasRisk} Risk
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getRiskColor(product.pfasRisk) }}>
                          {product.pfasScore}
                        </p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Risk Score</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Blog View */}
        {activeView === 'blog' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
              PFAS Insights Blog
            </h2>
            
            <div style={styles.card}>
              <h3>Coming Soon!</h3>
              <p style={{ color: '#9ca3af' }}>
                Expert articles about PFAS, health impacts, and safer alternatives.
              </p>
              <div style={{ marginTop: '1rem' }}>
                <p style={{ color: '#c084fc', fontWeight: '600' }}>Upcoming topics:</p>
                <ul style={{ color: '#9ca3af', marginTop: '0.5rem' }}>
                  <li>The Hidden PFAS in Your Kitchen</li>
                  <li>PFAS-Free Alternatives for Every Room</li>
                  <li>Understanding PFAS Health Risks</li>
                  <li>How to Read Product Labels for PFAS</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Email Capture Modal */}
        {showEmailCapture && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              ...styles.card,
              maxWidth: '500px',
              margin: '2rem',
              position: 'relative'
            }}>
              <button
                onClick={() => setShowEmailCapture(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <X size={24} />
              </button>
              
              <h3 style={{ marginBottom: '1rem' }}>Stay Informed About PFAS</h3>
              <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
                Get alerts about new PFAS discoveries and product recalls.
              </p>
              
              <form onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ ...styles.input, marginBottom: '1rem' }}
                  required
                />
                <button type="submit" style={{ ...styles.button, width: '100%' }}>
                  Subscribe to Alerts
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
