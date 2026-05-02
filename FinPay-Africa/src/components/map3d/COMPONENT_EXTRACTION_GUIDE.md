# 🎨 How to Extract & Use Africa Map Components in Your Homepage

This guide shows you how to take pieces of the 3D map and use them separately in your homepage.

---

## 🎯 EXTRACTABLE COMPONENTS

### 1. **3D Map Component** (Entire Map)
The full interactive 3D Africa map with all countries

### 2. **Country Modal Component** (Pop-up Info)
The info modal that shows when you click a country

### 3. **Country Legend Component** (Status Legend)
The legend showing presence/expansion/inactive countries

### 4. **Country Card Component** (Individual Country)
A single country card with metadata

### 5. **Stats Dashboard Component** (Overview)
Summary stats: 54 countries, 6 presence, 10 expansion, 38 inactive

---

## 📋 BEST APPROACH: Copy & Paste

All components are **self-contained**. You can:
1. Copy the component file
2. Paste into your homepage
3. Import where needed

No need to refactor or rewrite!

---

## 🗂️ COMPONENT BREAKDOWN

### Component 1: FULL 3D MAP
**File:** `AfricaMap3D.jsx`  
**Dependencies:** three, @react-three/fiber, @react-three/drei, topojson-client, countryData.js

**How to use:**
```jsx
import AfricaMap3D from './components/AfricaMap3D';
import { DEFAULT_COUNTRIES } from './data/countryData';

export default function Homepage() {
  return (
    <section className="map-section">
      <h2>CONNECT Presence in Africa</h2>
      <AfricaMap3D 
        defaultCountries={DEFAULT_COUNTRIES}
        mapHeight={700}
        showLegend={true}
        showLabels={true}
      />
    </section>
  );
}
```

**Customization:**
```jsx
// Make it smaller for a homepage section
<AfricaMap3D mapHeight={500} />

// Hide labels if space is tight
<AfricaMap3D showLabels={false} />

// Change background color
<AfricaMap3D backgroundColor="#ffffff" />

// Handle country clicks
<AfricaMap3D 
  onCountryClick={(country) => {
    console.log('Clicked:', country.name);
  }}
/>
```

**Installation (if needed):**
```bash
npm install three @react-three/fiber @react-three/drei topojson-client
```

---

### Component 2: COUNTRY MODAL (Pop-up)
**File:** `CountryModal.jsx`  
**Dependencies:** None (standalone)

**Use separately:**
```jsx
import CountryModal from './components/CountryModal';
import { getCountryById } from './data/countryData';

export default function CountryPage() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <>
      <button onClick={() => setSelectedCountry(getCountryById('RWA'))}>
        View Rwanda
      </button>
      
      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </>
  );
}
```

**What it shows:**
- Country name & flag
- Start date (if presence country)
- Projects list
- Office address
- Description

---

### Component 3: LEGEND
**Create this component:**

```jsx
// components/MapLegend.jsx
import React from 'react';
import { COLOR_PRESETS } from '../data/countryData';

export default function MapLegend() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '16px',
      background: '#f5f5f5',
      borderRadius: '8px',
      maxWidth: '200px'
    }}>
      <p style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: '600' }}>
        CONNECT Presence
      </p>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '16px',
          height: '16px',
          borderRadius: '3px',
          background: COLOR_PRESETS.presence
        }} />
        <span style={{ fontSize: '13px' }}>Active presence</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '16px',
          height: '16px',
          borderRadius: '3px',
          background: COLOR_PRESETS.expansion
        }} />
        <span style={{ fontSize: '13px' }}>Expansion target</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '16px',
          height: '16px',
          borderRadius: '3px',
          background: COLOR_PRESETS.inactive
        }} />
        <span style={{ fontSize: '13px' }}>Other African countries</span>
      </div>
    </div>
  );
}
```

**Use it:**
```jsx
import MapLegend from './components/MapLegend';

export default function Homepage() {
  return (
    <section style={{ display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <AfricaMap3D showLegend={false} />
      </div>
      <div>
        <MapLegend />
      </div>
    </section>
  );
}
```

---

### Component 4: COUNTRY CARD
**Create this component:**

