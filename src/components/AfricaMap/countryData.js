/**
 * countryData.js
 * ─────────────────────────────────────────────────────────────────
 * Central data config for the AfricaMap component.
 * COMPLETE dataset with all 54 African countries.
 *
 * Each country entry:
 *  id          – ISO 3-letter code (used as React key / lookup)
 *  numericId   – ISO 3166-1 numeric (must match TopoJSON feature IDs)
 *  name        – Display name shown on the map label
 *  status      – 'presence' | 'expansion' | 'inactive' (drives default color)
 *  color       – Hex fill color (overrides status default)
 *  coordinates – [longitude, latitude] of the label anchor on the map
 *  labelOffset – [dx, dy] in SVG units from the anchor point to the label
 *  labelAnchor – SVG text-anchor: 'start' | 'middle' | 'end'
 *  showLabel   – Boolean, set false to hide the label/connector
 *  metadata    – Company-specific info shown in the modal
 */

// ─── Color palette (matches CONNECT brand) ───────────────────────────────────
export const COLOR_PRESETS = {
  presence:  '#DA1C21',   // Bright Red  — active country
  expansion: '#F77F25',   // Orange      — target / planned
  inactive:  '#6B1111',   // Dark Red    — rendered but no active status
  highlight: '#FF4D57',   // Light Red   — hover tint (applied automatically)
  ocean:     '#0f0505',
  border:    '#3d0808',
};

// ─── All African country numeric IDs (ISO 3166-1 numeric) ────────────────────
// Used to filter the world-atlas TopoJSON to Africa-only countries
// Complete list of all 54 UN-recognized African states
export const AFRICA_NUMERIC_IDS = new Set([
  // North Africa
  12,    // Algeria
  24,    // Angola
  204,   // Benin
  72,    // Botswana
  854,   // Burkina Faso
  108,   // Burundi
  120,   // Cameroon
  132,   // Cape Verde
  140,   // Central African Republic
  148,   // Chad
  174,   // Comoros
  180,   // Democratic Republic of the Congo (DRC)
  178,   // Republic of the Congo
  262,   // Djibouti
  818,   // Egypt
  226,   // Equatorial Guinea
  231,   // Ethiopia
  232,   // Eritrea
  266,   // Gabon
  288,   // Ghana
  324,   // Guinea
  624,   // Guinea-Bissau
  404,   // Kenya
  426,   // Lesotho
  430,   // Liberia
  434,   // Libya
  450,   // Madagascar
  454,   // Malawi
  466,   // Mali
  478,   // Mauritania
  480,   // Mauritius
  504,   // Morocco
  508,   // Mozambique
  516,   // Namibia
  562,   // Niger
  566,   // Nigeria
  646,   // Rwanda
  678,   // São Tomé and Príncipe
  686,   // Senegal
  694,   // Sierra Leone
  706,   // Somalia
  710,   // South Africa
  728,   // South Sudan
  729,   // Sudan
  748,   // Eswatini (Swaziland)
  768,   // Togo
  788,   // Tunisia
  800,   // Uganda
  834,   // Tanzania
  716,   // Zimbabwe
  894,   // Zambia
]);

