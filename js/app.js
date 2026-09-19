/* Smart Waste Management System - Core Application Script */

// Default Dataset - Coimbatore Smart City Collection Points
const DEFAULT_POINTS = [
  { id: 'BIN-CBE-001', name: 'Gandhipuram Bus Stand', area: 'Central Zone', lat: 11.0168, lng: 76.9558, fill: 92, wasteType: 'General Mixed', freq: 'Twice Daily', lastUpdated: '3 mins ago' },
  { id: 'BIN-CBE-002', name: 'RS Puram Light House', area: 'West Zone', lat: 11.0084, lng: 76.9515, fill: 85, wasteType: 'Recyclable Plastics', freq: 'Daily', lastUpdated: '8 mins ago' },
  { id: 'BIN-CBE-003', name: 'Saibaba Colony Junction', area: 'North Zone', lat: 11.0264, lng: 76.9427, fill: 55, wasteType: 'Organic Bio', freq: 'Daily', lastUpdated: '12 mins ago' },
  { id: 'BIN-CBE-004', name: 'Peelamedu Tech Park', area: 'East Zone', lat: 11.0287, lng: 77.0016, fill: 25, wasteType: 'E-Waste', freq: 'On-Demand', lastUpdated: '25 mins ago' },
  { id: 'BIN-CBE-005', name: 'Singanallur Lake Corner', area: 'East Zone', lat: 10.9995, lng: 77.0253, fill: 94, wasteType: 'General Mixed', freq: 'Twice Daily', lastUpdated: '1 min ago' },
  { id: 'BIN-CBE-006', name: 'Ukkadam Bus Terminal', area: 'South Zone', lat: 10.9904, lng: 76.9619, fill: 81, wasteType: 'Organic Bio', freq: 'Twice Daily', lastUpdated: '15 mins ago' },
  { id: 'BIN-CBE-007', name: 'Saravanampatti Circle', area: 'North Zone', lat: 11.0797, lng: 76.9997, fill: 40, wasteType: 'Recyclable Plastics', freq: 'Daily', lastUpdated: '40 mins ago' },
  { id: 'BIN-CBE-008', name: 'Vadavalli Commercial Hub', area: 'West Zone', lat: 11.0150, lng: 76.9020, fill: 68, wasteType: 'General Mixed', freq: 'Daily', lastUpdated: '19 mins ago' },
  { id: 'BIN-CBE-009', name: 'Town Hall Market', area: 'Central Zone', lat: 10.9972, lng: 76.9602, fill: 96, wasteType: 'Organic Bio', freq: 'Twice Daily', lastUpdated: 'Just now' },
  { id: 'BIN-CBE-010', name: 'Hope College Station', area: 'East Zone', lat: 11.0345, lng: 77.0123, fill: 30, wasteType: 'General Mixed', freq: 'Daily', lastUpdated: '50 mins ago' }
];

const DEFAULT_SCHEDULES = [
  { id: 'SCH-101', locId: 'BIN-CBE-009', locName: 'Town Hall Market', truck: 'Truck #101 - EcoCompactor 10T', driver: 'Rajesh Kumar (ID: D-882)', time: 'Today, 14:30', status: 'In Transit' },
  { id: 'SCH-102', locId: 'BIN-CBE-005', locName: 'Singanallur Lake Corner', truck: 'Truck #103 - Heavy Duty EV-20', driver: 'Suresh M. (ID: D-410)', time: 'Today, 15:15', status: 'Scheduled' },
  { id: 'SCH-103', locId: 'BIN-CBE-001', locName: 'Gandhipuram Bus Stand', truck: 'Truck #102 - Bio-Waste Express', driver: 'Ramesh K. (ID: D-109)', time: 'Today, 16:00', status: 'Scheduled' }
];

