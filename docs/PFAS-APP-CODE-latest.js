import React, { useState } from 'react';
import { Search, Shield, Clock, FileText, X, Plus, Star, Zap } from 'lucide-react';

function App() {
  // State management
  const [activeView, setActiveView] = useState('scan');
  const [searchTerm, setSearchTerm] = useState('');
  const [scannedProducts, setScannedProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [userInterest, setUserInterest] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showContribute, setShowContribute] = useState(false);
  const [contributeName, setContributeName] = useState('');
  const [contributeBrand, setContributeBrand] = useState('');
  const [contributeEvidence, setContributeEvidence] = useState('');
  const [contributeReason, setContributeReason] = useState('');
  const [contributorCredits, setContributorCredits] = useState(0);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  // Product Database
  const productDatabase = [
    {
      id: "FF001",
      name: "McDonald's French Fries Container",
      brand: "McDonald's",
      category: "Fast Food Packaging",
      pfasScore: 85,
      risk: 'high',
      image: '🍟',
      pfas_present: true,
      pfas_compounds: ["PFOA", "PFOS"],
      confidence_rating: "High",
      evidence: "Toxic-Free Future Study & Ecology Center Testing",
      testing_methodology: "Total fluorine analysis followed by specific PFAS compound identification",
      riskFactors: [
        'PFAS found in grease-resistant packaging',
        'Direct food contact during heating'
      ],
      alternatives: [
        { 
          name: 'World Centric Unbleached Paper Container', 
          price: '$15-25 for 50 containers', 
          badge: 'PFAS-Free Certified',
          verification: 'Manufacturer certification and third-party testing'
        }
      ]
    },
    {
      id: "FF002", 
      name: "Burger King Whopper Wrapper",
      brand: "Burger King",
      category: "Fast Food Packaging", 
      pfasScore: 89,
      risk: 'high',
      image: '🍔',
      pfas_present: true,
      pfas_compounds: ["PFOA"],
      concentration: "249.7 PPM",
      confidence_rating: "High",
      evidence: "Consumer Reports Testing & Toxic-Free Future Study",
      testing_methodology: "Total organic fluorine analysis",
      riskFactors: [
        'PFAS treatment in wrapper at 249.7 PPM concentration',
        'Direct food contact with heated sandwich'
      ],
      alternatives: [
        { 
          name: 'If You Care Unbleached Sandwich Wrap Paper', 
          price: '$5-8 for 75 sheets', 
          badge: 'PFAS-Free Certified',
          verification: 'Manufacturer certification'
        }
      ]
    },
    {
      id: "CW001",
      name: "All-Clad Non-stick Frying Pan", 
      brand: "All-Clad",
      category: "Cookware",
      pfasScore: 88,
      risk: 'high',
      image: '🍳',
      pfas_present: true,
      pfas_compounds: ["PTFE"],
      confidence_rating: "High",
      evidence: "Manufacturer Disclosure & LeafScore Analysis",
      testing_methodology: "Manufacturer disclosure and third-party verification",
      riskFactors: [
        'PTFE coating confirmed by manufacturer',
        'High-heat cooking can release toxic fumes'
      ],
      alternatives: [
        { 
          name: 'Caraway Ceramic Non-stick Fry Pan', 
          price: '$95-130', 
          badge: 'PFAS-Free Certified',
          verification: 'Manufacturer certification and third-party testing'
        },
        { 
          name: 'Lodge Cast Iron Skillet', 
          price: '$20-45', 
          badge: 'Naturally PFAS-Free',
          verification: 'Material composition (cast iron only)'
        }
      ]
    },
    {
      id: "CM001",
      name: "Maybelline Voluminous Waterproof Mascara",
      brand: "Maybelline", 
      category: "Cosmetics",
      pfasScore: 72,
      risk: 'medium',
      image: '💄',
      pfas_present: true,
      pfas_compounds: ["Undisclosed PFAS"],
      confidence_rating: "High",
      evidence: "Class Action Lawsuit & University of Notre Dame Study",
      testing_methodology: "Fluorine analysis and specific PFAS compound identification",
      riskFactors: [
        '47% of mascaras tested contain high fluorine levels',
        'Daily eye area application increases exposure'
      ],
      alternatives: [
        { 
          name: 'Honest Beauty Extreme Length Mascara + Lash Primer', 
          price: '$15-20', 
          badge: 'EWG Verified',
          verification: 'Manufacturer certification and EWG Verified status'
        }
      ]
    },
    {
      id: "BP001",
      name: "Pampers Pure Protection Diapers",
      brand: "Pampers",
      category: "Baby Products", 
      pfasScore: 15,
      risk: 'low',
      image: '👶',
      pfas_present: false,
      pfas_compounds: [],
      confidence_rating: "Medium-High",
      evidence: "Mamavation Testing & Environmental Health News Study",
      testing_methodology: "Total fluorine analysis",
      riskFactors: [],
      certified: "PFAS-Free - Manufacturer Confirmed",
      alternatives: []
    },
    {
      id: "FF003",
      name: "Starbucks Hot Cup",
      brand: "Starbucks",
      category: "Fast Food Packaging",
      pfasScore: 78,
      risk: 'high',
      image: '☕',
      pfas_present: true,
      pfas_compounds: ["Undisclosed PFAS"],
      confidence_rating: "High",
      evidence: "Consumer Reports Testing & Environmental Health News",
      testing_methodology: "Total organic fluorine analysis",
      riskFactors: [
        'PFAS found in hot beverage containers',
        'Daily exposure for regular coffee drinkers'
      ],
      alternatives: [
        {
          name: 'Stojo Collapsible Coffee Cup',
          price: '$15-25',
          badge: 'PFAS-Free Certified',
          verification: 'Manufacturer certification'
        }
      ]
    }
  ];

  // Helper functions
  const getRiskColor = (risk) => {
    switch(risk) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFD93D'; 
      case 'low': return '#6BCF7F';
      default: return '#9CA3AF';
    }
  };

  const getRiskIcon = (risk) => {
    switch(risk) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const searchResults = productDatabase.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmailSubmit = () => {
    alert('Thanks for subscribing! Your free PFAS guide will be sent to your email.');
    setShowEmailCapture(false);
    setEmail('');
    setUserInterest('');
  };

  const handleContribute = () => {
    if (contributeName && contributeBrand && contributeEvidence && contributeReason) {
      const newCredits = contributorCredits + 1;
      setContributorCredits(newCredits);
      
      alert(`🎉 Thanks for contributing "${contributeName}" by ${contributeBrand}! You've earned 1 credit!`);
      
      setShowContribute(false);
      setContributeName('');
      setContributeBrand('');
      setContributeEvidence('');
      setContributeReason('');
    } else {
      alert('Please fill in all fields to submit your contribution.');
    }
  };

  const handleProductScan = (product) => {
    setScannedProducts(prev => [...prev, product]);
    setSearchCount(prev => prev + 1);
    
    if (searchCount > 0 && searchCount % 3 === 0) {
      setTimeout(() => setShowPremiumModal(true), 1000);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FFFFFF',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Shield size={32} color="#6366F1" />
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#1F2937' }}>
                  PFAS-FREE
                </h1>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: 0 }}>
                  Scan • Learn • Protect
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {contributorCredits > 0 && (
                <div style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Star size={16} />
                  {contributorCredits} Credits
                </div>
              )}
              <button 
                onClick={() => setShowEmailCapture(true)}
                style={{
                  backgroundColor: '#6366F1',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}
              >
                Get Free PFAS Guide
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Hero Section */}
        {activeView === 'scan' && (
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1rem' }}>
              Protect Your Family from Forever Chemicals
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6B7280', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Search products instantly to check for harmful PFAS chemicals. Join thousands making safer choices.
            </p>
            
            {/* Value Proposition */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔬</div>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>Science-Backed Data</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Evidence from peer-reviewed studies</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</div>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>Verified Alternatives</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Real safer products you can buy</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💡</div>
                <div style={{ fontWeight: '600', color: '#1F2937' }}>Expert Guidance</div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Premium guides for deeper protection</div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #E5E7EB',
          borderRadius: '0.75rem',
          padding: '1rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
              <Search size={20} color="#9CA3AF" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search products or brands (e.g., 'Teflon pan', 'McDonald's')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
            <button
              onClick={() => setShowContribute(true)}
              style={{
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500'
              }}
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>
          {searchCount >= 5 && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#EEF2FF',
              border: '1px solid #C7D2FE',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#3730A3'
            }}>
              💡 <strong>Tip:</strong> You've searched {searchCount} products! Get personalized recommendations with our premium guides.
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          marginBottom: '2rem',
          borderBottom: '1px solid #E5E7EB',
          paddingBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          {[
            { key: 'scan', label: 'Scan Products', icon: Search },
            { key: 'history', label: 'History', icon: Clock },
            { key: 'sources', label: 'Data Sources', icon: FileText },
            { key: 'blog', label: 'Learn', icon: FileText }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveView(tab.key)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeView === tab.key ? '#EEF2FF' : 'transparent',
                color: activeView === tab.key ? '#6366F1' : '#6B7280',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scan View */}
        {activeView === 'scan' && (
          <div>
            {/* Recent Scans */}
            {scannedProducts.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1F2937' }}>Recent Scans</h3>
                  <button 
                    onClick={() => setActiveView('history')}
                    style={{ color: '#6366F1', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    See all
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
                  {scannedProducts.slice(0, 4).map((product, index) => (
                    <div key={index} style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        {product.image}
                      </div>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                        {getRiskIcon(product.risk)}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '500' }}>
                        {product.name.split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scannedProducts.length === 0 && (
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '0.75rem',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                marginBottom: '2rem'
              }}>
                <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
                  No products scanned yet. Start by searching for a product above!
                </p>
                <div style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
                  Try searching: "McDonald's", "All-Clad", "Maybelline"
                </div>
              </div>
            )}

            {/* Product Results */}
            <div style={{ display: 'grid', gap: '1rem' }}>
              {(searchTerm ? searchResults : productDatabase).map(product => (
                <div key={product.id} style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '2rem' }}>{product.image}</span>
                        <div>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                            {product.name}
                          </h3>
                          <p style={{ color: '#6B7280', margin: '0.25rem 0', fontSize: '0.875rem' }}>
                            {product.brand} • {product.category}
                          </p>
                        </div>
                      </div>
                      
                      {/* Evidence Citation */}
                      <div style={{ 
                        marginTop: '0.75rem',
                        padding: '0.75rem',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem'
                      }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <span style={{ color: '#64748B', fontWeight: '500' }}>Evidence: </span>
                          <span style={{ color: '#1E293B', fontWeight: '600' }}>
                            {product.evidence}
                          </span>
                        </div>
                        
                        {product.confidence_rating && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <span style={{ color: '#64748B' }}>Confidence: </span>
                            <span style={{ 
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.375rem',
                              fontSize: '0.6875rem',
                              fontWeight: '600',
                              backgroundColor: '#DEF7EC',
                              color: '#065F46'
                            }}>
                              {product.confidence_rating} CONFIDENCE
                            </span>
                          </div>
                        )}
                        
                        {product.pfas_compounds && product.pfas_compounds.length > 0 && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <span style={{ color: '#64748B' }}>PFAS Detected: </span>
                            <span style={{ color: '#DC2626', fontWeight: '600' }}>
                              {product.pfas_compounds.join(', ')}
                            </span>
                          </div>
                        )}
                        
                        {product.concentration && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <span style={{ color: '#64748B' }}>Concentration: </span>
                            <span style={{ color: '#DC2626', fontWeight: '600' }}>
                              {product.concentration}
                            </span>
                          </div>
                        )}
                        
                        {product.testing_methodology && (
                          <div style={{ fontSize: '0.6875rem', color: '#64748B', fontStyle: 'italic' }}>
                            Method: {product.testing_methodology}
                          </div>
                        )}
                        
                        {product.certified && (
                          <div style={{ 
                            marginTop: '0.5rem',
                            color: '#059669',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            ✅ {product.certified}
                          </div>
                        )}
                      </div>

                      {/* Risk Factors */}
                      {product.riskFactors && product.riskFactors.length > 0 && (
                        <div style={{ marginTop: '1rem' }}>
                          <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                            {product.riskFactors[0]}
                          </p>
                        </div>
                      )}
                      
                      {/* High Risk CTA */}
                      {product.pfasScore > 60 && (
                        <div style={{
                          marginTop: '1rem',
                          padding: '1rem',
                          backgroundColor: '#FEF3C7',
                          border: '1px solid #F59E0B',
                          borderRadius: '0.5rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Zap size={16} color="#D97706" />
                            <span style={{ fontWeight: '600', color: '#92400E' }}>High PFAS Risk Detected</span>
                          </div>
                          <p style={{ fontSize: '0.875rem', color: '#92400E', marginBottom: '0.75rem' }}>
                            Want 10+ specific safer alternatives to this exact product?
                          </p>
                          <button
                            onClick={() => alert('Premium guide feature coming soon!')}
                            style={{
                              backgroundColor: '#D97706',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '0.875rem'
                            }}
                          >
                            Get Custom Report ($9) →
                          </button>
                        </div>
                      )}
                      
                      {/* Alternatives */}
                      {product.alternatives && product.alternatives.length > 0 && (
                        <div style={{ marginTop: '1rem' }}>
                          <span style={{ fontSize: '0.875rem', color: '#059669', fontWeight: '600' }}>
                            ✅ Verified Safer Alternatives:
                          </span>
                          
                          {product.alternatives.slice(0, 2).map((alt, index) => (
                            <div key={index} style={{
                              backgroundColor: '#F0FDF4',
                              border: '1px solid #BBF7D0',
                              borderRadius: '0.5rem',
                              padding: '0.75rem',
                              fontSize: '0.875rem',
                              marginTop: '0.5rem'
                            }}>
                              <div style={{ fontWeight: '600', color: '#065F46', marginBottom: '0.25rem' }}>
                                {alt.name}
                              </div>
                              <div style={{ color: '#047857', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                                {alt.price} • {alt.badge}
                              </div>
                              {alt.verification && (
                                <div style={{ color: '#6B7280', fontSize: '0.6875rem', fontStyle: 'italic' }}>
                                  Verified: {alt.verification}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Score Badge */}
                    <div style={{
                      backgroundColor: getRiskColor(product.risk),
                      color: 'white',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      textAlign: 'center',
                      minWidth: '80px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {product.pfasScore}
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.9, textTransform: 'uppercase' }}>
                        {product.risk}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleProductScan(product)}
                    style={{
                      marginTop: '1rem',
                      width: '100%',
                      backgroundColor: '#6366F1',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Add to History • Track Product
                  </button>
                </div>
              ))}
            </div>

            {searchTerm && searchResults.length === 0 && (
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '0.75rem',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
                  Product not found in our database yet.
                </p>
                <button
                  onClick={() => setShowContribute(true)}
                  style={{
                    backgroundColor: '#6366F1',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    marginBottom: '1rem'
                  }}
                >
                  Help Us Add It (Earn Credits!)
                </button>
              </div>
            )}
          </div>
        )}

        {/* History View */}
        {activeView === 'history' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1F2937', marginBottom: '2rem' }}>
              Scan History
            </h2>
            
            {scannedProducts.length === 0 ? (
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '0.75rem',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
                  No products scanned yet.
                </p>
                <button 
                  onClick={() => setActiveView('scan')}
                  style={{
                    backgroundColor: '#6366F1',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Start Scanning
                </button>
              </div>
            ) : (
              <div>
                {/* History Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6366F1' }}>
                      {scannedProducts.length}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Products Scanned</div>
                  </div>
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#DC2626' }}>
                      {scannedProducts.filter(p => p.pfasScore > 60).length}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>High Risk Found</div>
                  </div>
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>
                      {Math.round(scannedProducts.reduce((sum, p) => sum + (100 - p.pfasScore), 0) / scannedProducts.length) || 0}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Safety Score</div>
                  </div>
                </div>

                {/* History List */}
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {scannedProducts.map((product, index) => (
                    <div key={index} style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '2rem' }}>{product.image}</span>
                        <div>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                            {product.name}
                          </h3>
                          <p style={{ color: '#6B7280', margin: '0.25rem 0', fontSize: '0.875rem' }}>
                            {product.brand} • Scanned recently
                          </p>
                        </div>
                      </div>
                      <div style={{
                        backgroundColor: getRiskColor(product.risk),
                        color: 'white',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 1rem',
                        textAlign: 'center',
                        minWidth: '60px'
                      }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                          {product.pfasScore}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Data Sources View */}
        {activeView === 'sources' && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h2>Data Sources</h2>
            <p>Our database includes peer-reviewed studies, government testing, and independent laboratory results.</p>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '2rem' }}>
              All evidence is cited with links to original sources for transparency.
            </div>
          </div>
        )}

        {/* Learn/Blog View */}
        {activeView === 'blog' && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h2>Learn About PFAS</h2>
            <p>Educational content and guides coming soon!</p>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '2rem' }}>
              Discover the science behind forever chemicals and how to protect your family.
            </div>
          </div>
        )}
      </main>

      {/* Email Capture Modal */}
      {showEmailCapture && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
          }}>
            <button
              onClick={() => setShowEmailCapture(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
              <h3 style={{ color: '#1F2937', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Get Your Free PFAS Guide
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '0' }}>
                "The Shocking 20: Hidden PFAS Products in Your Home" - Learn which everyday products contain dangerous forever chemicals.
              </p>
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  outline: 'none'
                }}
              />
              
              <select
                value={userInterest}
                onChange={(e) => setUserInterest(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                <option value="">What interests you most?</option>
                <option value="kitchen">Kitchen & Cookware Safety</option>
                <option value="baby">Baby & Children's Products</option>
                <option value="cosmetics">Beauty & Personal Care</option>
                <option value="food">Food & Packaging</option>
                <option value="all">Everything PFAS-Free</option>
              </select>
              
              <button 
                onClick={handleEmailSubmit}
                style={{
                  width: '100%',
                  backgroundColor: '#6366F1',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                Get Free Guide + Personalized Tips
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contribute Modal */}
      {showContribute && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
          }}>
            <button
              onClick={() => setShowContribute(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
              <h3 style={{ color: '#1F2937', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Add Missing Product
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '0.5rem' }}>
                Help us expand our database by suggesting a product with evidence.
              </p>
              <div style={{
                backgroundColor: '#10B981',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'inline-block'
              }}>
                ⭐ Earn 1 Credit per Verified Contribution
              </div>
            </div>
            
            <div>
              <input
                type="text"
                placeholder="Product name"
                value={contributeName}
                onChange={(e) => setContributeName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  outline: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Brand name"
                value={contributeBrand}
                onChange={(e) => setContributeBrand(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  outline: 'none'
                }}
              />
              <input
                type="url"
                placeholder="Evidence source URL"
                value={contributeEvidence}
                onChange={(e) => setContributeEvidence(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  outline: 'none'
                }}
              />
              <textarea
                placeholder="Why do you think this product contains/doesn't contain PFAS?"
                value={contributeReason}
                onChange={(e) => setContributeReason(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
              <button 
                onClick={handleContribute}
                style={{
                  width: '100%',
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                Submit for Review (Earn Credit!)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Modal */}
      {showPremiumModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
          }}>
            <button
              onClick={() => setShowPremiumModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <h3 style={{ color: '#1F2937', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Ready to Go PFAS-Free?
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '0' }}>
                Based on your activity, here are guides that could help you make safer choices:
              </p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <h5 style={{ color: '#1F2937', fontWeight: '600', margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>
                    Complete PFAS-Free Kitchen Guide
                  </h5>
                  <p style={{ color: '#6B7280', fontSize: '0.75rem', margin: 0 }}>
                    Transform your kitchen with 50+ verified safe alternatives...
                  </p>
                </div>
                <div style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <h5 style={{ color: '#1F2937', fontWeight: '600', margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>
                    Fast Food Safety Guide
                  </h5>
                  <p style={{ color: '#6B7280', fontSize: '0.75rem', margin: 0 }}>
                    Navigate fast food safely with brand-by-brand analysis...
                  </p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setShowPremiumModal(false)}
                style={{
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;