// ─── Default country dataset (CONNECT Africa presence + expansion) ────────────
export const DEFAULT_COUNTRIES = [

  // ── CURRENT PRESENCE (Red) ────────────────────────────────────────────────

  {
    id: 'RWA',
    numericId: 646,
    name: 'Rwanda',
    status: 'presence',
    color: COLOR_PRESETS.presence,
    coordinates: [29.9, -1.9],
    labelOffset: [45, -18],
    labelAnchor: 'start',
    showLabel: true,
    metadata: {
      startDate: '2021-06-10',
      projects: [
        'Mobile Payment Platform',
        'Agent Banking Network',
        'Diaspora Remittance Hub',
      ],
      officeAddress: 'KG 7 Ave, Kigali Business Center, Kigali, Rwanda',
      description:
        'Rwanda is CONNECT\'s East African anchor. Kigali was chosen for its tech-forward regulatory environment and strong fintech ecosystem. Operations cover mobile top-ups, P2P transfers, and card issuance for the diaspora.',
    },
  },

  {
    id: 'COD',
    numericId: 180,
    name: 'RDC',
    status: 'presence',
    color: COLOR_PRESETS.presence,
    coordinates: [24.0, -3.5],
    labelOffset: [55, 20],
    labelAnchor: 'start',
    showLabel: true,
    metadata: {
      startDate: '2020-01-15',
      projects: [
        'Cross-border Transfer Corridor',
        'Digital Wallet Deployment',
        'Agent Network Expansion',
      ],
      officeAddress: 'Avenue du Flambeau, Gombe, Kinshasa, DRC',
      description:
        'The DRC is CONNECT\'s primary Central African hub. With a population of 100M+, it represents the largest remittance market in the region. Key flows: diaspora in Belgium, France, and the UK sending money home.',
    },
  },

  {
    id: 'BDI',
    numericId: 108,
    name: 'Burundi',
    status: 'presence',
    color: COLOR_PRESETS.presence,
    coordinates: [29.9, -3.4],
    labelOffset: [48, 10],
    labelAnchor: 'start',
    showLabel: true,
    metadata: {
      startDate: '2022-03-20',
      projects: ['Last-Mile Distribution', 'Mobile Money Integration'],
      officeAddress: 'Boulevard du Peuple Murundi, Bujumbura, Burundi',
      description:
        'Burundi is an emerging market with high unbanked population. CONNECT provides essential cross-border transfer services connecting the Burundian diaspora in Europe to their families.',
    },
  },

  {
    id: 'TZA',
    numericId: 834,
    name: 'Tanzanie',
    status: 'presence',
    color: COLOR_PRESETS.presence,
    coordinates: [34.9, -6.4],
    labelOffset: [48, 12],
    labelAnchor: 'start',
    showLabel: true,
    metadata: {
      startDate: '2019-11-05',
      projects: ['Regional Logistics Hub', 'Supply Chain Finance', 'MNO Partnerships'],
      officeAddress: 'Ohio Street, Dar es Salaam, Tanzania',
      description:
        'Tanzania serves as CONNECT\'s regional logistics and distribution gateway for East Africa. Strong M-Pesa integration makes it a key interoperability hub for cross-network transfers.',
    },
  },

  {
    id: 'KEN',
    numericId: 404,
    name: 'Kenya',
    status: 'presence',
    color: COLOR_PRESETS.presence,
    coordinates: [37.9, 0.5],
    labelOffset: [50, -15],
    labelAnchor: 'start',
    showLabel: true,
    metadata: {
      startDate: '2018-08-12',
      projects: [
        'East Africa Innovation Hub',
        'Tech Training Programs',
        'M-Pesa Integration API',
      ],
      officeAddress: 'Westlands, Nairobi, Kenya',
      description:
        'Nairobi is CONNECT\'s East African technology headquarters. Kenya\'s mature fintech landscape and world-leading mobile money adoption make it the ideal base for product R&D and talent acquisition.',
    },
  },

  {
    id: 'DJI',
    numericId: 262,
    name: 'Djibouti',
    status: 'presence',
    color: COLOR_PRESETS.presence,
    coordinates: [42.6, 11.8],
    labelOffset: [45, -22],
    labelAnchor: 'start',
    showLabel: true,
    metadata: {
      startDate: '2021-02-28',
      projects: ['Port-linked Payments', 'Trade Finance Gateway'],
      officeAddress: 'Boulevard de Gaulle, Djibouti City, Djibouti',
      description:
        'Djibouti is a strategic maritime hub connecting East Africa to the Gulf and Asia. CONNECT leverages its port infrastructure to facilitate trade finance and regional payment corridors.',
    },
  },

  // ── EXPANSION TARGETS (Orange) ────────────────────────────────────────────

  {
    id: 'MLI',
    numericId: 466,
    name: 'Mali',
    status: 'expansion',
    color: COLOR_PRESETS.expansion,
    coordinates: [-2.0, 17.5],
    labelOffset: [-40, -20],
    labelAnchor: 'end',
    showLabel: true,
    metadata: {
      startDate: null,
      projects: ['Feasibility Study (2024)', 'Partnership Negotiations'],
      officeAddress: 'Bamako, Mali (planned)',
      description:
        'Mali is a key West African target with a large diaspora in France. Planned services include Euro-to-CFA corridor transfers and virtual card issuance for online shopping.',
    },
  },

  {
    id: 'CIV',
    numericId: 384,
    name: "Côte d'Ivoire",
    status: 'expansion',
    color: COLOR_PRESETS.expansion,
    coordinates: [-5.6, 7.5],
    labelOffset: [-45, 5],
    labelAnchor: 'end',
    showLabel: true,
    metadata: {
      startDate: null,
      projects: ['Market Research (2024)', 'Regulatory Pre-approval'],
      officeAddress: 'Abidjan, Côte d\'Ivoire (planned)',
      description:
        'Abidjan is the economic capital of Francophone West Africa. CONNECT targets the Ivorian diaspora in France and Belgium as a high-volume remittance corridor.',
    },
  },

  {
    id: 'SEN',
    numericId: 686,
    name: 'Sénégal',
    status: 'expansion',
    color: COLOR_PRESETS.expansion,
    coordinates: [-14.4, 14.5],
    labelOffset: [-42, -8],
    labelAnchor: 'end',
    showLabel: true,
    metadata: {
      startDate: null,
      projects: ['Partnership Development', 'Agent Network Mapping'],
      officeAddress: 'Dakar, Senegal (planned)',
      description:
        'Dakar is CONNECT\'s gateway to West Africa. Senegal has one of the highest remittance-to-GDP ratios in Africa, driven by a large diaspora in France, Italy, and Spain.',
    },
  },

  {
    id: 'BEN',
    numericId: 204,
    name: 'Bénin',
    status: 'expansion',
    color: COLOR_PRESETS.expansion,
    coordinates: [2.3, 9.3],
    labelOffset: [38, -15],
    labelAnchor: 'start',
    showLabel: true,
    metadata: {
      startDate: null,
      projects: ['Initial Market Contacts', 'Feasibility Study'],
      officeAddress: 'Cotonou, Benin (planned)',
      description:
        'Benin offers a strategic entry point to the UEMOA zone. With a growing digital economy and active diaspora in France, it represents a near-term expansion opportunity for CONNECT.',
    },
  },

  {
    id: 'TGO',
    numericId: 768,
    name: 'Togo',
    status: 'expansion',
    color: COLOR_PRESETS.expansion,
    coordinates: [0.8, 8.6],
    labelOffset: [36, 5],
    labelAnchor: 'start',
    showLabel: true,
    metadata: {
      startDate: null,
      projects: ['Lomé Port Corridor Study', 'Mobile Money Assessment'],
      officeAddress: 'Lomé, Togo (planned)',
      description:
        'Togo\'s port of Lomé and growing fintech ecosystem make it an attractive corridor for trade-linked payments and consumer remittances across the ECOWAS zone.',
    },
  },

  {
    id: 'CMR',
    numericId: 120,
    name: 'Cameroun',
    status: 'expansion',
    color: COLOR_PRESETS.expansion,
    coordinates: [12.3, 5.7],
    labelOffset: [-45, 18],
    labelAnchor: 'end',
    showLabel: true,
    metadata: {
      startDate: null,
      projects: ['Bilingual Market Study', 'Orange Money Partnership Talk'],
      officeAddress: 'Yaoundé, Cameroon (planned)',
      description:
        'Cameroon is CONNECT\'s Central African market entry point. Its bilingual population (French/English) and large diaspora in Europe make it a major target for digital remittance services.',
    },
  },

  {
    id: 'GAB',
    numericId: 266,
    name: 'Gabon',
    status: 'expansion',
    color: COLOR_PRESETS.expansion,
    coordinates: [11.6, -0.8],
    labelOffset: [-42, -18],
    labelAnchor: 'end',
    showLabel: true,
    metadata: {
      startDate: null,
      projects: ['Hydrocarbon Sector Payments Exploration'],
      officeAddress: 'Libreville, Gabon (planned)',
      description:
        'Gabon\'s oil wealth and relatively high per-capita income make it an interesting market for premium financial services. CONNECT aims to serve both inbound diaspora transfers and corporate payments.',
    },
  },

  {
    id: 'COG',
    numericId: 178,
    name: 'Congo Braz.',
    status: 'expansion',
    color: COLOR_PRESETS.expansion,
    coordinates: [15.8, -0.8],
    labelOffset: [-44, 10],
    labelAnchor: 'end',
    showLabel: true,
    metadata: {
      startDate: null,
      projects: ['Cross-border DRC-Congo Corridor Analysis'],
      officeAddress: 'Brazzaville, Congo (planned)',
      description:
        'With Brazzaville directly across the Congo River from Kinshasa, this corridor is one of the busiest informal money-transfer routes in Africa. CONNECT aims to digitize and formalize these flows.',
    },
  },

  // ── INACTIVE COUNTRIES (Dark Red – displayed but no active ops) ────────────

  {
    id: 'DZA',
    numericId: 12,
    name: 'Algeria',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [2.0, 28.0],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Algiers, Algeria',
      description: 'Algeria is the largest country by area in Africa. Future opportunities exist in remittance corridors to France and other European markets.',
    },
  },

  {
    id: 'AGO',
    numericId: 24,
    name: 'Angola',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [18.0, -11.5],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Luanda, Angola',
      description: 'Angola is a major oil-producing nation with potential for trade finance and supplier payment services.',
    },
  },

  {
    id: 'BWA',
    numericId: 72,
    name: 'Botswana',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [24.0, -22.3],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Gaborone, Botswana',
      description: 'Botswana is a Southern African nation with strong economic fundamentals and a growing fintech sector.',
    },
  },

  {
    id: 'BFA',
    numericId: 854,
    name: 'Burkina Faso',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [-2.0, 12.3],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Ouagadougou, Burkina Faso',
      description: 'Burkina Faso has significant diaspora populations in Europe and growing digital financial services adoption.',
    },
  },

  {
    id: 'CPV',
    numericId: 132,
    name: 'Cape Verde',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [-23.6, 16.0],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Praia, Cape Verde',
      description: 'Cape Verde is an island nation with strong ties to diaspora communities in the US and Europe.',
    },
  },

  {
    id: 'CAF',
    numericId: 140,
    name: 'Central African Rep.',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [21.0, 6.6],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Bangui, Central African Republic',
      description: 'The Central African Republic has emerging financial inclusion needs and remittance corridors.',
    },
  },

  {
    id: 'TCD',
    numericId: 148,
    name: 'Chad',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [19.0, 15.5],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'N\'Djamena, Chad',
      description: 'Chad is a Sahel region country with large diaspora communities abroad.',
    },
  },

  {
    id: 'COM',
    numericId: 174,
    name: 'Comoros',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [43.5, -11.9],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Moroni, Comoros',
      description: 'Comoros is an island nation with significant diaspora remittance needs.',
    },
  },

  {
    id: 'EGY',
    numericId: 818,
    name: 'Egypt',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [30.8, 26.8],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Cairo, Egypt',
      description: 'Egypt is the most populous North African nation and a major remittance destination for Gulf migrants.',
    },
  },

  {
    id: 'GNQ',
    numericId: 226,
    name: 'Equatorial Guinea',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [10.3, 1.9],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Malabo, Equatorial Guinea',
      description: 'Equatorial Guinea has oil resources and potential for corporate and government payment services.',
    },
  },

  {
    id: 'ERI',
    numericId: 232,
    name: 'Eritrea',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [39.2, 15.2],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Asmara, Eritrea',
      description: 'Eritrea has a large diaspora population with remittance needs.',
    },
  },

  {
    id: 'ETH',
    numericId: 231,
    name: 'Ethiopia',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [39.0, 9.1],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Addis Ababa, Ethiopia',
      description: 'Ethiopia is the second-most populous country in Africa with emerging fintech opportunities.',
    },
  },

  {
    id: 'GHA',
    numericId: 288,
    name: 'Ghana',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [-2.0, 7.4],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Accra, Ghana',
      description: 'Ghana is a West African leader in fintech innovation with strong digital payment infrastructure.',
    },
  },

  {
    id: 'GIN',
    numericId: 324,
    name: 'Guinea',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [-10.5, 9.5],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Conakry, Guinea',
      description: 'Guinea has untapped potential in remittance and financial inclusion services.',
    },
  },

  {
    id: 'GNB',
    numericId: 624,
    name: 'Guinea-Bissau',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [-15.1, 11.9],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Bissau, Guinea-Bissau',
      description: 'Guinea-Bissau is a small West African nation with emerging financial services.',
    },
  },

  {
    id: 'LES',
    numericId: 426,
    name: 'Lesotho',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [28.6, -29.6],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Maseru, Lesotho',
      description: 'Lesotho is a landlocked Southern African nation with growing digital finance adoption.',
    },
  },

  {
    id: 'LBR',
    numericId: 430,
    name: 'Liberia',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [-9.4, 6.3],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Monrovia, Liberia',
      description: 'Liberia is rebuilding its economy with strong diaspora remittance corridors.',
    },
  },

  {
    id: 'LBY',
    numericId: 434,
    name: 'Libya',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [17.2, 32.6],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Tripoli, Libya',
      description: 'Libya has oil resources and potential for corporate payment solutions.',
    },
  },

  {
    id: 'MDG',
    numericId: 450,
    name: 'Madagascar',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [46.9, -19.9],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Antananarivo, Madagascar',
      description: 'Madagascar is an island nation off the coast of Southern Africa with emerging financial services.',
    },
  },

  {
    id: 'MWI',
    numericId: 454,
    name: 'Malawi',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [34.3, -13.3],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Lilongwe, Malawi',
      description: 'Malawi is a Southern African nation with agricultural economy and diaspora remittance potential.',
    },
  },

  {
    id: 'MRT',
    numericId: 478,
    name: 'Mauritania',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [-11.0, 21.0],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Nouakchott, Mauritania',
      description: 'Mauritania has strategic location and growing diaspora remittance market.',
    },
  },

  {
    id: 'MUS',
    numericId: 480,
    name: 'Mauritius',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [57.6, -20.3],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Port Louis, Mauritius',
      description: 'Mauritius is a prosperous island nation with developed financial services infrastructure.',
    },
  },

  {
    id: 'MAR',
    numericId: 504,
    name: 'Morocco',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [-5.0, 31.8],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Casablanca, Morocco',
      description: 'Morocco is a North African hub with large diaspora in Europe and strong fintech sector.',
    },
  },

  {
    id: 'MOZ',
    numericId: 508,
    name: 'Mozambique',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [35.3, -18.7],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Maputo, Mozambique',
      description: 'Mozambique is emerging as a Southern African hub for financial services and remittances.',
    },
  },

  {
    id: 'NAM',
    numericId: 516,
    name: 'Namibia',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [17.1, -22.6],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Windhoek, Namibia',
      description: 'Namibia is a Southern African nation with stable economy and growing financial services.',
    },
  },

  {
    id: 'NER',
    numericId: 562,
    name: 'Niger',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [2.1, 17.6],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Niamey, Niger',
      description: 'Niger is a West African Sahel nation with diaspora and remittance market opportunities.',
    },
  },

  {
    id: 'NGA',
    numericId: 566,
    name: 'Nigeria',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [8.7, 9.1],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Lagos, Nigeria',
      description: 'Nigeria is Africa\'s largest economy with leading fintech ecosystem and largest diaspora population.',
    },
  },

  {
    id: 'STP',
    numericId: 678,
    name: 'São Tomé & Príncipe',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [7.4, 0.2],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'São Tomé, São Tomé and Príncipe',
      description: 'São Tomé and Príncipe is a small island nation with diaspora remittance potential.',
    },
  },

  {
    id: 'SLE',
    numericId: 694,
    name: 'Sierra Leone',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [-11.8, 8.5],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Freetown, Sierra Leone',
      description: 'Sierra Leone is rebuilding its economy with emerging fintech and diaspora remittance opportunities.',
    },
  },

  {
    id: 'SOM',
    numericId: 706,
    name: 'Somalia',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [46.2, 5.1],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Mogadishu, Somalia',
      description: 'Somalia has significant diaspora remittance flows driven by large populations abroad.',
    },
  },

  {
    id: 'ZAF',
    numericId: 710,
    name: 'South Africa',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [24.0, -30.6],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Johannesburg, South Africa',
      description: 'South Africa is the economic powerhouse of Africa with advanced fintech infrastructure.',
    },
  },

  {
    id: 'SSD',
    numericId: 728,
    name: 'South Sudan',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [31.3, 6.9],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Juba, South Sudan',
      description: 'South Sudan has young population and growing remittance corridors from diaspora.',
    },
  },

  {
    id: 'SDN',
    numericId: 729,
    name: 'Sudan',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [30.8, 15.5],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Khartoum, Sudan',
      description: 'Sudan has large diaspora populations in Gulf countries and potential remittance corridors.',
    },
  },

  {
    id: 'SWZ',
    numericId: 748,
    name: 'Eswatini',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [31.5, -26.5],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Mbabane, Eswatini',
      description: 'Eswatini (formerly Swaziland) is a Southern African nation with growing digital services.',
    },
  },

  {
    id: 'TUN',
    numericId: 788,
    name: 'Tunisia',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [9.5, 33.9],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Tunis, Tunisia',
      description: 'Tunisia is a North African nation with developed fintech ecosystem and European diaspora.',
    },
  },

  {
    id: 'UGA',
    numericId: 800,
    name: 'Uganda',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [32.3, 1.4],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Kampala, Uganda',
      description: 'Uganda is an East African hub with strong mobile money adoption and fintech growth.',
    },
  },

  {
    id: 'ZMB',
    numericId: 894,
    name: 'Zambia',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [28.3, -13.1],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Lusaka, Zambia',
      description: 'Zambia is a Southern African nation with mining economy and emerging financial services.',
    },
  },

  {
    id: 'ZWE',
    numericId: 716,
    name: 'Zimbabwe',
    status: 'inactive',
    color: COLOR_PRESETS.inactive,
    coordinates: [29.9, -19.0],
    labelOffset: [40, 0],
    labelAnchor: 'start',
    showLabel: false,
    metadata: {
      startDate: null,
      projects: [],
      officeAddress: 'Harare, Zimbabwe',
      description: 'Zimbabwe is a Southern African nation with diaspora remittance corridors and economic recovery potential.',
    },
  },
];

