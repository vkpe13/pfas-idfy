import React, { useState } from 'react';
import { Search, ShieldAlert, Gauge, FileText, Clock, Star, X, Check, ChevronRight, Package } from 'lucide-react';

const PfasIdFyApp = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scannedProducts, setScannedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample products for demo
  const products = [
    {
      id: 1,
      name: "McDonald's French Fries Container",
      brand: "McDonald's",
      category: "Food Packaging",
      hasPfas: true,
      riskScore: 75,
      description: "PFAS detected in grease-resistant packaging",
      alternatives: ["Eat in restaurant with real plates", "Bring your own container"]
    },
    {
      id: 2,
      name: "Teflon Non-stick Pan",
      brand: "DuPont",
      category: "Cookware",
      hasPfas: true,
      riskScore: 90,
      description: "Contains PTFE coating that can release PFAS when overheated",
      alternatives: ["Cast iron skillet", "Stainless steel pan", "Ceramic cookware"]
    },
    {
      id: 3,
      name: "Pyrex Glass Container",
      brand: "Pyrex",
      category: "Food Storage",
      hasPfas: false,
      riskScore: 0,
      description: "PFAS-free glass storage solution",
      alternatives: []
    },
    {
      id: 4,
      name: "Oral-B Glide Dental Floss",
      brand: "Oral-B",
      category: "Personal Care",
      hasPfas: true,
      riskScore: 60,
      description: "Contains PTFE for smooth gliding",
      alternatives: ["Silk floss", "Bamboo floss", "Unwaxed floss"]
    }
  ];

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const FORM_ID = '1FAIpQLSe9UuK-Icl0k6l9pIjEDfzJ_u8LfswiLKe5s6FDsLHwy824gg';
    const FIELD_ID = 'entry.127497103';
    
    const formData = new FormData();
    formData.append(FIELD_ID, userEmail);
    
    try {
      await fetch(
        `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`,
        {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        }
      );
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitting(false);
      setEmailSubmitted(true);
      
      setTimeout(() => {
        setShowEmailCapture(false);
        setEmailSubmitted(false);
        setUserEmail('');
        window.open('https://drive.google.com/file/d/187rn5oNKB_tz61V29aQl_JilpVUIutf6/view?usp=sharing', '_blank');
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
      setEmailSubmitted(true);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    if (!scannedProducts.find(p => p.id === product.id)) {
      setScannedProducts([...scannedProducts, product]);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskColor = (score) => {
    if (score === 0) return '#22c55e';
    if (score < 50) return '#eab308';
    return '#ef4444';
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #1e293b, #7c3aed, #1e293b)',
      color: 'white'
    },
    header: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(12px)',
      padding: '1rem'
    },
    button: {
      padding: '0.5rem 1rem',
      background: 'linear-gradient(to right, #9333ea, #ec4899)',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      fontWeight: '500'
    },
    navButton: {
      padding: '0.5rem 1rem',
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      marginRight: '0.5rem'
    },
    activeNavButton: {
      background: 'rgba(147, 51, 234, 0.3)',
      borderColor: '#9333ea'
    },
    card: {
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '1rem'
    },
    modal: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 50
    },
    modalContent: {
      background: 'rgba(17, 24, 39, 0.95)',
      borderRadius: '1rem',
      padding: '2rem',
      maxWidth: '28rem',
      width: '100%',
      border: '1px solid rgba(255,255,255,0.1)'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldAlert size={40} color="#c084fc" />
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>PFAS ID-FY</h1>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
                  Scan • Learn • Protect
                </p>
              </div>
            </div>
            <button onClick={() => setShowEmailCapture(true)} style={styles.button}>
              Get Free PFAS Guide
            </button>
          </div>
          
          {/* Navigation */}
          <nav>
            <button 
              onClick={() => setActiveView('dashboard')} 
              style={{...styles.navButton, ...(activeView === 'dashboard' ? styles.activeNavButton : {})}}
            >
              <Gauge size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveView('products')} 
              style={{...styles.navButton, ...(activeView === 'products' ? styles.activeNavButton : {})}}
            >
              <Search size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
              Products
            </button>
            <button 
              onClick={() => setActiveView('history')} 
              style={{...styles.navButton, ...(activeView === 'history' ? styles.activeNavButton : {})}}
            >
              <Clock size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
              History
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Dashboard View */}
        {activeView === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
              Your PFAS Risk Dashboard
            </h2>
            
            <div style={styles.card}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Overall Risk Score</h3>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', color: getRiskColor(0) }}>
                {scannedProducts.length > 0 
                  ? Math.round(scannedProducts.reduce((sum, p) => sum + p.riskScore, 0) / scannedProducts.length)
                  : 0
                }
              </div>
              <p style={{ textAlign: 'center', color: '#9ca3af' }}>
                {scannedProducts.length === 0 
                  ? 'Start scanning products to see your risk level'
                  : `Based on ${scannedProducts.length} scanned products`
                }
              </p>
            </div>

            <button 
              onClick={() => setActiveView('products')} 
              style={{...styles.button, width: '100%', padding: '1rem', fontSize: '1.125rem'}}
            >
              <Search size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Scan Your First Product
            </button>
          </div>
        )}

        {/* Products View */}
        {activeView === 'products' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
              Product Search
            </h2>
            
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '1rem',
                marginBottom: '1.5rem'
              }}
            />

            <div>
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  style={{...styles.card, cursor: 'pointer'}}
                  onClick={() => handleProductClick(product)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{product.name}</h3>
                      <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>{product.brand} • {product.category}</p>
                      <p style={{ fontSize: '0.875rem' }}>{product.description}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getRiskColor(product.riskScore) }}>
                        {product.riskScore}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Risk Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History View */}
        {activeView === 'history' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
              Scan History
            </h2>
            
            {scannedProducts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#9ca3af' }}>No products scanned yet</p>
            ) : (
              scannedProducts.map(product => (
                <div key={product.id} style={styles.card}>
                  <h3>{product.name}</h3>
                  <p style={{ color: '#9ca3af' }}>{product.brand} • Risk Score: {product.riskScore}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={styles.modal} onClick={() => setSelectedProduct(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedProduct.name}</h2>
              <button 
                onClick={() => setSelectedProduct(null)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>
            
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
              {selectedProduct.brand} • {selectedProduct.category}
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getRiskColor(selectedProduct.riskScore) }}>
                Risk Score: {selectedProduct.riskScore}
              </div>
              <p style={{ marginTop: '0.5rem' }}>{selectedProduct.description}</p>
            </div>

            {selectedProduct.alternatives.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Safer Alternatives:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectedProduct.alternatives.map((alt, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      <ChevronRight size={16} style={{ display: 'inline', marginRight: '0.5rem', color: '#22c55e' }} />
                      {alt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailCapture && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            {!emailSubmitted ? (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <FileText size={48} color="#c084fc" style={{ marginBottom: '1rem' }} />
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Get Your Free PFAS Guide
                  </h2>
                  <p style={{ color: '#d1d5db' }}>
                    "The Shocking 20: Hidden PFAS Products in Your Home"
                  </p>
                </div>
                
                <form onSubmit={handleEmailSubmit}>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      marginBottom: '1rem',
                      fontSize: '1rem'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      ...styles.button,
                      width: '100%',
                      padding: '0.75rem',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    {isSubmitting ? 'Processing...' : 'Get Instant Access'}
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Check size={48} color="#22c55e" style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Success!
                </h2>
                <p>Your guide is downloading...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PfasIdFyApp;