```jsx
// components/CountryCard.jsx
import React from 'react';

export default function CountryCard({ country }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      background: '#fff',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }}>
      <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '600' }}>
        {country.name}
      </h3>
      
      <div style={{
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '500',
        background: country.color,
        color: '#fff',
        marginBottom: '12px'
      }}>
        {country.status === 'presence' ? 'Active' : 
         country.status === 'expansion' ? 'Planned' : 
         'Other'}
      </div>
      
      {country.metadata?.startDate && (
        <p style={{ margin: '8px 0', fontSize: '13px', color: '#666' }}>
          Since: {new Date(country.metadata.startDate).toLocaleDateString()}
        </p>
      )}
      
      {country.metadata?.projects && (
        <div style={{ margin: '12px 0' }}>
          <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: '500' }}>
            Projects:
          </p>
          <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '12px' }}>
            {country.metadata.projects.map((proj, idx) => (
              <li key={idx}>{proj}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

**Use it:**
```jsx
import CountryCard from './components/CountryCard';
import { getPresenceCountries } from './data/countryData';

export default function PresenceCountries() {
  const presenceCountries = getPresenceCountries();
  
  return (
    <section>
      <h2>CONNECT Active Presence</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px'
      }}>
        {presenceCountries.map(country => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>
    </section>
  );
}
```

---

### Component 5: STATS DASHBOARD
**Create this component:**

```jsx
// components/CountryStats.jsx
import React from 'react';
import { 
  DEFAULT_COUNTRIES, 
  getPresenceCountries,
  getExpansionCountries,
  getInactiveCountries 
} from '../data/countryData';

export default function CountryStats() {
  const total = DEFAULT_COUNTRIES.length;
  const presence = getPresenceCountries().length;
  const expansion = getExpansionCountries().length;
  const inactive = getInactiveCountries().length;
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: '12px',
      padding: '20px'
    }}>
      <StatCard
        label="Total Countries"
        value={total}
        color="#6B1111"
      />
      <StatCard
        label="Active Presence"
        value={presence}
        color="#DA1C21"
      />
      <StatCard
        label="Expansion Targets"
        value={expansion}
        color="#F77F25"
      />
      <StatCard
        label="Other African"
        value={inactive}
        color="#6B1111"
      />
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: '#f5f5f5',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{
        fontSize: '28px',
        fontWeight: '600',
        color: color,
        marginBottom: '8px'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#666'
      }}>
        {label}
      </div>
    </div>
  );
}
```

**Use it:**
```jsx
import CountryStats from './components/CountryStats';

export default function Homepage() {
  return (
    <section>
      <h2>CONNECT in Africa - Overview</h2>
      <CountryStats />
    </section>
  );
}
```

---

## 🔧 MULTIPLE COMPONENT COMBINATION

**Example: Complete homepage section with everything**

```jsx
import React, { useState } from 'react';
import AfricaMap3D from './components/AfricaMap3D';
import CountryStats from './components/CountryStats';
import MapLegend from './components/MapLegend';
import CountryModal from './components/CountryModal';
import { DEFAULT_COUNTRIES } from './data/countryData';