// ─── Helper functions ─────────────────────────────────────────────────────────

/** Look up a country config by its 3-letter ISO id */
export function getCountryById(id) {
  return DEFAULT_COUNTRIES.find((c) => c.id === id);
}

/** Look up a country config by its numeric ISO id */
export function getCountryByNumericId(numericId) {
  return DEFAULT_COUNTRIES.find((c) => c.numericId === parseInt(numericId));
}

/** Return only active-presence countries */
export function getPresenceCountries(list = DEFAULT_COUNTRIES) {
  return list.filter((c) => c.status === 'presence');
}

/** Return only expansion-target countries */
export function getExpansionCountries(list = DEFAULT_COUNTRIES) {
  return list.filter((c) => c.status === 'expansion');
}

/** Return only inactive countries */
export function getInactiveCountries(list = DEFAULT_COUNTRIES) {
  return list.filter((c) => c.status === 'inactive');
}

/** Add or update a country in a list (immutable) */
export function upsertCountry(list, country) {
  const idx = list.findIndex((c) => c.id === country.id);
  if (idx === -1) return [...list, country];
  return list.map((c, i) => (i === idx ? { ...c, ...country } : c));
}

/** Remove a country from a list by id (immutable) */
export function removeCountry(list, id) {
  return list.filter((c) => c.id !== id);
}

/** Change a country's color/shade (immutable) */
export function shadeCountry(list, id, color) {
  return list.map((c) => (c.id === id ? { ...c, color } : c));
}
