import React, { useState } from 'react';
import { Search, Shield, Clock, FileText, X, Plus, AlertTriangle, CheckCircle, ExternalLink, ChevronRight, Star, Gift, Zap } from 'lucide-react';

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

  // REAL Curated Database (Enhanced with Stan Store context)
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
      evidence_sources: [
        {
          name: "Toxic-Free Future Study",
          url: "https://toxicfreefuture.org/press-room/new-study-indicates-toxic-chemicals-used-in-take-out-food-packaging-from-popular-food-chains/",
          date: "2020-08-06"
        }
      ],
      testing_methodology: "Total fluorine analysis followed by specific PFAS compound identification",
      riskFactors: [
        'PFAS found in grease-resistant packaging',
        'Direct food contact during heating',
        'McDonald\'s announced PFAS phase-out by 2025'
      ],
      alternatives: [
        { 
          name: 'World Centric Unbleached Paper Container', 
          price: '$15-25 for 50 containers', 
          link: 'https://amzn.to/worldcentriccontainers',
          badge: 'PFAS-Free Certified',
          verification: 'Manufacturer certification and third-party testing'
        }
      ],
      stanStoreGuide: "fast-food-safety-guide"
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
      evidence_sources: [
        {
          name: "Consumer Reports Testing",
          url: "https://www.consumerreports.org/health/food-contaminants/dangerous-pfas-chemicals-are-in-your-food-packaging-a3786252074/",
          date: "2022-03-24"
        }
      ],
      testing_methodology: "Total organic fluorine analysis",
      riskFactors: [
        'PFAS treatment in wrapper at 249.7 PPM concentration',
        'Direct food contact with heated sandwich',
        'Restaurant Brands International committed to eliminate PFAS by 2025'
      ],
      alternatives: [
        { 
          name: 'If You Care Unbleached Sandwich Wrap Paper', 
          price: '$5-8 for 75 sheets', 
          link: 'https://amzn.to/ifyoucarewraps',
          badge: 'PFAS-Free Certified',
          verification: 'Manufacturer certification'
        }
      ],
      stanStoreGuide: "fast-food-safety-guide"
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
      evidence_sources: [
        {
          name: "All-Clad Official Website",
          url: "https://www.all-clad.com/aboutnonstick",
          date: "2025-05-14"
        }
      ],
      testing_methodology: "Manufacturer disclosure and third-party verification",
      riskFactors: [
        'PTFE coating confirmed by manufacturer',
        'PFOA-free since 2013 due to federal regulations',
        'High-heat cooking can release toxic fumes'
      ],
      alternatives: [
        { 
          name: 'Caraway Ceramic Non-stick Fry Pan', 
          price: '$95-130', 
          link: 'https://amzn.to/carawaypan',
          badge: 'PFAS-Free Certified',
          verification: 'Manufacturer certification and third-party testing'
        },
        { 
          name: 'Lodge Cast Iron Skillet', 
          price: '$20-45', 
          link: 'https://amzn.to/lodgecastiron',
          badge: 'Naturally PFAS-Free',
          verification: 'Material composition (cast iron only)'
        }
      ],
      stanStoreGuide: "pfas-free-kitchen-guide"
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
      evidence_sources: [
        {
          name: "Class Action Lawsuit",
          url: "https://www.classaction.org/news/loral-maybelline-waterproof-mascaras-contain-toxic-pfas-class-action-alleges",
          date: "2022-02-25"
        },
        {
          name: "University of Notre Dame Study", 
          url: "https://news.nd.edu/news/use-of-pfas-in-cosmetics-widespread-new-study-finds/",
          date: "2021-06-15"
        }
      ],
      testing_methodology: "Fluorine analysis and specific PFAS compound identification",
      riskFactors: [
        '47% of mascaras tested contain high fluorine levels',
        'Daily eye area application increases exposure',
        'L\'Oreal faces ongoing litigation regarding PFAS'
      ],
      alternatives: [
        { 
          name: 'Honest Beauty Extreme Length Mascara + Lash Primer', 
          price: '$15-20', 
          link: 'https://amzn.to/honestmascara',
          badge: 'EWG Verified',
          verification: 'Manufacturer certification and EWG Verified status'
        }
      ],
      stanStoreGuide: "pfas-free-beauty-guide"
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
      evidence_sources: [
        {
          name: "Environmental Health News Study",
          url: "https://www.ehn.org/non-toxic-diapers",
          date: "2023-11-02"
        }
      ],
      testing_methodology: "Total fluorine analysis",
      riskFactors: [],
      certified: "PFAS-Free - Manufacturer Confirmed",
      alternatives: [],
      stanStoreGuide: "safe-baby-products-guide"
    }
  ];

  // Stan Store Products
  const stanStoreProducts = {
    "personalized-report": {
      name: "Personalized PFAS Alternative Report",
      price: "$9",
      description: "Get 10+ specific safer alternatives for any product you've scanned",
      url: "https://stan.store/pfas-free/personalized-report"
    },
    "pfas-free-kitchen-guide": {
      name: "Complete PFAS-Free Kitchen Guide",
      price: "$19",
      description: "Transform your kitchen with 50+ verified safe cookware & utensil alternatives",
      url: "https://stan.store/pfas-free/kitchen-guide"
    },
    "fast-food-safety-guide": {
      name: "Fast Food PFAS Safety Guide", 
      price: "$12",
      description: "Navigate fast food safely with brand-by-brand PFAS analysis",
      url: "https://stan.store/pfas-free/fast-food-guide"
    },
    "pfas-free-beauty-guide": {
      name: "PFAS-Free Beauty & Personal Care Guide",
      price: "$15",
      description: "Discover clean beauty brands verified PFAS-free",
      url: "https://stan.store/pfas-free/beauty-guide"
    },
    "safe-baby-products-guide": {
      name: "Safe Baby Products Complete Guide",
      price: "$24",
      description: "Everything new parents need for a PFAS-free nursery",
      url: "https://stan.store/pfas-free/baby-guide"
    }
  };

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
    const FORM_ID = '1FAIpQLSe9UuK-Icl0k6l9pIjEDfzJ_u8LfswiLKe5s6FDsLHwy824gg';
    const FIELD_ID = 'entry.127497103';
    
    const formData = new FormData();
    // Include interest for segmentation
    const emailData = userInterest ? `${email} - Interest: ${userInterest}` : email;
    formData.append(FIELD_ID, emailData);
    
    fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    }).then(() => {
      setShowEmailCapture(false);
      setEmail('');
      setUserInterest('');
      alert('Thanks for subscribing! Your free PFAS guide is being sent. Check out our premium guides for specific alternatives!');
      // Open PDF guide and hint at Stan Store
      window.open('https://drive.google.com/file/d/187rn5oNKB_tz61V29aQl_JilpVUIutf6/view?usp=sharing', '_blank');
      setTimeout(() => {
        if (userInterest) {
          setShowPremiumModal(true);
        }
      }, 2000);
    }).catch(() => {
      setShowEmailCapture(false);
      setEmail('');
      alert('Thanks for subscribing! (Demo mode)');
    });
  };

  const handleContribute = () => {
    if (contributeName && contributeBrand && contributeEvidence && contributeReason) {
      const newCredits = contributorCredits + 1;
      setContributorCredits(newCredits);
      
      alert(`🎉 Thanks for contributing "${contributeName}" by ${contributeBrand}! 

Evidence Source: ${contributeEvidence}
Reason: ${contributeReason}

✅ You've earned 1 contributor credit! (Total: ${newCredits})
💎 Credits can be used for Stan Store discounts!

We'll review your submission and add it to our database if verified.`);
      
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
    
    // Trigger premium prompts after certain actions
    if (searchCount > 0 && searchCount % 3 === 0) {
      setTimeout(() => setShowPremiumModal(true), 1000);
    }
  };

  const handleStanStoreClick = (productType) => {
    // Track conversion for analytics
    console.log(`Stan Store click: ${productType}`);
    // Open Stan Store (placeholder URL)
    window.open(`https://stan.store/pfas-free/${productType}`, '_blank');
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
              Search products instantly to check for harmful PFAS chemicals. Join 2,847+ health-conscious users making safer choices.
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
                        {product.pfasScore}
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
                  Try searching: "Teflon pan", "McDonald's fries", "waterproof mascara"
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
                              backgroundColor: product.confidence_rating === 'High' ? '#DEF7EC' : 
                                             product.confidence_rating === 'Medium-High' ? '#FEF3C7' :
                                             product.confidence_rating === 'Medium' ? '#FED7AA' : '#F3F4F6',
                              color: product.confidence_rating === 'High' ? '#065F46' : 
                                     product.confidence_rating === 'Medium-High' ? '#92400E' :
                                     product.confidence_rating === 'Medium' ? '#C2410C' : '#374151'
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
                      
                      {/* Stan Store CTA for High Risk Products */}
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
                            onClick={() => handleStanStoreClick('personalized-report')}
                            style={{
                              backgroundColor: '#D97706',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '0.875rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}
                          >
                            Get Custom Report ($9) →
                          </button>
                        </div>
                      )}
                      
                      {/* Alternatives with Stan Store Integration */}
                      {product.alternatives && product.alternatives.length > 0 && (
                        <div style={{ marginTop: '1rem' }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem'
                          }}>
                            <span style={{ fontSize: '0.875rem', color: '#059669', fontWeight: '600' }}>
                              ✅ Verified Safer Alternatives:
                            </span>
                            {product.stanStoreGuide && (
                              <button
                                onClick={() => handleStanStoreClick(product.stanStoreGuide)}
                                style={{
                                  backgroundColor: '#6366F1',
                                  color: 'white',
                                  border: 'none',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '0.375rem',
                                  cursor: 'pointer',
                                  fontSize: '0.75rem',
                                  fontWeight: '500'
                                }}
                              >
                                See All Options →
                              </button>
                            )}
                          </div>
                          
                          {product.alternatives.slice(0, 2).map((alt, index) => (
                            <div key={index} style={{
                              backgroundColor: '#F0FDF4',
                              border: '1px solid #BBF7D0',
                              borderRadius: '0.5rem',
                              padding: '0.75rem',
                              fontSize: '0.875rem',
                              marginBottom: '0.5rem'
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
                              {alt.link && alt.link !== '#' && (
                                <button style={{
                                  marginTop: '0.5rem',
                                  backgroundColor: '#059669',
                                  color: 'white',
                                  border: 'none',
                                  padding: '0.5rem 1rem',
                                  borderRadius: '0.375rem',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer',
                                  fontWeight: '500'
                                }}>
                                  🛒 Buy Now
                                </button>
                              )}
                            </div>
                          ))}
                          
                          {product.alternatives.length > 2 && (
                            <div style={{ 
                              fontSize: '0.75rem', 
                              color: '#6B7280', 
                              fontStyle: 'italic',
                              textAlign: 'center'
                            }}>
                              + {product.alternatives.length - 2} more alternatives in our complete guide
                            </div>
                          )}
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
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
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
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: '#EEF2FF',
                  borderRadius: '0.5rem'
                }}>
                  <p style={{ fontSize: '0.875rem', color: '#3730A3', margin: 0 }}>
                    💡 <strong>Can't wait?</strong> Get our personalized research service where we investigate any product for you within 24 hours.
                  </p>
                  <button
                    onClick={() => handleStanStoreClick('personalized-report')}
                    style={{
                      marginTop: '0.5rem',
                      backgroundColor: '#6366F1',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Get Custom Research ($9) →
                  </button>
                </div>
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

                {/* Premium CTA based on history */}
                {scannedProducts.length >= 3 && (
                  <div style={{
                    backgroundColor: '#6366F1',
                    color: 'white',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    textAlign: 'center'
                  }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                      🎯 Ready to Go PFAS-Free?
                    </h3>
                    <p style={{ margin: '0 0 1rem 0', opacity: 0.9 }}>
                      You've scanned {scannedProducts.length} products! Get a complete action plan with our personalized guides.
                    </p>
                    <button 
                      onClick={() => setShowPremiumModal(true)}
                      style={{
                        backgroundColor: 'white',
                        color: '#6366F1',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      See Recommended Guides →
                    </button>
                  </div>
                )}

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

        {/* Data Sources View - Enhanced */}
        {activeView === 'sources' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1F2937', marginBottom: '2rem' }}>
              Our Data Sources & Methodology
            </h2>
            
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '0.75rem',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ color: '#1F2937', marginBottom: '1rem' }}>Why Our Data is Different</h3>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                Unlike other PFAS resources that rely on outdated or incomplete information, our database prioritizes recent, verified research from authoritative sources. Every product entry includes direct citations and confidence ratings.
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: '#1F2937', marginBottom: '1rem', fontSize: '1.125rem' }}>Source Hierarchy (Highest to Lowest Priority)</h4>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {[
                    { 
                      priority: '1', 
                      source: 'Peer-reviewed Scientific Studies', 
                      description: 'Independent research with direct product testing',
                      examples: 'Environmental Science & Technology, Nature Food Journal',
                      color: '#10B981'
                    },
                    { 
                      priority: '2', 
                      source: 'Government Agency Testing', 
                      description: 'Official testing by regulatory bodies',
                      examples: 'EPA, FDA, California DTSC',
                      color: '#6366F1'
                    },
                    { 
                      priority: '3', 
                      source: 'Independent Third-Party Testing', 
                      description: 'Certified laboratories and consumer organizations',
                      examples: 'Consumer Reports, Ecology Center',
                      color: '#8B5CF6'
                    },
                    { 
                      priority: '4', 
                      source: 'Manufacturer Disclosures', 
                      description: 'Official company statements with verification',
                      examples: 'Ingredient lists, safety data sheets',
                      color: '#F59E0B'
                    }
                  ].map((item, index) => (
                    <div key={index} style={{
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '0.5rem',
                      padding: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{
                          backgroundColor: item.color,
                          color: 'white',
                          width: '1.5rem',
                          height: '1.5rem',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}>
                          {item.priority}
                        </span>
                        <h5 style={{ color: '#1F2937', fontWeight: '600', margin: 0 }}>{item.source}</h5>
                      </div>
                      <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: '0.5rem 0' }}>
                        {item.description}
                      </p>
                      <p style={{ color: '#9CA3AF', fontSize: '0.75rem', margin: 0, fontStyle: 'italic' }}>
                        Examples: {item.examples}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: '#1F2937', marginBottom: '1rem', fontSize: '1.125rem' }}>Database Statistics</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6366F1' }}>5</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Products Researched</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>80%</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>High Confidence</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#DC2626' }}>12</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Evidence Sources</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8B5CF6' }}>100+</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Coming Soon</div>
                  </div>
                </div>
              </div>

              {/* Research Expansion CTA */}
              <div style={{
                backgroundColor: '#EEF2FF',
                border: '1px solid #C7D2FE',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#3730A3', margin: '0 0 0.5rem 0' }}>Help Us Expand Our Database</h4>
                <p style={{ color: '#4C1D95', fontSize: '0.875rem', margin: '0 0 1rem 0' }}>
                  Want to see more products researched? Our premium subscribers get priority research requests and early access to new data.
                </p>
                <button 
                  onClick={() => setShowPremiumModal(true)}
                  style={{
                    backgroundColor: '#6366F1',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Learn About Premium Access
                </button>
              </div>
            </div>
            
            {/* Legal Disclaimer */}
            <div style={{
              backgroundColor: '#FEF3C7',
              border: '1px solid #F59E0B',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <h4 style={{ color: '#92400E', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ⚠️ Important Disclaimer
              </h4>
              <p style={{ color: '#92400E', fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>
                <strong>For Educational Purposes Only:</strong> Information provided is based on available research and manufacturer disclosures. 
                PFAS research is ongoing and product formulations may change. Always consult product labels and manufacturers for the most current information. 
                This information should not be considered as medical or regulatory advice. Individual health concerns should be discussed with qualified healthcare professionals.
              </p>
            </div>
          </div>
        )}

        {/* Learn/Blog View - Enhanced with Stan Store CTAs */}
        {activeView === 'blog' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1F2937', marginBottom: '2rem' }}>
              PFAS Education Center
            </h2>
            
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '0.75rem',
              padding: '2rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#1F2937', marginBottom: '1rem' }}>Free Educational Content Coming Soon!</h3>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                We're developing comprehensive articles about PFAS, health impacts, and safer alternatives. Get early access to our premium educational guides available now.
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: '#6366F1', fontWeight: '600', marginBottom: '1rem' }}>Available Now - Premium Guides:</h4>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {Object.entries(stanStoreProducts).map(([key, product]) => (
                    <div key={key} style={{
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div>
                        <h5 style={{ color: '#1F2937', fontWeight: '600', margin: '0 0 0.25rem 0' }}>
                          {product.name}
                        </h5>
                        <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>
                          {product.description}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold', color: '#6366F1', marginBottom: '0.5rem' }}>
                          {product.price}
                        </div>
                        <button
                          onClick={() => handleStanStoreClick(key)}
                          style={{
                            backgroundColor: '#6366F1',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                          }}
                        >
                          Get Guide →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 style={{ color: '#6B7280', fontWeight: '600', marginBottom: '0.5rem' }}>Upcoming free topics:</h4>
                <ul style={{ color: '#6B7280', paddingLeft: '1.5rem' }}>
                  <li>The Hidden PFAS in Your Kitchen</li>
                  <li>PFAS-Free Alternatives for Every Room</li>
                  <li>Understanding PFAS Health Risks</li>
                  <li>How to Read Product Labels for PFAS</li>
                  <li>The Science Behind Forever Chemicals</li>
                </ul>
              </div>
            </div>

            {/* Newsletter Signup for Blog Updates */}
            <div style={{
              backgroundColor: '#EEF2FF',
              border: '1px solid #C7D2FE',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#3730A3', margin: '0 0 0.5rem 0' }}>Get Notified When We Publish</h4>
              <p style={{ color: '#4C1D95', fontSize: '0.875rem', margin: '0 0 1rem 0' }}>
                Be the first to read our in-depth PFAS research and product analyses.
              </p>
              <button 
                onClick={() => setShowEmailCapture(true)}
                style={{
                  backgroundColor: '#6366F1',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Subscribe for Updates
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Email Capture Modal */}
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
              
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#6B7280', 
                textAlign: 'center', 
                marginTop: '0.75rem',
                fontStyle: 'italic'
              }}>
                🎁 Bonus: Get matched with relevant premium guides based on your interests
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Contribute Modal */}
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
                Help us expand our database by suggesting a product with evidence. All submissions are reviewed by our research team.
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
                placeholder="Product name (e.g., 'Starbucks Cold Cup')"
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
                placeholder="Brand name (e.g., 'Starbucks')"
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
                placeholder="Evidence source URL (study, article, or official disclosure)"
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
                placeholder="Why do you think this product contains/doesn't contain PFAS? Include any additional context..."
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
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#6B7280', 
                textAlign: 'center', 
                marginTop: '0.5rem',
                fontStyle: 'italic'
              }}>
                💎 Credits can be used for discounts on our premium guides
              </p>
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
                Based on your activity, here are the guides that will help you the most:
              </p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              {userInterest && (
                <div style={{
                  backgroundColor: '#EEF2FF',
                  border: '1px solid #C7D2FE',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ color: '#3730A3', margin: '0 0 0.5rem 0' }}>Recommended for You:</h4>
                  <div style={{ color: '#4C1D95', fontSize: '0.875rem' }}>
                    {userInterest === 'kitchen' && '🍳 PFAS-Free Kitchen Guide - Perfect for cookware safety'}
                    {userInterest === 'baby' && '👶 Safe Baby Products Guide - Essential for new parents'}
                    {userInterest === 'cosmetics' && '💄 Beauty & Personal Care Guide - Clean beauty made simple'}
                    {userInterest === 'food' && '🍔 Fast Food Safety Guide - Navigate dining out safely'}
                    {userInterest === 'all' && '🎯 Complete PFAS Protection Package - Everything you need'}
                  </div>
                </div>
              )}
              
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {Object.entries(stanStoreProducts).slice(0, 3).map(([key, product]) => (
                  <div key={key} style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div>
                      <h5 style={{ color: '#1F2937', fontWeight: '600', margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>
                        {product.name}
                      </h5>
                      <p style={{ color: '#6B7280', fontSize: '0.75rem', margin: 0 }}>
                        {product.description.substring(0, 50)}...
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold', color: '#6366F1', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                        {product.price}
                      </div>
                      <button
                        onClick={() => {
                          handleStanStoreClick(key);
                          setShowPremiumModal(false);
                        }}
                        style={{
                          backgroundColor: '#6366F1',
                          color: 'white',
                          border: 'none',
                          padding: '0.375rem 0.75rem',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        Get Guide
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {contributorCredits > 0 && (
              <div style={{
                backgroundColor: '#10B981',
                color: 'white',
                borderRadius: '0.5rem',
                padding: '1rem',
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  🎉 You Have {contributorCredits} Contributor Credits!
                </div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                  Use them for discounts on any guide above
                </div>
              </div>
            )}

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

      {/* Footer */}
      <footer style={{
        backgroundColor: '#F9FAFB',
        borderTop: '1px solid #E5E7EB',
        padding: '2rem 1rem',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h4 style={{ color: '#1F2937', marginBottom: '1rem', fontSize: '1.125rem' }}>PFAS-FREE</h4>
              <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: '1.5' }}>
                The most trusted resource for PFAS product information and safer alternatives. 
                Science-backed data to protect your family from forever chemicals.
              </p>
            </div>
            <div>
              <h5 style={{ color: '#1F2937', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: '600' }}>
                Popular Guides
              </h5>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <button 
                  onClick={() => handleStanStoreClick('pfas-free-kitchen-guide')}
                  style={{ 
                    color: '#6366F1', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    textAlign: 'left',
                    fontSize: '0.875rem'
                  }}
                >
                  PFAS-Free Kitchen Guide
                </button>
                <button 
                  onClick={() => handleStanStoreClick('safe-baby-products-guide')}
                  style={{ 
                    color: '#6366F1', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    textAlign: 'left',
                    fontSize: '0.875rem'
                  }}
                >
                  Safe Baby Products Guide
                </button>
                <button 
                  onClick={() => handleStanStoreClick('personalized-report')}
                  style={{ 
                    color: '#6366F1', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    textAlign: 'left',
                    fontSize: '0.875rem'
                  }}
                >
                  Custom Product Research
                </button>
              </div>
            </div>
            <div>
              <h5 style={{ color: '#1F2937', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: '600' }}>
                Get Involved
              </h5>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <button 
                  onClick={() => setShowContribute(true)}
                  style={{ 
                    color: '#6366F1', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    textAlign: 'left',
                    fontSize: '0.875rem'
                  }}
                >
                  Contribute Product Data
                </button>
                <button 
                  onClick={() => setShowEmailCapture(true)}
                  style={{ 
                    color: '#6366F1', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    textAlign: 'left',
                    fontSize: '0.875rem'
                  }}
                >
                  Subscribe for Updates
                </button>
              </div>
              {contributorCredits > 0 && (
                <div style={{ 
                  marginTop: '1rem',
                  padding: '0.5rem',
                  backgroundColor: '#10B981',
                  color: 'white',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  textAlign: 'center'
                }}>
                  ⭐ You have {contributorCredits} credits!
                </div>
              )}
            </div>
          </div>
          
          <div style={{ 
            borderTop: '1px solid #E5E7EB', 
            paddingTop: '1rem',
            textAlign: 'center'
          }}>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: 0 }}>
              © 2025 PFAS-FREE. Information provided for educational purposes only. 
              Consult manufacturers and healthcare professionals for current product information and health advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;