export default function ConnectAfricaSection() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        CONNECT's Presence Across Africa
      </h1>
      
      {/* Stats */}
      <CountryStats />
      
      {/* Map + Legend */}
      <div style={{ display: 'flex', gap: '30px', margin: '40px 0', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h2>Interactive Map</h2>
          <AfricaMap3D 
            defaultCountries={DEFAULT_COUNTRIES}
            mapHeight={600}
            onCountryClick={setSelectedCountry}
          />
        </div>
        <div style={{ width: '200px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Legend</h2>
          <MapLegend />
        </div>
      </div>
      
      {/* Modal */}
      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
      
      {/* Footer */}
      <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
        Click any country on the map to learn more about CONNECT's operations
      </p>
    </section>
  );
}
```

---

## 📁 FILE STRUCTURE

```
src/
├── components/
│   ├── AfricaMap3D.jsx          ← Copy as-is
│   ├── CountryModal.jsx         ← Copy as-is
│   ├── MapLegend.jsx            ← Create new
│   ├── CountryCard.jsx          ← Create new
│   ├── CountryStats.jsx         ← Create new
│   └── AfricaMap3D.module.css   ← Copy with AfricaMap3D.jsx
├── data/
│   └── countryData.js           ← Copy as-is
└── pages/
    └── homepage.jsx             ← Your homepage
```

---

## 🚀 STEP-BY-STEP INTEGRATION

### Step 1: Copy Files
```bash
# Copy to your project
cp countryData.js src/data/
cp AfricaMap3D.jsx src/components/
cp CountryModal.jsx src/components/
cp AfricaMap3D.module.css src/components/
```

### Step 2: Create New Components
Create `CountryStats.jsx`, `MapLegend.jsx`, `CountryCard.jsx` in `src/components/` using the code above.

### Step 3: Add Dependencies
```bash
npm install three @react-three/fiber @react-three/drei topojson-client
```

### Step 4: Import in Homepage
```jsx
import ConnectAfricaSection from './components/ConnectAfricaSection';

export default function Homepage() {
  return (
    <>
      <header>...</header>
      <ConnectAfricaSection />
      <footer>...</footer>
    </>
  );
}
```

---

## 🎨 CUSTOMIZATION EXAMPLES

### Make Map Smaller (Mobile-friendly)
```jsx
<AfricaMap3D 
  mapHeight={400}
  showLabels={false}
/>
```

### Only Show Presence Countries
```jsx
import { getPresenceCountries } from './data/countryData';

<AfricaMap3D 
  defaultCountries={getPresenceCountries()}
  showLegend={false}
/>
```

### Custom Colors
```jsx
// In countryData.js, modify COLOR_PRESETS
export const COLOR_PRESETS = {
  presence:  '#FF6B6B',   // Change red
  expansion: '#FFD93D',   // Change orange
  inactive:  '#C0C0C0',   // Change gray
  // ...
};
```

### Handle Country Clicks
```jsx
<AfricaMap3D
  onCountryClick={(country) => {
    // Open modal, navigate, etc.
    navigate(`/country/${country.id}`);
  }}
  onCountryHover={(country) => {
    // Show tooltip, highlight, etc.
    setHoveredCountry(country?.id);
  }}
/>
```

---

## ✅ CHECKLIST FOR HOMEPAGE INTEGRATION

- [ ] Copy all required files to your project
- [ ] Install dependencies: `npm install three @react-three/fiber @react-three/drei topojson-client`
- [ ] Create new components (Stats, Legend, Card)
- [ ] Import in homepage
- [ ] Test map loads and rotates
- [ ] Test country click/hover works
- [ ] Test modal opens
- [ ] Check responsive design
- [ ] Optimize map height for your layout

---

## 🐛 TROUBLESHOOTING

**Map is blank?**
- Check Network tab → TopoJSON must load from CDN
- Verify `countryData.js` is in correct path
- Check console for errors

**Components not rendering?**
- Verify React version compatibility
- Check all imports are correct
- Make sure CSS file (AfricaMap3D.module.css) is copied

**Slow performance?**
- Reduce `mapHeight` (smaller canvas = faster)
- Hide labels if not needed
- Use `getPresenceCountries()` to show fewer countries

**Missing data in modal?**
- Verify country has `metadata` field in `countryData.js`
- Check optional chaining: `country.metadata?.startDate`

---

## 📞 TIPS

1. **Use React.memo** to prevent unnecessary re-renders:
```jsx
const MemoizedMap = React.memo(AfricaMap3D);
```

2. **Lazy load the map** for better homepage performance:
```jsx
const AfricaMap3D = lazy(() => import('./components/AfricaMap3D'));

<Suspense fallback={<div>Loading map...</div>}>
  <AfricaMap3D />
</Suspense>
```

3. **Customize colors per country**:
```jsx
const customCountries = DEFAULT_COUNTRIES.map(c => 
  c.id === 'RWA' ? { ...c, color: '#FF0000' } : c
);

<AfricaMap3D defaultCountries={customCountries} />
```

4. **Export country data as JSON** for other uses:
```jsx
// API endpoint
app.get('/api/countries', (req, res) => {
  res.json(DEFAULT_COUNTRIES);
});
```

---

**Version**: 1.0  
**Last Updated**: April 11, 2026  
**Status**: ✅ Ready to use