// Multilingual Translation Dictionary (EN, TA, HI, ES)
const TRANSLATIONS = {
  en: {
    live_status: 'IoT Sensors Live',
    role_admin: 'Admin',
    role_staff: 'Staff',
    role_driver: 'Driver',
    btn_refresh: 'Refresh',
    btn_sim_telemetry: 'Simulate Telemetry',

    menu_main: 'Main Menu',
    menu_management: 'Management',
    nav_dashboard: 'Dashboard',
    nav_points: 'Collection Points',
    nav_map: 'Interactive Map',
    nav_schedule: 'Collection Schedule',
    nav_analytics: 'Analytics & Reports',
    nav_alerts: 'Alerts Center',
    nav_add_point: 'Add Collection Point',
    nav_settings: 'System Settings',

    title_dashboard: 'Dashboard Overview',
    title_points: 'Waste Collection Points',
    title_map: 'Interactive Sector Map',
    title_schedule: 'Collection Dispatch Schedule',
    title_analytics: 'Analytics & Environmental Reports',
    title_alerts: 'System Alerts Center',
    title_settings: 'System Settings',

    how_it_works_title: 'How It Works — Smart City Waste Architecture',
    how_it_works_sub: 'Real-time IoT fill monitoring reduces fuel consumption by up to 35% and prevents overflow bin emergencies.',
    step1_title: '📡 Collect Waste Data',
    step1_desc: 'Ultrasonic IoT sensors emit bin fill level telemetry every 5 minutes directly to central servers.',
    step2_title: '📊 Analyze Fill Levels',
    step2_desc: 'Algorithmic engine computes bin capacities, priority weightings, and overflow time predictions.',
    step3_title: '🚨 Identify Urgent Bins',
    step3_desc: 'Bins over 80% (Almost Full) & 90% (High Priority) are immediately flagged for dispatch.',
    step4_title: '🚛 Send Vehicles',
    step4_desc: 'Smart compactor trucks are dispatched via optimized GPS route navigation to targeted points.',

    stat_total_points: 'Total Points',
    stat_active_network: 'Active IoT Network',
    stat_requires_coll: 'Requires Collection',
    stat_critical_sub: 'Critical (≥ 90% Full)',
    stat_almost_full: 'Almost Full',
    stat_warning_sub: 'Warning (80–89% Full)',
    stat_low_waste: 'Low Waste',
    stat_normal_sub: 'Normal (< 50% Full)',
    stat_total_collected: 'Total Collected',
    stat_month_tonnage: 'This Month Tonnage',

    status_critical: 'Collection Required',
    status_almost: 'Almost Full',
    status_medium: 'Medium',
    status_low: 'Low',
    priority_high: 'High Priority',
    priority_med: 'Medium Priority',
    priority_low: 'Low Priority'
  },
  ta: {
    live_status: 'IoT சென்சார்கள் நேரலை',
    role_admin: 'நிர்வாகி',
    role_staff: 'ஊழியர்',
    role_driver: 'ஓட்டுநர்',
    btn_refresh: 'புதுப்பி',
    btn_sim_telemetry: 'தொலைஅளவீடு உருவகப்படுத்து',

    menu_main: 'முதன்மை மெனு',
    menu_management: 'மேலாண்மை',
    nav_dashboard: 'டாஷ்போர்டு',
    nav_points: 'சேகரிப்பு புள்ளிகள்',
    nav_map: 'இன்டராக்டிவ் வரைபடம்',
    nav_schedule: 'சேகரிப்பு அட்டவணை',
    nav_analytics: 'பகுப்பாய்வு மற்றும் அறிக்கைகள்',
    nav_alerts: 'எச்சரிக்கை மையம்',
    nav_add_point: 'புள்ளியைச் சேர்',
    nav_settings: 'அமைப்புகள்',

    title_dashboard: 'டாஷ்போர்டு மேலோட்டம்',
    title_points: 'கழிவு சேகரிப்பு புள்ளிகள்',
    title_map: 'இன்டராக்டிவ் செக்டார் வரைபடம்',
    title_schedule: 'வாகன சேகரிப்பு அட்டவணை',
    title_analytics: 'பகுப்பாய்வு மற்றும் அறிக்கைகள்',
    title_alerts: 'சிஸ்டம் எச்சரிக்கை மையம்',
    title_settings: 'சிஸ்டம் அமைப்புகள்',

    how_it_works_title: 'இது எவ்வாறு இயங்குகிறது — ஸ்மார்ட் சிட்டி கழிவு கட்டமைப்பு',
    how_it_works_sub: 'நேரலை IoT கண்காணிப்பு எரிபொருள் பயன்பாட்டை 35% வரை குறைக்கிறது மற்றும் தொட்டி நிரம்புவதைத் தடுக்கிறது.',
    step1_title: '📡 கழிவுத் தரவைச் சேகரி',
    step1_desc: 'அல்ட்ராசோனிக் IoT சென்சார்கள் 5 நிமிடங்களுக்கு ஒருமுறை மத்திய சேவையகத்திற்கு தரவை அனுப்புகின்றன.',
    step2_title: '📊 நிரப்பு நிலைகளை பகுப்பாய்வு செய்',
    step2_desc: 'அல்காரிதம் தொட்டி கொள்ளளவு மற்றும் முன்னுரிமை கணிப்புகளை கணக்கிடுகிறது.',
    step3_title: '🚨 அவசர தொட்டிகளைக் கண்டறி',
    step3_desc: '80% மற்றும் 90% க்கு மேல் உள்ள தொட்டிகள் உடனடியாகக் குறிக்கப்படுகின்றன.',
    step4_title: '🚛 வாகனங்களை அனுப்பு',
    step4_desc: 'ஸ்மார்ட் காம்பாக்டர் லாரிகள் வழிகாட்டல் வழித்தடங்கள் மூலம் அனுப்பப்படுகின்றன.',

    stat_total_points: 'மொத்த புள்ளிகள்',
    stat_active_network: 'செயலில் உள்ள நெட்வொர்க்',
    stat_requires_coll: 'சேகரிப்பு தேவைப்படுகிறது',
    stat_critical_sub: 'அவசரம் (≥ 90% நிரம்பியது)',
    stat_almost_full: 'கிட்டத்தட்ட நிரம்பியது',
    stat_warning_sub: 'எச்சரிக்கை (80–89% நிரம்பியது)',
    stat_low_waste: 'குறைந்த கழிவு',
    stat_normal_sub: 'சாதாரணமானது (< 50% நிரம்பியது)',
    stat_total_collected: 'மொத்தம் சேகரிக்கப்பட்டது',
    stat_month_tonnage: 'இந்த மாத எடைக் அளவு',

    status_critical: 'சேகரிப்பு தேவை',
    status_almost: 'கிட்டத்தட்ட நிரம்பியது',
    status_medium: 'நடுத்தரமானது',
    status_low: 'குறைவானது',
    priority_high: 'உயர் முன்னுரிமை',
    priority_med: 'நடுத்தர முன்னுரிமை',
    priority_low: 'குறைந்த முன்னுரிமை'
  },
  hi: {
    live_status: 'IoT सेंसर लाइव',
    role_admin: 'एडमिन',
    role_staff: 'कर्मचारी',
    role_driver: 'ड्राइवर',
    btn_refresh: 'रीफ्रेश',
    btn_sim_telemetry: 'टेलीमेट्री अनुकरण',

    menu_main: 'मुख्य मेनू',
    menu_management: 'प्रबंधन',
    nav_dashboard: 'डैशबोर्ड',
    nav_points: 'संग्रह बिंदु',
    nav_map: 'इंटरएक्टिव नक्शा',
    nav_schedule: 'संग्रह अनुसूची',
    nav_analytics: 'विश्लेषण और रिपोर्ट',
    nav_alerts: 'अलर्ट केंद्र',
    nav_add_point: 'बिंदु जोड़ें',
    nav_settings: 'सेटिंग्स',

    title_dashboard: 'डैशबोर्ड अवलोकन',
    title_points: 'कचरा संग्रह बिंदु',
    title_map: 'इंटरएक्टिव सेक्टर मानचित्र',
    title_schedule: 'वाहन प्रेषण अनुसूची',
    title_analytics: 'विश्लेषण और पर्यावरण रिपोर्ट',
    title_alerts: 'सिस्टम अलर्ट केंद्र',
    title_settings: 'सिस्टम सेटिंग्स',

    how_it_works_title: 'यह कैसे काम करता है — स्मार्ट सिटी कचरा वास्तुकला',
    how_it_works_sub: 'रियल-टाइम IoT निगरानी ईंधन की खपत को 35% तक कम करती है और कचरा ओवरफ्लो रोकती है।',
    step1_title: '📡 कचरा डेटा एकत्र करें',
    step1_desc: 'अल्ट्रासोनिक IoT सेंसर हर 5 मिनट में सर्वर को बिन स्तर भेजते हैं।',
    step2_title: '📊 भराव स्तर का विश्लेषण करें',
    step2_desc: 'एल्गोरिदम बिन क्षमता और प्राथमिकता भविष्यवाणियों की गणना करता है।',
    step3_title: '🚨 आवश्यक डिब्बे पहचानें',
    step3_desc: '80% और 90% से अधिक भरे हुए डिब्बे तुरंत चिह्नित किए जाते हैं।',
    step4_title: '🚛 वाहन भेजें',
    step4_desc: 'स्मार्ट कचरा गाड़ियाँ जीपीएस नेविगेशन द्वारा भेजी जाती हैं।',

    stat_total_points: 'कुल बिंदु',
    stat_active_network: 'सक्रिय नेटवर्क',
    stat_requires_coll: 'संग्रह आवश्यक',
    stat_critical_sub: 'गंभीर (≥ 90% भरा)',
    stat_almost_full: 'लगभग भरा हुआ',
    stat_warning_sub: 'चेतावनी (80–89% भरा)',
    stat_low_waste: 'कम कचरा',
    stat_normal_sub: 'सामान्य (< 50% भरा)',
    stat_total_collected: 'कुल एकत्र किया गया',
    stat_month_tonnage: 'इस महीने की मात्रा',

    status_critical: 'संग्रह आवश्यक',
    status_almost: 'लगभग भरा हुआ',
    status_medium: 'मध्यम',
    status_low: 'कम',
    priority_high: 'उच्च प्राथमिकता',
    priority_med: 'मध्यम प्राथमिकता',
    priority_low: 'कम प्राथमिकता'
  },
  es: {
    live_status: 'Sensores IoT en vivo',
    role_admin: 'Admin',
    role_staff: 'Personal',
    role_driver: 'Conductor',
    btn_refresh: 'Actualizar',
    btn_sim_telemetry: 'Simular Telemetría',

    menu_main: 'Menú Principal',
    menu_management: 'Gestión',
    nav_dashboard: 'Panel',
    nav_points: 'Puntos de Recolección',
    nav_map: 'Mapa Interactivo',
    nav_schedule: 'Calendario de Recolección',
    nav_analytics: 'Análisis y Reportes',
    nav_alerts: 'Centro de Alertas',
    nav_add_point: 'Agregar Punto',
    nav_settings: 'Configuración',

    title_dashboard: 'Visión General del Panel',
    title_points: 'Puntos de Recolección de Residuos',
    title_map: 'Mapa Interactivo del Sector',
    title_schedule: 'Calendario de Despacho de Vehículos',
    title_analytics: 'Análisis y Reportes Ambientales',
    title_alerts: 'Centro de Alertas del Sistema',
    title_settings: 'Configuración del Sistema',

    how_it_works_title: 'Cómo Funciona — Arquitectura de Residuos de Ciudad Inteligente',
    how_it_works_sub: 'El monitoreo IoT en tiempo real reduce el consumo de combustible hasta un 35% y previene desbordamientos.',
    step1_title: '📡 Recolectar Datos',
    step1_desc: 'Sensores IoT ultrasónicos emiten telemetría de llenado cada 5 minutos a los servidores centrales.',
    step2_title: '📊 Analizar Niveles',
    step2_desc: 'El motor algorítmico calcula capacidades y predicciones de tiempo de desbordamiento.',
    step3_title: '🚨 Identificar Úrgentes',
    step3_desc: 'Los contenedores a más del 80% y 90% se marcan inmediatamente para despacho.',
    step4_title: '🚛 Enviar Vehículos',
    step4_desc: 'Los camiones compactadores se despachan mediante rutas GPS optimizadas.',

    stat_total_points: 'Puntos Totales',
    stat_active_network: 'Red IoT Activa',
    stat_requires_coll: 'Requiere Recolección',
    stat_critical_sub: 'Crítico (≥ 90% Lleno)',
    stat_almost_full: 'Casi Lleno',
    stat_warning_sub: 'Advertencia (80–89% Lleno)',
    stat_low_waste: 'Residuos Bajos',
    stat_normal_sub: 'Normal (< 50% Lleno)',
    stat_total_collected: 'Total Recolectado',
    stat_month_tonnage: 'Tonelaje de Este Mes',

    status_critical: 'Recolección Requerida',
    status_almost: 'Casi Lleno',
    status_medium: 'Medio',
    status_low: 'Bajo',
    priority_high: 'Alta Prioridad',
    priority_med: 'Prioridad Media',
    priority_low: 'Prioridad Baja'
  }
};

