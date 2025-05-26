# PFAS ID-FY Database Structure

## Product Schema
```javascript
{
  id: 'unique-string',
  name: 'Product Name',
  brand: 'Brand Name',
  category: 'Food Packaging|Personal Care|Cookware|etc',
  barcode: '123456789',
  hasPfas: true/false,
  riskScore: 0-100,
  evidence: {
    source: 'EPA Report 2024',
    tested: true,
    details: 'Specific PFAS compounds found'
  },
  alternatives: [
    {
      name: 'Alternative Product',
      affiliateLink: 'https://amzn.to/...',
      price: '$20-30',
      effectiveness: 'Description'
    }
  ],
  searchTerms: ['array', 'of', 'search', 'terms'],
  dateAdded: 'timestamp',
  lastUpdated: 'timestamp'
}

# Firebase Collections Structure

/products
  - {productId}: Product document
  
/userScans
  - {userId}
    - /scans
      - {scanId}: { productId, timestamp, riskScore }
      
/contributions
  - {contributionId}: { 
      productName, 
      barcode, 
      userId, 
      status: 'pending|approved|rejected',
      timestamp 
    }
    
/users
  - {userId}: {
      email,
      isPremium,
      joinDate,
      totalScans
    }

## Search Implementation
- Use searchTerms array for efficient querying
- Include common misspellings
- Add brand variations