// App State Manager
class WasteManagementApp {
  constructor() {
    this.points = JSON.parse(localStorage.getItem('eco_waste_points')) || DEFAULT_POINTS;
    this.schedules = JSON.parse(localStorage.getItem('eco_waste_schedules')) || DEFAULT_SCHEDULES;
    this.alerts = [];
    this.currentRole = 'admin';
    this.currentLang = localStorage.getItem('eco_language') || 'en';
    this.totalCollectedTons = parseFloat(localStorage.getItem('eco_total_collected') || '18.4');
    
    this.map = null;
    this.mapMarkers = [];
    this.charts = {};

    this.init();
  }

  init() {
    this.calculateSmartStatuses();
    this.generateAlerts();
    this.bindEvents();
    this.renderAllViews();
    this.initMap();
    this.initCharts();
    this.setLanguage(this.currentLang, false);
    
    // Auto tick simulation every 15s for dynamic dashboard feel
    setInterval(() => this.simulateSensors(false), 15000);
  }

  // ================= SMART STATUS LOGIC =================
  calculateSmartStatuses() {
    const lang = this.currentLang || 'en';
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

    this.points.forEach(pt => {
      const fill = pt.fill;
      if (fill >= 90) {
        pt.statusKey = 'CRITICAL';
        pt.statusLabel = t.status_critical;
        pt.statusClass = 'critical';
        pt.statusIcon = '🔴';
        pt.priorityKey = 'HIGH';
        pt.priorityLabel = t.priority_high;
        pt.priorityClass = 'high';
      } else if (fill >= 80) {
        pt.statusKey = 'ALMOST';
        pt.statusLabel = t.status_almost;
        pt.statusClass = 'almost';
        pt.statusIcon = '🟠';
        pt.priorityKey = 'MED';
        pt.priorityLabel = t.priority_med;
        pt.priorityClass = 'med';
      } else if (fill >= 50) {
        pt.statusKey = 'MEDIUM';
        pt.statusLabel = t.status_medium;
        pt.statusClass = 'medium';
        pt.statusIcon = '🟡';
        pt.priorityKey = 'LOW';
        pt.priorityLabel = t.priority_low;
        pt.priorityClass = 'low-p';
      } else {
        pt.statusKey = 'LOW';
        pt.statusLabel = t.status_low;
        pt.statusClass = 'low';
        pt.statusIcon = '🟢';
        pt.priorityKey = 'LOW';
        pt.priorityLabel = t.priority_low;
        pt.priorityClass = 'low-p';
      }
    });
    this.saveState();
  }

  setLanguage(lang, notify = true) {
    if (!TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('eco_language', lang);

    const t = TRANSLATIONS[lang];

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // Update language select dropdown value if needed
    const select = document.getElementById('lang-select');
    if (select && select.value !== lang) {
      select.value = lang;
    }

    // Recalculate status labels with new language
    this.calculateSmartStatuses();
    this.renderAllViews();
    this.updateMapMarkers();

    // Update current active page title
    const activeView = document.querySelector('.view-page.active')?.id || 'dashboard-view';
    const titleKeys = {
      'dashboard-view': 'title_dashboard',
      'points-view': 'title_points',
      'map-view': 'title_map',
      'schedule-view': 'title_schedule',
      'analytics-view': 'title_analytics',
      'alerts-view': 'title_alerts',
      'settings-view': 'title_settings'
    };
    if (titleKeys[activeView] && t[titleKeys[activeView]]) {
      document.getElementById('page-title').textContent = t[titleKeys[activeView]];
    }

    if (notify) {
      const langNames = { en: 'English', ta: 'தமிழ் (Tamil)', hi: 'हिंदी (Hindi)', es: 'Español (Spanish)' };
      this.showToast(`🌐 Language set to: ${langNames[lang] || lang}`, 'info');
    }
  }

  saveState() {
    localStorage.setItem('eco_waste_points', JSON.stringify(this.points));
    localStorage.setItem('eco_waste_schedules', JSON.stringify(this.schedules));
    localStorage.setItem('eco_total_collected', this.totalCollectedTons.toString());
  }

  // ================= ALERT GENERATOR =================
  generateAlerts() {
    this.alerts = [];
    this.points.forEach(pt => {
      if (pt.fill >= 90) {
        this.alerts.push({
          id: 'ALT-' + pt.id,
          type: 'critical',
          icon: 'fa-solid fa-triangle-exclamation',
          msg: `⚠ ${pt.name} collection point is ${pt.fill}% full. Collection required immediately!`,
          time: pt.lastUpdated,
          locId: pt.id
        });
      } else if (pt.fill >= 80) {
        this.alerts.push({
          id: 'ALT-' + pt.id,
          type: 'warning',
          icon: 'fa-solid fa-clock-rotate-left',
          msg: `⚠ ${pt.name} collection point is ${pt.fill}% full. Schedule collection soon.`,
          time: pt.lastUpdated,
          locId: pt.id
        });
      }
    });
  }

  // ================= EVENT BINDINGS =================
  bindEvents() {
    // Language Switcher
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => this.setLanguage(e.target.value, true));
    }

    // Navigation Tabs
    document.querySelectorAll('.nav-link[data-view]').forEach(link => {
      link.addEventListener('click', (e) => {
        const viewId = link.getAttribute('data-view');
        this.switchView(viewId, link);
      });
    });

    // Mobile Toggle
    document.getElementById('mobile-toggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('mobile-open');
    });

    // Role Switcher
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentRole = btn.getAttribute('data-role');
        this.updateRoleView();
      });
    });

    // Quick Action Buttons
    document.getElementById('btn-refresh-data').addEventListener('click', () => {
      this.calculateSmartStatuses();
      this.generateAlerts();
      this.renderAllViews();
      this.showToast('Live IoT telemetry data refreshed!', 'info');
    });

    document.getElementById('btn-sim-tick').addEventListener('click', () => {
      this.simulateSensors(true);
    });

    // View All Buttons
    document.getElementById('btn-view-all-points').addEventListener('click', () => {
      this.switchView('points-view', document.querySelector('.nav-link[data-view="points-view"]'));
    });

    document.getElementById('btn-view-alerts').addEventListener('click', () => {
      this.switchView('alerts-view', document.querySelector('.nav-link[data-view="alerts-view"]'));
    });

    // Modals
    const addModal = document.getElementById('modal-add-point');
    const updateModal = document.getElementById('modal-update-fill');

    document.getElementById('open-add-modal-nav').addEventListener('click', () => addModal.classList.add('active'));
    document.getElementById('btn-open-add-modal').addEventListener('click', () => addModal.classList.add('active'));
    document.getElementById('close-add-modal').addEventListener('click', () => addModal.classList.remove('active'));
    document.getElementById('btn-cancel-add').addEventListener('click', () => addModal.classList.remove('active'));

    document.getElementById('close-update-modal').addEventListener('click', () => updateModal.classList.remove('active'));
    document.getElementById('btn-cancel-update').addEventListener('click', () => updateModal.classList.remove('active'));

    // Forms
    document.getElementById('form-add-point').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddPoint();
    });

    document.getElementById('schedule-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleScheduleSubmit();
    });

    // Filter Controls
    document.getElementById('search-points').addEventListener('input', () => this.renderPointsTable());
    document.getElementById('filter-status').addEventListener('change', () => this.renderPointsTable());

    // Update Slider Quick Presets
    const slider = document.getElementById('fill-range-slider');
    const sliderVal = document.getElementById('fill-slider-val');
    slider.addEventListener('input', (e) => {
      sliderVal.textContent = e.target.value + '%';
    });

    document.getElementById('btn-set-0').addEventListener('click', () => { slider.value = 0; sliderVal.textContent = '0%'; });
    document.getElementById('btn-set-85').addEventListener('click', () => { slider.value = 85; sliderVal.textContent = '85%'; });
    document.getElementById('btn-set-95').addEventListener('click', () => { slider.value = 95; sliderVal.textContent = '95%'; });

    document.getElementById('btn-save-fill-update').addEventListener('click', () => this.handleSaveFillUpdate());

    // Reset Demo Data
    document.getElementById('btn-reset-demo-data').addEventListener('click', () => {
      if (confirm('Reset system data to initial demo state?')) {
        localStorage.removeItem('eco_waste_points');
        localStorage.removeItem('eco_waste_schedules');
        localStorage.removeItem('eco_total_collected');
        this.points = [...DEFAULT_POINTS];
        this.schedules = [...DEFAULT_SCHEDULES];
        this.totalCollectedTons = 18.4;
        this.calculateSmartStatuses();
        this.generateAlerts();
        this.renderAllViews();
        this.updateMapMarkers();
        this.updateCharts();
        this.showToast('Demo dataset reset successfully!', 'success');
      }
    });

    // Clear Alerts
    document.getElementById('btn-clear-alerts').addEventListener('click', () => {
      this.alerts = [];
      this.renderAlertsView();
      this.showToast('Alerts cleared.', 'info');
    });
  }

  // ================= VIEW SWITCHER =================
  switchView(viewId, activeNavElement) {
    document.querySelectorAll('.view-page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));

    const targetPage = document.getElementById(viewId);
    if (targetPage) {
      targetPage.classList.add('active');
    }
    if (activeNavElement) {
      activeNavElement.classList.add('active');
    }

    // Update header title based on current language
    const lang = this.currentLang || 'en';
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const titleKeys = {
      'dashboard-view': 'title_dashboard',
      'points-view': 'title_points',
      'map-view': 'title_map',
      'schedule-view': 'title_schedule',
      'analytics-view': 'title_analytics',
      'alerts-view': 'title_alerts',
      'settings-view': 'title_settings'
    };
    document.getElementById('page-title').textContent = t[titleKeys[viewId]] || 'Smart Waste Management';

    // Resize leafet map if switching to map view
    if (viewId === 'map-view' && this.map) {
      setTimeout(() => this.map.invalidateSize(), 200);
    }

    // Close mobile sidebar if open
    document.getElementById('sidebar').classList.remove('mobile-open');
  }

  updateRoleView() {
    const avatar = document.getElementById('user-avatar');
    const name = document.getElementById('user-display-name');
    const role = document.getElementById('user-display-role');

    if (this.currentRole === 'admin') {
      avatar.textContent = 'AD';
      name.textContent = 'Admin Officer';
      role.textContent = 'Municipal Authority';
    } else if (this.currentRole === 'staff') {
      avatar.textContent = 'ST';
      name.textContent = 'Kavitha R.';
      role.textContent = 'Sanitation Staff';
    } else {
      avatar.textContent = 'DR';
      name.textContent = 'Rajesh Kumar';
      role.textContent = 'Compactor Truck Driver';
    }

    this.showToast(`Switched view role to: ${name.textContent}`, 'info');
  }

  // ================= TELEMETRY SIMULATOR =================
  simulateSensors(manualTrigger) {
    // Pick 2 random points and increase fill level by 3-9%
    const p1 = this.points[Math.floor(Math.random() * this.points.length)];
    const p2 = this.points[Math.floor(Math.random() * this.points.length)];

    [p1, p2].forEach(p => {
      if (p.fill < 98) {
        p.fill = Math.min(100, p.fill + Math.floor(Math.random() * 7) + 2);
        p.lastUpdated = 'Just now';
      }
    });

    this.calculateSmartStatuses();
    this.generateAlerts();
    this.renderAllViews();
    this.updateMapMarkers();
    this.updateCharts();

    if (manualTrigger) {
      this.showToast('⚡ Simulated live IoT fill sensor updates!', 'success');
    }
  }

  // ================= RENDER ALL VIEWS =================
  renderAllViews() {
    this.renderStatCards();
    this.renderPriorityTable();
    this.renderDashboardAlerts();
    this.renderPointsTable();
    this.renderScheduleDropdown();
    this.renderScheduleTable();
    this.renderAlertsView();
  }

  // 1. STAT CARDS
  renderStatCards() {
    const total = this.points.length;
    const required = this.points.filter(p => p.fill >= 90).length;
    const almost = this.points.filter(p => p.fill >= 80 && p.fill < 90).length;
    const low = this.points.filter(p => p.fill < 50).length;

    document.getElementById('stat-total-points').textContent = total;
    document.getElementById('stat-required-bins').textContent = required;
    document.getElementById('stat-almost-bins').textContent = almost;
    document.getElementById('stat-low-bins').textContent = low;
    document.getElementById('stat-total-collected').textContent = `${this.totalCollectedTons.toFixed(1)} Tons`;

    // Sidebar badge count
    const totalUrgent = required + almost;
    const badge = document.getElementById('sidebar-alert-badge');
    badge.textContent = totalUrgent;
    badge.style.display = totalUrgent > 0 ? 'inline-block' : 'none';
  }

  // 2. PRIORITY TABLE (Dashboard)
  renderPriorityTable() {
    const tbody = document.getElementById('priority-table-body');
    tbody.innerHTML = '';

    // Filter bins >= 80% sorted by fill level descending
    const highPriorityBins = [...this.points]
      .filter(p => p.fill >= 80)
      .sort((a, b) => b.fill - a.fill);

    if (highPriorityBins.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted);">🎉 All collection points are currently below 80% fill capacity!</td></tr>`;
      return;
    }

    highPriorityBins.forEach(pt => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="location-cell">
            <span class="loc-name">${pt.name}</span>
            <span class="loc-id">${pt.id}</span>
          </div>
        </td>
        <td>${pt.area}</td>
        <td>
          <div class="fill-progress-wrap">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill ${pt.statusClass}" style="width: ${pt.fill}%;"></div>
            </div>
            <span class="fill-percent-text">${pt.fill}%</span>
          </div>
        </td>
        <td><span class="status-pill ${pt.statusClass}">${pt.statusIcon} ${pt.statusLabel}</span></td>
        <td><span class="priority-pill ${pt.priorityClass}">${pt.priorityLabel}</span></td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-primary btn-sm" onclick="app.quickScheduleDispatch('${pt.id}')">
              <i class="fa-solid fa-truck"></i> Schedule
            </button>
            <button class="btn btn-outline btn-sm" onclick="app.openUpdateModal('${pt.id}')">
              <i class="fa-solid fa-sliders"></i> Adjust
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // 3. DASHBOARD ALERTS WIDGET
  renderDashboardAlerts() {
    const container = document.getElementById('dashboard-alerts-list');
    container.innerHTML = '';

    if (this.alerts.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 16px;">No critical alerts reported.</div>`;
      return;
    }

    this.alerts.slice(0, 4).forEach(alt => {
      const div = document.createElement('div');
      div.className = `alert-item ${alt.type}`;
      div.innerHTML = `
        <div class="alert-icon"><i class="${alt.icon}" style="color: ${alt.type === 'critical' ? 'var(--status-critical)' : 'var(--status-full)'}"></i></div>
        <div class="alert-content">
          <div class="alert-msg">${alt.msg}</div>
          <div class="alert-time">Sensor reported: ${alt.time}</div>
        </div>
      `;
      container.appendChild(div);
    });
  }

  // 4. POINTS TABLE PAGE
  renderPointsTable() {
    const tbody = document.getElementById('all-points-table-body');
    tbody.innerHTML = '';

    const searchTerm = document.getElementById('search-points').value.toLowerCase();
    const statusFilter = document.getElementById('filter-status').value;

    const filtered = this.points.filter(pt => {
      const matchesSearch = pt.name.toLowerCase().includes(searchTerm) || pt.id.toLowerCase().includes(searchTerm) || pt.area.toLowerCase().includes(searchTerm);
      const matchesStatus = statusFilter === 'ALL' || pt.statusKey === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 24px; color: var(--text-muted);">No collection points matched filter criteria.</td></tr>`;
      return;
    }

    filtered.forEach(pt => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="loc-name">${pt.name}</span></td>
        <td><span class="loc-id">${pt.id}</span></td>
        <td>${pt.area}</td>
        <td>
          <div class="fill-progress-wrap">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill ${pt.statusClass}" style="width: ${pt.fill}%;"></div>
            </div>
            <span class="fill-percent-text">${pt.fill}%</span>
          </div>
        </td>
        <td><span class="status-pill ${pt.statusClass}">${pt.statusIcon} ${pt.statusLabel}</span></td>
        <td><span class="priority-pill ${pt.priorityClass}">${pt.priorityLabel}</span></td>
        <td><span style="font-size: 11px; color: var(--text-muted);">${pt.lastUpdated}</span></td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-outline btn-sm" onclick="app.openUpdateModal('${pt.id}')">
              <i class="fa-solid fa-sliders"></i> Edit
            </button>
            <button class="btn btn-danger btn-sm" onclick="app.emptyBin('${pt.id}')" title="Mark Bin as Emptied">
              <i class="fa-solid fa-broom"></i> Empty
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // 5. SCHEDULE DISPATCHER & TABLE
  renderScheduleDropdown() {
    const select = document.getElementById('schedule-location');
    select.innerHTML = '';

    // Sort high fill points first
    const sorted = [...this.points].sort((a, b) => b.fill - a.fill);
    sorted.forEach(pt => {
      const opt = document.createElement('option');
      opt.value = pt.id;
      opt.textContent = `${pt.name} (${pt.fill}% ${pt.statusIcon})`;
      select.appendChild(opt);
    });
  }

  renderScheduleTable() {
    const tbody = document.getElementById('schedule-table-body');
    tbody.innerHTML = '';

    if (this.schedules.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 24px; color: var(--text-muted);">No active collection schedules.</td></tr>`;
      return;
    }

    this.schedules.forEach(sch => {
      const tr = document.createElement('tr');
      const isCompleted = sch.status === 'Completed';

      tr.innerHTML = `
        <td><span class="loc-name">${sch.locName}</span></td>
        <td>
          <div style="font-size: 12px; font-weight: 600;">${sch.truck}</div>
          <div style="font-size: 11px; color: var(--text-muted);">${sch.driver}</div>
        </td>
        <td><span style="font-size: 12px;">${sch.time}</span></td>
        <td>
          <span class="status-pill ${isCompleted ? 'low' : 'almost'}">
            ${isCompleted ? '✅ Completed' : '🚛 ' + sch.status}
          </span>
        </td>
        <td>
          ${!isCompleted ? `
            <button class="btn btn-primary btn-sm" onclick="app.completeSchedule('${sch.id}')">
              <i class="fa-solid fa-check"></i> Mark Completed
            </button>
          ` : `<span style="font-size: 11px; color: var(--text-muted);">Emptied</span>`}
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // 6. ALERTS FULL VIEW
  renderAlertsView() {
    const container = document.getElementById('full-alerts-list');
    container.innerHTML = '';

    if (this.alerts.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 30px;">Green Status! No urgent collection alerts in the system.</div>`;
      return;
    }

    this.alerts.forEach(alt => {
      const div = document.createElement('div');
      div.className = `alert-item ${alt.type}`;
      div.style.marginBottom = '12px';
      div.innerHTML = `
        <div class="alert-icon"><i class="${alt.icon}" style="font-size: 22px; color: ${alt.type === 'critical' ? 'var(--status-critical)' : 'var(--status-full)'}"></i></div>
        <div class="alert-content">
          <div class="alert-msg" style="font-size: 14px;">${alt.msg}</div>
          <div class="alert-time">Reported: ${alt.time} | Sensor ID: ${alt.locId}</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="app.quickScheduleDispatch('${alt.locId}')">Dispatch Truck</button>
      `;
      container.appendChild(div);
    });
  }

  // ================= MAP INITIALIZATION & MARKERS =================
  initMap() {
    const center = [11.0168, 76.9558]; // Coimbatore coordinates
    this.map = L.map('map').setView(center, 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors | Smart City Waste IoT'
    }).addTo(this.map);

    this.updateMapMarkers();
  }

  updateMapMarkers() {
    if (!this.map) return;

    // Clear existing markers
    this.mapMarkers.forEach(m => this.map.removeLayer(m));
    this.mapMarkers = [];

    this.points.forEach(pt => {
      const icon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div class="custom-bin-marker ${pt.statusClass}" style="width: 34px; height: 34px;">${pt.fill}%</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker([pt.lat, pt.lng], { icon: icon }).addTo(this.map);

      const popupContent = `
        <div style="font-family: sans-serif; padding: 4px; min-width: 180px;">
          <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700;">${pt.name}</h4>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">ID: ${pt.id} | ${pt.area}</div>
          
          <div style="margin-bottom: 8px;">
            <span class="status-pill ${pt.statusClass}" style="font-size: 11px;">${pt.statusIcon} ${pt.statusLabel}</span>
            <span class="priority-pill ${pt.priorityClass}" style="font-size: 10px; margin-left: 4px;">${pt.priorityLabel}</span>
          </div>

          <div style="font-size: 12px; margin-bottom: 10px;">
            <strong>Fill Capacity:</strong> ${pt.fill}%<br>
            <strong>Last Updated:</strong> ${pt.lastUpdated}
          </div>

          <div style="display: flex; gap: 6px;">
            <button style="background: #10b981; color: white; border: none; padding: 5px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 600;" onclick="app.quickScheduleDispatch('${pt.id}')">🚛 Dispatch</button>
            <button style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 600;" onclick="app.emptyBin('${pt.id}')">🧹 Empty</button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      this.mapMarkers.push(marker);
    });
  }

  // ================= ANALYTICS CHARTS (CHART.JS) =================
  initCharts() {
    // 1. Fill Levels Bar Chart
    const ctxBar = document.getElementById('chart-fill-levels').getContext('2d');
    this.charts.bar = new Chart(ctxBar, {
      type: 'bar',
      data: this.getFillBarData(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { max: 100, beginAtZero: true, title: { display: true, text: 'Fill Percentage (%)' } } }
      }
    });

    // 2. Weekly Trend Line Chart
    const ctxLine = document.getElementById('chart-weekly-trend').getContext('2d');
    this.charts.line = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Collected Waste (Tons)',
          data: [12.4, 15.2, 14.8, 18.1, 16.5, 21.0, 18.4],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });

    // 3. Waste Type Donut
    const ctxDonut = document.getElementById('chart-waste-type').getContext('2d');
    this.charts.donut = new Chart(ctxDonut, {
      type: 'doughnut',
      data: {
        labels: ['Organic Bio', 'General Mixed', 'Plastics', 'E-Waste'],
        datasets: [{
          data: [45, 30, 15, 10],
          backgroundColor: ['#10b981', '#0ea5e9', '#f59e0b', '#8b5cf6']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    // 4. Status Pie
    const ctxPie = document.getElementById('chart-status-pie').getContext('2d');
    this.charts.pie = new Chart(ctxPie, {
      type: 'pie',
      data: this.getStatusPieData(),
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  getFillBarData() {
    return {
      labels: this.points.map(p => p.name.split(' ')[0]),
      datasets: [{
        label: 'Fill Level (%)',
        data: this.points.map(p => p.fill),
        backgroundColor: this.points.map(p => {
          if (p.fill >= 90) return '#ef4444';
          if (p.fill >= 80) return '#f97316';
          if (p.fill >= 50) return '#eab308';
          return '#10b981';
        }),
        borderRadius: 6
      }]
    };
  }

  getStatusPieData() {
    const critical = this.points.filter(p => p.fill >= 90).length;
    const almost = this.points.filter(p => p.fill >= 80 && p.fill < 90).length;
    const medium = this.points.filter(p => p.fill >= 50 && p.fill < 80).length;
    const low = this.points.filter(p => p.fill < 50).length;

    return {
      labels: ['Collection Required', 'Almost Full', 'Medium', 'Low'],
      datasets: [{
        data: [critical, almost, medium, low],
        backgroundColor: ['#ef4444', '#f97316', '#eab308', '#10b981']
      }]
    };
  }

  updateCharts() {
    if (this.charts.bar) {
      this.charts.bar.data = this.getFillBarData();
      this.charts.bar.update();
    }
    if (this.charts.pie) {
      this.charts.pie.data = this.getStatusPieData();
      this.charts.pie.update();
    }
  }

  // ================= ACTION HANDLERS =================
  handleAddPoint() {
    const name = document.getElementById('add-name').value;
    const area = document.getElementById('add-area').value;
    const lat = parseFloat(document.getElementById('add-lat').value);
    const lng = parseFloat(document.getElementById('add-lng').value);
    const fill = parseInt(document.getElementById('add-fill').value, 10);
    const wasteType = document.getElementById('add-type').value;
    const freq = document.getElementById('add-freq').value;

    const newId = `BIN-CBE-${String(this.points.length + 1).padStart(3, '0')}`;

    const newPoint = {
      id: newId,
      name,
      area,
      lat,
      lng,
      fill,
      wasteType,
      freq,
      lastUpdated: 'Just now'
    };

    this.points.push(newPoint);
    this.calculateSmartStatuses();
    this.generateAlerts();
    this.renderAllViews();
    this.updateMapMarkers();
    this.updateCharts();

    document.getElementById('modal-add-point').classList.remove('active');
    document.getElementById('form-add-point').reset();
    this.showToast(`New collection point "${name}" added successfully!`, 'success');
  }

  openUpdateModal(pointId) {
    const pt = this.points.find(p => p.id === pointId);
    if (!pt) return;

    document.getElementById('update-point-id').value = pt.id;
    document.getElementById('update-point-name').textContent = `${pt.name} (${pt.id})`;
    document.getElementById('fill-range-slider').value = pt.fill;
    document.getElementById('fill-slider-val').textContent = pt.fill + '%';

    document.getElementById('modal-update-fill').classList.add('active');
  }

  handleSaveFillUpdate() {
    const id = document.getElementById('update-point-id').value;
    const fillVal = parseInt(document.getElementById('fill-range-slider').value, 10);

    const pt = this.points.find(p => p.id === id);
    if (pt) {
      pt.fill = fillVal;
      pt.lastUpdated = 'Just now';
      this.calculateSmartStatuses();
      this.generateAlerts();
      this.renderAllViews();
      this.updateMapMarkers();
      this.updateCharts();

      document.getElementById('modal-update-fill').classList.remove('active');
      this.showToast(`Updated fill level for ${pt.name} to ${fillVal}%`, 'info');
    }
  }

  emptyBin(pointId) {
    const pt = this.points.find(p => p.id === pointId);
    if (pt) {
      const oldFill = pt.fill;
      pt.fill = 0;
      pt.lastUpdated = 'Just now';
      
      // Increment tonnage collected
      this.totalCollectedTons += (oldFill * 0.02);

      this.calculateSmartStatuses();
      this.generateAlerts();
      this.renderAllViews();
      this.updateMapMarkers();
      this.updateCharts();

      this.showToast(`🧹 ${pt.name} emptied! Fill level reset to 0%.`, 'success');
    }
  }

  quickScheduleDispatch(pointId) {
    const pt = this.points.find(p => p.id === pointId);
    if (!pt) return;

    // Switch to schedule view and pre-select
    this.switchView('schedule-view', document.querySelector('.nav-link[data-view="schedule-view"]'));
    document.getElementById('schedule-location').value = pt.id;
    this.showToast(`Selected ${pt.name} for vehicle dispatch.`, 'info');
  }

  handleScheduleSubmit() {
    const locId = document.getElementById('schedule-location').value;
    const pt = this.points.find(p => p.id === locId);
    const truck = document.getElementById('schedule-truck').value;
    const driver = document.getElementById('schedule-driver').value;
    const date = document.getElementById('schedule-date').value;
    const time = document.getElementById('schedule-time').value;

    const newSch = {
      id: `SCH-${Math.floor(100 + Math.random() * 900)}`,
      locId: locId,
      locName: pt ? pt.name : 'Unknown Location',
      truck,
      driver,
      time: `${date || 'Today'}, ${time || '15:00'}`,
      status: 'Scheduled'
    };

    this.schedules.unshift(newSch);
    this.renderScheduleTable();
    this.saveState();

    this.showToast(`Dispatch scheduled for ${newSch.locName}!`, 'success');
  }

  completeSchedule(schId) {
    const sch = this.schedules.find(s => s.id === schId);
    if (sch) {
      sch.status = 'Completed';
      
      // Reset the associated bin
      const pt = this.points.find(p => p.id === sch.locId);
      if (pt) {
        pt.fill = 0;
        pt.lastUpdated = 'Just now';
        this.totalCollectedTons += 1.8;
      }

      this.calculateSmartStatuses();
      this.generateAlerts();
      this.renderAllViews();
      this.updateMapMarkers();
      this.updateCharts();

      this.showToast(`✅ Collection completed for ${sch.locName}! Bin emptied.`, 'success');
    }
  }

  // ================= TOAST NOTIFICATION ENGINE =================
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'fa-solid fa-circle-info';
    if (type === 'success') icon = 'fa-solid fa-circle-check';
    if (type === 'warning') icon = 'fa-solid fa-triangle-exclamation';

    toast.innerHTML = `<i class="${icon}" style="color: ${type === 'success' ? '#10b981' : '#0ea5e9'}"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Instantiate App Global
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new WasteManagementApp();
});
