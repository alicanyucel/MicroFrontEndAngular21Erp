import { CrudModule, ModuleUiSchema } from '../models/erp.models';

const BASE_ERP_MODULES: CrudModule[] = [
  {
    id: 'cari-kart',
    title: 'Cari Kart Paneli',
    navLabel: 'Cari Kartlar',
    description: 'Tedarikçi ve müşteri kartlarının bakiyesi, statüsü ve vergi bilgileri.',
    section: 'Finans',
    badge: 'CRM',
    accent: '#0f766e',
    summary: [
      { label: 'Toplam Cari', value: '248', tone: 'positive' },
      { label: 'Riskli Bakiye', value: '₺ 1.280.000', tone: 'warning' },
      { label: 'Aktif Müşteri', value: '164', tone: 'neutral' }
    ],
    fields: [
      { key: 'code', label: 'Cari Kodu', type: 'text', required: true },
      { key: 'type', label: 'Tür', type: 'select', options: ['Müşteri', 'Tedarikçi'] },
      { key: 'name', label: 'Unvan', type: 'text', required: true },
      { key: 'taxOffice', label: 'Vergi / T.C.', type: 'text' },
      { key: 'balance', label: 'Bakiye', type: 'currency' },
      { key: 'status', label: 'Durum', type: 'status', options: ['Aktif', 'Pasif', 'Riskli'] }
    ],
    items: [
      { id: 'cari-1', code: 'CR-001', type: 'Müşteri', name: 'Marmara Yapı Market', taxOffice: 'Kadıköy / 3482211904', balance: 485000, status: 'Aktif' },
      { id: 'cari-2', code: 'CR-002', type: 'Tedarikçi', name: 'Beta Çelik Sanayi', taxOffice: 'Gebze / 1120045987', balance: -232000, status: 'Aktif' },
      { id: 'cari-3', code: 'CR-003', type: 'Müşteri', name: 'Nova İnşaat', taxOffice: 'Bursa / 6651182390', balance: 912000, status: 'Riskli' }
    ]
  },
  {
    id: 'personel-kart',
    title: 'Personel Kart Paneli',
    navLabel: 'Personel Kart',
    description: 'SGK, maaş, avans ve izin verilerinin çalışan bazında yönetimi.',
    section: 'İnsan Kaynakları',
    badge: 'HR',
    accent: '#c26b2a',
    summary: [
      { label: 'Aktif Personel', value: '93', tone: 'positive' },
      { label: 'Bu Ay Avans', value: '₺ 186.400', tone: 'warning' },
      { label: 'Ortalama İzin', value: '12 gün', tone: 'neutral' }
    ],
    fields: [
      { key: 'sicilNo', label: 'Sicil No', type: 'text', required: true },
      { key: 'fullName', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'department', label: 'Departman', type: 'text' },
      { key: 'sgkNo', label: 'SGK No', type: 'text' },
      { key: 'salary', label: 'Maaş', type: 'currency' },
      { key: 'advance', label: 'Avans', type: 'currency' },
      { key: 'leaveDays', label: 'İzin Günü', type: 'number' }
    ],
    items: [
      { id: 'personel-1', sicilNo: 'P-001', fullName: 'Ayşe Yılmaz', department: 'Üretim', sgkNo: '4567789012', salary: 46000, advance: 5000, leaveDays: 9 },
      { id: 'personel-2', sicilNo: 'P-002', fullName: 'Murat Demir', department: 'Finans', sgkNo: '6678901123', salary: 52000, advance: 0, leaveDays: 14 },
      { id: 'personel-3', sicilNo: 'P-003', fullName: 'Elif Kaya', department: 'Satış', sgkNo: '7789012345', salary: 41000, advance: 3500, leaveDays: 6 }
    ]
  },
  {
    id: 'musteri-satis-tahsilat',
    title: 'Müşteri Satış ve Tahsilat Paneli',
    navLabel: 'Müşteri Satış',
    description: 'Satış faturası, tahsilat tutarı ve kalan açık hesap takibi.',
    section: 'Finans',
    badge: 'AR',
    accent: '#0d9488',
    summary: [
      { label: 'Aylık Satış', value: '₺ 7.420.000', tone: 'positive' },
      { label: 'Tahsilat Oranı', value: '% 82', tone: 'positive' },
      { label: 'Vadesi Geçen', value: '₺ 640.000', tone: 'warning' }
    ],
    fields: [
      { key: 'voucherNo', label: 'Belge No', type: 'text', required: true },
      { key: 'customer', label: 'Müşteri', type: 'text' },
      { key: 'date', label: 'Tarih', type: 'date' },
      { key: 'saleTotal', label: 'Satış Tutarı', type: 'currency' },
      { key: 'collected', label: 'Tahsil Edilen', type: 'currency' },
      { key: 'remaining', label: 'Kalan', type: 'currency' },
      { key: 'status', label: 'Durum', type: 'status', options: ['Açık', 'Kapandı', 'Kısmi'] }
    ],
    items: [
      { id: 'ms-1', voucherNo: 'SF-24001', customer: 'Marmara Yapı Market', date: '2026-05-02', saleTotal: 820000, collected: 700000, remaining: 120000, status: 'Kısmi' },
      { id: 'ms-2', voucherNo: 'SF-24007', customer: 'Nova İnşaat', date: '2026-05-03', saleTotal: 1340000, collected: 0, remaining: 1340000, status: 'Açık' },
      { id: 'ms-3', voucherNo: 'SF-24011', customer: 'Kıyı Prefabrik', date: '2026-05-04', saleTotal: 560000, collected: 560000, remaining: 0, status: 'Kapandı' }
    ]
  },
  {
    id: 'tedarikci-alim-odeme',
    title: 'Tedarikçi Alım ve Ödeme Paneli',
    navLabel: 'Tedarikçi Alım',
    description: 'Alım faturaları, ödeme planı ve kalan borçların izlenmesi.',
    section: 'Finans',
    badge: 'AP',
    accent: '#a16207',
    summary: [
      { label: 'Aylık Alım', value: '₺ 5.980.000', tone: 'neutral' },
      { label: 'Ödenen', value: '₺ 4.420.000', tone: 'positive' },
      { label: 'Bekleyen', value: '₺ 1.560.000', tone: 'warning' }
    ],
    fields: [
      { key: 'invoiceNo', label: 'Fatura No', type: 'text', required: true },
      { key: 'supplier', label: 'Tedarikçi', type: 'text' },
      { key: 'date', label: 'Tarih', type: 'date' },
      { key: 'purchaseTotal', label: 'Alım Tutarı', type: 'currency' },
      { key: 'paid', label: 'Ödenen', type: 'currency' },
      { key: 'due', label: 'Kalan Borç', type: 'currency' },
      { key: 'status', label: 'Durum', type: 'status', options: ['Planlandı', 'Kısmi', 'Kapandı'] }
    ],
    items: [
      { id: 'ta-1', invoiceNo: 'AF-1038', supplier: 'Beta Çelik Sanayi', date: '2026-05-01', purchaseTotal: 1280000, paid: 900000, due: 380000, status: 'Kısmi' },
      { id: 'ta-2', invoiceNo: 'AF-1044', supplier: 'Atlas Kimya', date: '2026-05-04', purchaseTotal: 760000, paid: 760000, due: 0, status: 'Kapandı' },
      { id: 'ta-3', invoiceNo: 'AF-1047', supplier: 'Eko Ambalaj', date: '2026-05-05', purchaseTotal: 420000, paid: 0, due: 420000, status: 'Planlandı' }
    ]
  },
  {
    id: 'uretim',
    title: 'Üretim Paneli',
    navLabel: 'Üretim',
    description: 'Planlanan ve devam eden üretim emirlerinin operasyonel görünümü.',
    section: 'Üretim',
    badge: 'MFG',
    accent: '#1d4ed8',
    summary: [
      { label: 'Açık Emir', value: '26', tone: 'warning' },
      { label: 'Günlük Kapasite', value: '% 88', tone: 'positive' },
      { label: 'Hurda Oranı', value: '% 1.4', tone: 'neutral' }
    ],
    fields: [
      { key: 'productionNo', label: 'Üretim No', type: 'text', required: true },
      { key: 'product', label: 'Ürün', type: 'text' },
      { key: 'line', label: 'Hat', type: 'text' },
      { key: 'plannedDate', label: 'Plan Tarihi', type: 'date' },
      { key: 'quantity', label: 'Miktar', type: 'number' },
      { key: 'status', label: 'Durum', type: 'status', options: ['Planlandı', 'Devam', 'Tamamlandı'] }
    ],
    items: [
      { id: 'u-1', productionNo: 'UR-6801', product: '60x120 Seramik', line: 'Hat-02', plannedDate: '2026-05-05', quantity: 12500, status: 'Devam' },
      { id: 'u-2', productionNo: 'UR-6802', product: 'Parlak Granit', line: 'Hat-01', plannedDate: '2026-05-06', quantity: 9800, status: 'Planlandı' },
      { id: 'u-3', productionNo: 'UR-6798', product: 'Mat Duvar Paneli', line: 'Hat-03', plannedDate: '2026-05-04', quantity: 7400, status: 'Tamamlandı' }
    ]
  },
  {
    id: 'recete',
    title: 'Üretim İçin Reçete Paneli',
    navLabel: 'Reçeteler',
    description: 'Ürün bazlı reçete sürümleri, parti büyüklüğü ve maliyet kurgusu.',
    section: 'Üretim',
    badge: 'BOM',
    accent: '#0f766e',
    summary: [
      { label: 'Aktif Reçete', value: '41', tone: 'positive' },
      { label: 'Revizyon Bekleyen', value: '7', tone: 'warning' },
      { label: 'Ortalama Maliyet', value: '₺ 164 / parti', tone: 'neutral' }
    ],
    fields: [
      { key: 'recipeCode', label: 'Reçete Kodu', type: 'text', required: true },
      { key: 'product', label: 'Ürün', type: 'text' },
      { key: 'version', label: 'Versiyon', type: 'text' },
      { key: 'batchSize', label: 'Parti Miktarı', type: 'number' },
      { key: 'unitCost', label: 'Birim Maliyet', type: 'currency' },
      { key: 'status', label: 'Durum', type: 'status', options: ['Aktif', 'Taslak', 'Arşiv'] }
    ],
    items: [
      { id: 'r-1', recipeCode: 'RC-021', product: '60x120 Seramik', version: 'v4', batchSize: 1800, unitCost: 164, status: 'Aktif' },
      { id: 'r-2', recipeCode: 'RC-045', product: 'Parlak Granit', version: 'v2', batchSize: 1450, unitCost: 188, status: 'Taslak' },
      { id: 'r-3', recipeCode: 'RC-018', product: 'Mat Duvar Paneli', version: 'v6', batchSize: 1200, unitCost: 139, status: 'Aktif' }
    ]
  },
  {
    id: 'enerji-kullanim',
    title: 'Enerji Kullanım Miktarları Paneli',
    navLabel: 'Enerji Kullanımı',
    description: 'Üretim sonucu ürün bazında enerji ve yardımcı kaynak tüketimleri.',
    section: 'Üretim',
    badge: 'ENE',
    accent: '#b45309',
    summary: [
      { label: 'Elektrik', value: '126.400 kWh', tone: 'neutral' },
      { label: 'Doğalgaz', value: '18.900 m3', tone: 'warning' },
      { label: 'Su', value: '2.140 ton', tone: 'positive' }
    ],
    fields: [
      { key: 'batchNo', label: 'Parti No', type: 'text', required: true },
      { key: 'product', label: 'Ürün', type: 'text' },
      { key: 'electricityKwh', label: 'Elektrik (kWh)', type: 'number' },
      { key: 'naturalGasM3', label: 'Doğalgaz (m3)', type: 'number' },
      { key: 'waterTon', label: 'Su (ton)', type: 'number' },
      { key: 'steamKg', label: 'Buhar (kg)', type: 'number' }
    ],
    items: [
      { id: 'e-1', batchNo: 'PT-8102', product: '60x120 Seramik', electricityKwh: 18400, naturalGasM3: 3200, waterTon: 420, steamKg: 8600 },
      { id: 'e-2', batchNo: 'PT-8104', product: 'Parlak Granit', electricityKwh: 21200, naturalGasM3: 4100, waterTon: 310, steamKg: 9200 },
      { id: 'e-3', batchNo: 'PT-8106', product: 'Mat Duvar Paneli', electricityKwh: 15300, naturalGasM3: 2700, waterTon: 285, steamKg: 7300 }
    ]
  },
  {
    id: 'satis-alim-genel',
    title: 'Satış ve Alım İşlemleri',
    navLabel: 'Satış ve Alım',
    description: 'Genel toplamlar, cari hesap kırılımları ve net nakit tablosu.',
    section: 'Finans',
    badge: 'GL',
    accent: '#475569',
    summary: [
      { label: 'Toplam Satış', value: '₺ 32.8 Mn', tone: 'positive' },
      { label: 'Toplam Alım', value: '₺ 24.1 Mn', tone: 'neutral' },
      { label: 'Net Nakit', value: '₺ 4.6 Mn', tone: 'positive' }
    ],
    fields: [
      { key: 'period', label: 'Dönem', type: 'text', required: true },
      { key: 'totalSales', label: 'Satış Toplamı', type: 'currency' },
      { key: 'totalPurchases', label: 'Alım Toplamı', type: 'currency' },
      { key: 'receivable', label: 'Cari Alacak', type: 'currency' },
      { key: 'payable', label: 'Cari Borç', type: 'currency' },
      { key: 'netCash', label: 'Net Nakit', type: 'currency' }
    ],
    items: [
      { id: 'sa-1', period: '2026-Q1', totalSales: 10800000, totalPurchases: 8040000, receivable: 2180000, payable: 1260000, netCash: 1740000 },
      { id: 'sa-2', period: '2026-Q2', totalSales: 12700000, totalPurchases: 9300000, receivable: 2460000, payable: 1380000, netCash: 2010000 },
      { id: 'sa-3', period: '2026-Q3', totalSales: 9300000, totalPurchases: 6760000, receivable: 1820000, payable: 980000, netCash: 1250000 }
    ]
  },
  {
    id: 'firma-ayarlari',
    title: 'Firma Ayarları',
    navLabel: 'Firma Ayarları',
    description: 'ERP kullanan firmanın para birimi, şube ve entegrasyon ayarları.',
    section: 'Yönetim',
    badge: 'CFG',
    accent: '#7c3aed',
    summary: [
      { label: 'Şube', value: '5', tone: 'neutral' },
      { label: 'Varsayılan Kur', value: 'TRY', tone: 'positive' },
      { label: 'Entegrasyon', value: '6 aktif', tone: 'positive' }
    ],
    fields: [
      { key: 'companyName', label: 'Firma Adı', type: 'text', required: true },
      { key: 'taxNo', label: 'Vergi No', type: 'text' },
      { key: 'sector', label: 'Sektör', type: 'text' },
      { key: 'defaultCurrency', label: 'Para Birimi', type: 'select', options: ['TRY', 'USD', 'EUR'] },
      { key: 'websocketUrl', label: 'WebSocket URL', type: 'text' },
      { key: 'branchCount', label: 'Şube Sayısı', type: 'number' }
    ],
    items: [
      { id: 'fa-1', companyName: 'Zen Yapı Teknolojileri A.Ş.', taxNo: '3482211904', sector: 'Yapı Malzemeleri', defaultCurrency: 'TRY', websocketUrl: 'wss://erp.example.com/live', branchCount: 5 }
    ]
  },
  {
    id: 'profil',
    title: 'Profil Sayfası',
    navLabel: 'Profil',
    description: 'Kullanıcı bazlı iletişim ve yetki tercihlerinin yönetimi.',
    section: 'Yönetim',
    badge: 'USR',
    accent: '#2563eb',
    summary: [
      { label: 'Rol', value: 'Operasyon Müdürü', tone: 'positive' },
      { label: 'Bildirim Seviyesi', value: 'Yüksek', tone: 'warning' },
      { label: 'İki Aşamalı Giriş', value: 'Aktif', tone: 'positive' }
    ],
    fields: [
      { key: 'fullName', label: 'Ad Soyad', type: 'text', required: true },
      { key: 'role', label: 'Rol', type: 'text' },
      { key: 'email', label: 'E-posta', type: 'text' },
      { key: 'phone', label: 'Telefon', type: 'text' },
      { key: 'locale', label: 'Dil', type: 'select', options: ['tr-TR', 'en-US'] },
      { key: 'notifyLevel', label: 'Bildirim Seviyesi', type: 'select', options: ['Düşük', 'Orta', 'Yüksek'] }
    ],
    items: [
      { id: 'pr-1', fullName: 'Ali Can', role: 'Operasyon Müdürü', email: 'ali.can@zen-erp.local', phone: '+90 532 000 00 00', locale: 'tr-TR', notifyLevel: 'Yüksek' }
    ]
  },
  {
    id: 'urun-tanimlari',
    title: 'Firmanın Ürettiği Ürün Tanımları',
    navLabel: 'Ürün Tanımları',
    description: 'Reçete tanımlarında kullanılacak ürün grubu ve birim tanımları.',
    section: 'Üretim',
    badge: 'SKU',
    accent: '#0891b2',
    summary: [
      { label: 'Ürün Ağacı', value: '132 kayıt', tone: 'neutral' },
      { label: 'Aktif SKU', value: '96', tone: 'positive' },
      { label: 'Pasif SKU', value: '12', tone: 'warning' }
    ],
    fields: [
      { key: 'sku', label: 'Stok Kodu', type: 'text', required: true },
      { key: 'category', label: 'Kategori', type: 'text' },
      { key: 'productName', label: 'Ürün Adı', type: 'text' },
      { key: 'unit', label: 'Birim', type: 'select', options: ['Adet', 'm2', 'kg', 'Ton'] },
      { key: 'recipeGroup', label: 'Reçete Grubu', type: 'text' },
      { key: 'active', label: 'Durum', type: 'status', options: ['Aktif', 'Pasif'] }
    ],
    items: [
      { id: 'ut-1', sku: 'SRM-60120-GLS', category: 'Seramik', productName: '60x120 Glossy', unit: 'm2', recipeGroup: 'Seri-A', active: 'Aktif' },
      { id: 'ut-2', sku: 'GRN-3030-MAT', category: 'Granit', productName: '30x30 Mat', unit: 'm2', recipeGroup: 'Seri-B', active: 'Aktif' },
      { id: 'ut-3', sku: 'PNL-DWR-018', category: 'Panel', productName: 'Duvar Paneli 18mm', unit: 'Adet', recipeGroup: 'Seri-C', active: 'Pasif' }
    ]
  },
  {
    id: 'arac-tanimlari',
    title: 'Araç Tanımlama Sayfası',
    navLabel: 'Araç Tanımları',
    description: 'Filo araçlarının plaka, model, yakıt tipi ve aktiflik bilgileri.',
    section: 'Operasyon',
    badge: 'FLT',
    accent: '#dc2626',
    summary: [
      { label: 'Toplam Araç', value: '18', tone: 'neutral' },
      { label: 'Çalışır Durumda', value: '16', tone: 'positive' },
      { label: 'Serviste', value: '2', tone: 'warning' }
    ],
    fields: [
      { key: 'plate', label: 'Plaka', type: 'text', required: true },
      { key: 'type', label: 'Araç Türü', type: 'select', options: ['Forklift', 'Kamyon', 'Servis', 'Yükleyici'] },
      { key: 'model', label: 'Model', type: 'text' },
      { key: 'year', label: 'Yıl', type: 'number' },
      { key: 'fuelType', label: 'Yakıt Tipi', type: 'select', options: ['Dizel', 'Elektrik', 'LPG'] },
      { key: 'status', label: 'Durum', type: 'status', options: ['Aktif', 'Bakımda', 'Pasif'] }
    ],
    items: [
      { id: 'at-1', plate: '34 ZEN 101', type: 'Forklift', model: 'Toyota 8FD', year: 2022, fuelType: 'Dizel', status: 'Aktif' },
      { id: 'at-2', plate: '34 ZEN 202', type: 'Kamyon', model: 'Mercedes Actros', year: 2021, fuelType: 'Dizel', status: 'Aktif' },
      { id: 'at-3', plate: '34 ZEN 303', type: 'Yükleyici', model: 'JCB 437', year: 2020, fuelType: 'Dizel', status: 'Bakımda' }
    ]
  },
  {
    id: 'arac-bakim-sigorta',
    title: 'Araç Bakım ve Sigorta İşlemleri',
    navLabel: 'Bakım ve Sigorta',
    description: 'Araç bazında bakım, muayene, kasko ve trafik poliçesi takibi.',
    section: 'Operasyon',
    badge: 'OPS',
    accent: '#ea580c',
    summary: [
      { label: 'Yaklaşan Poliçe', value: '4', tone: 'warning' },
      { label: 'Bakım Maliyeti', value: '₺ 286.000', tone: 'neutral' },
      { label: 'Tamamlanan İş', value: '12', tone: 'positive' }
    ],
    fields: [
      { key: 'plate', label: 'Plaka', type: 'text', required: true },
      { key: 'serviceType', label: 'İşlem Türü', type: 'select', options: ['Bakım', 'Kasko', 'Trafik', 'Muayene'] },
      { key: 'provider', label: 'Sağlayıcı', type: 'text' },
      { key: 'expiryDate', label: 'Bitiş Tarihi', type: 'date' },
      { key: 'cost', label: 'Tutar', type: 'currency' },
      { key: 'status', label: 'Durum', type: 'status', options: ['Yaklaşıyor', 'Tamamlandı', 'Gecikmiş'] }
    ],
    items: [
      { id: 'abs-1', plate: '34 ZEN 101', serviceType: 'Bakım', provider: 'Zen Oto Servis', expiryDate: '2026-05-22', cost: 24000, status: 'Yaklaşıyor' },
      { id: 'abs-2', plate: '34 ZEN 202', serviceType: 'Kasko', provider: 'Güven Sigorta', expiryDate: '2026-11-15', cost: 68000, status: 'Tamamlandı' },
      { id: 'abs-3', plate: '34 ZEN 303', serviceType: 'Muayene', provider: 'TÜVTÜRK', expiryDate: '2026-05-08', cost: 3400, status: 'Gecikmiş' }
    ]
  },
  {
    id: 'hizmet-sirketleri',
    title: 'Bakım ve Sigorta Şirketleri',
    navLabel: 'Hizmet Şirketleri',
    description: 'Bakım ve sigorta şirketi tanımları, borçlandırma ve ödeme takibi.',
    section: 'Operasyon',
    badge: 'VND',
    accent: '#7c2d12',
    summary: [
      { label: 'Aktif Firma', value: '22', tone: 'positive' },
      { label: 'Borç Toplamı', value: '₺ 914.000', tone: 'warning' },
      { label: 'Ödenen', value: '₺ 522.000', tone: 'positive' }
    ],
    fields: [
      { key: 'companyName', label: 'Firma Adı', type: 'text', required: true },
      { key: 'category', label: 'Kategori', type: 'select', options: ['Bakım', 'Sigorta', 'Muayene'] },
      { key: 'contactPerson', label: 'Yetkili', type: 'text' },
      { key: 'debt', label: 'Borç', type: 'currency' },
      { key: 'paid', label: 'Ödenen', type: 'currency' },
      { key: 'balance', label: 'Kalan', type: 'currency' }
    ],
    items: [
      { id: 'hs-1', companyName: 'Güven Sigorta', category: 'Sigorta', contactPerson: 'Cem Arslan', debt: 420000, paid: 280000, balance: 140000 },
      { id: 'hs-2', companyName: 'Zen Oto Servis', category: 'Bakım', contactPerson: 'Ece Tunç', debt: 186000, paid: 92000, balance: 94000 },
      { id: 'hs-3', companyName: 'TÜVTÜRK Dudullu', category: 'Muayene', contactPerson: 'Merkez', debt: 18000, paid: 18000, balance: 0 }
    ]
  },
  {
    id: 'uretim-arac-yakit',
    title: 'Üretimde Araç ve Akaryakıt Kullanımı',
    navLabel: 'Araç ve Yakıt',
    description: 'Üretimde kullanılan araç, vardiya ve akaryakıt tüketim miktarları.',
    section: 'Üretim',
    badge: 'FUEL',
    accent: '#be123c',
    summary: [
      { label: 'Yakıt Tüketimi', value: '4.820 lt', tone: 'warning' },
      { label: 'Araç Kullanımı', value: '312 saat', tone: 'neutral' },
      { label: 'Birim Maliyet', value: '₺ 23,4 / lt', tone: 'positive' }
    ],
    fields: [
      { key: 'batchNo', label: 'Üretim No', type: 'text', required: true },
      { key: 'plate', label: 'Araç', type: 'text' },
      { key: 'shift', label: 'Vardiya', type: 'select', options: ['Gündüz', 'Gece'] },
      { key: 'fuelLiters', label: 'Yakıt (lt)', type: 'number' },
      { key: 'usageHours', label: 'Kullanım Saati', type: 'number' },
      { key: 'cost', label: 'Maliyet', type: 'currency' }
    ],
    items: [
      { id: 'uay-1', batchNo: 'UR-6801', plate: '34 ZEN 101', shift: 'Gündüz', fuelLiters: 320, usageHours: 18, cost: 10432 },
      { id: 'uay-2', batchNo: 'UR-6802', plate: '34 ZEN 303', shift: 'Gece', fuelLiters: 470, usageHours: 22, cost: 15322 },
      { id: 'uay-3', batchNo: 'UR-6803', plate: '34 ZEN 202', shift: 'Gündüz', fuelLiters: 580, usageHours: 16, cost: 18966 }
    ]
  }
];

const MODULE_UI_SCHEMAS: Record<string, ModuleUiSchema> = {
  'cari-kart': {
    variant: 'ledger',
    heroTitle: 'Cari ekosistemini risk, tip ve bakiye ekseninde yönetin.',
    heroNote: 'Bu görünüm müşteri ve tedarikçileri aynı anda finansal yoğunlukla izlemeniz için tasarlandı.',
    quickFacts: ['Riskli bakiyeleri öne çıkarır', 'Müşteri ve tedarikçiyi aynı tabloda izler', 'Vergi ve bakiye alanlarını finans bloğuna toplar'],
    insightCards: [
      { title: 'Konsantrasyon', value: 'İlk 10 cari %61', note: 'Tahsilat riski yoğunluğu', tone: 'warning' },
      { title: 'Aktif akış', value: 'Günlük 34 hareket', note: 'Cari işlem hacmi', tone: 'positive' }
    ],
    formSections: [
      { title: 'Kimlik bilgileri', description: 'Cari kodu, türü ve temel unvan alanları.', fieldKeys: ['code', 'type', 'name'], emphasis: 'accent' },
      { title: 'Finans statüsü', description: 'Vergi, bakiye ve durum blokları.', fieldKeys: ['taxOffice', 'balance', 'status'], emphasis: 'soft' }
    ],
    tableFocusLabel: 'Cari liste görünümü',
    reviewTitle: 'Cari detay inceleme',
    emptyReviewText: 'Bir cari seçildiğinde bakiye ve durum özeti burada görünür.'
  },
  'personel-kart': {
    variant: 'people',
    heroTitle: 'Çalışan kartlarını SGK, ücret ve izin boyutlarıyla düzenleyin.',
    heroNote: 'İK odaklı yerleşim bordro ve izin takibini aynı form deneyiminde birleştirir.',
    quickFacts: ['Bordro ve avans blokları ayrıdır', 'İzin metrikleri ayrık gösterilir', 'Departman görünümü öne çıkar'],
    insightCards: [
      { title: 'Bordro ritmi', value: 'Ay sonu 93 kayıt', note: 'Maaş onay planı', tone: 'neutral' },
      { title: 'İzin baskısı', value: '8 kişi kritik', note: 'Yaz dönemi planlama', tone: 'warning' }
    ],
    formSections: [
      { title: 'Personel kimliği', description: 'Sicil, ad soyad ve organizasyon verileri.', fieldKeys: ['sicilNo', 'fullName', 'department'], emphasis: 'accent' },
      { title: 'Özlük ve maliyet', description: 'SGK, maaş, avans ve izin alanları.', fieldKeys: ['sgkNo', 'salary', 'advance', 'leaveDays'], emphasis: 'outline' }
    ],
    tableFocusLabel: 'Personel kart listesi',
    reviewTitle: 'Çalışan özeti',
    emptyReviewText: 'Bir personel seçildiğinde özlük ve finans bilgileri burada görünür.'
  },
  'musteri-satis-tahsilat': {
    variant: 'pipeline',
    heroTitle: 'Satıştan tahsilata giden hattı müşteri bazında kapatın.',
    heroNote: 'Gelir akışı görünümü açık bakiye, tahsilat oranı ve belge hareketini aynı yüzeyde toplar.',
    quickFacts: ['Açık ve kapalı tahsilat aynı tabloda', 'Belge odaklı kayıt akışı', 'Tahsilat oranı üst kartlarda öne çıkar'],
    insightCards: [
      { title: 'Açık vade', value: '₺ 1.46 Mn', note: 'Tahsilat önceliği', tone: 'warning' },
      { title: 'Hızlı kapanış', value: '%82', note: 'Aylık tahsilat performansı', tone: 'positive' }
    ],
    formSections: [
      { title: 'Belge akışı', description: 'Belge no, müşteri ve tarih alanları.', fieldKeys: ['voucherNo', 'customer', 'date'], emphasis: 'accent' },
      { title: 'Tahsilat görünümü', description: 'Satış, tahsil edilen, kalan ve statü alanları.', fieldKeys: ['saleTotal', 'collected', 'remaining', 'status'], emphasis: 'soft' }
    ],
    tableFocusLabel: 'Satış tahsilat akışı',
    reviewTitle: 'Tahsilat detay inceleme',
    emptyReviewText: 'Bir belge seçildiğinde tahsilat durumu ve kalan bakiye burada görünür.'
  },
  'tedarikci-alim-odeme': {
    variant: 'procurement',
    heroTitle: 'Tedarik zinciri faturalarını ödeme planı ile birlikte yönetin.',
    heroNote: 'Satın alma odaklı bu yerleşim borç ve ödeme baskısını daha görünür kılar.',
    quickFacts: ['Borç kapanışını izler', 'Tedarikçi bazlı ödeme görünümü vardır', 'Planlanan ve kapanan faturalar ayrışır'],
    insightCards: [
      { title: 'Borç baskısı', value: '₺ 1.56 Mn', note: 'Ödeme sırası bekliyor', tone: 'warning' },
      { title: 'Tedarik ritmi', value: 'Günde 12 fatura', note: 'Alım operasyon temposu', tone: 'neutral' }
    ],
    formSections: [
      { title: 'Fatura kimliği', description: 'Fatura numarası, tedarikçi ve tarih alanları.', fieldKeys: ['invoiceNo', 'supplier', 'date'], emphasis: 'accent' },
      { title: 'Ödeme durumu', description: 'Alım, ödenen, kalan ve durum alanları.', fieldKeys: ['purchaseTotal', 'paid', 'due', 'status'], emphasis: 'outline' }
    ],
    tableFocusLabel: 'Alım ödeme listesi',
    reviewTitle: 'Borç ve ödeme inceleme',
    emptyReviewText: 'Bir fatura seçildiğinde kalan borç ve ödeme dengesi burada görünür.'
  },
  uretim: {
    variant: 'factory',
    heroTitle: 'Üretim emirlerini hat, tarih ve kapasite odağında yönetin.',
    heroNote: 'Operasyon masası düzeni üretim planını form, tablo ve detay arasında akıcı dağıtır.',
    quickFacts: ['Hat bazlı izleme', 'Emir statüleri öne çıkar', 'Plan tarihi ve miktar birlikte değerlendirilir'],
    insightCards: [
      { title: 'Kapasite doluluğu', value: '%88', note: 'Hat planı sıkışık', tone: 'positive' },
      { title: 'Açık emirler', value: '26', note: 'Planlama baskısı', tone: 'warning' }
    ],
    formSections: [
      { title: 'Emir tanımı', description: 'Üretim no, ürün ve hat alanları.', fieldKeys: ['productionNo', 'product', 'line'], emphasis: 'accent' },
      { title: 'Plan ve durum', description: 'Plan tarihi, miktar ve durum alanları.', fieldKeys: ['plannedDate', 'quantity', 'status'], emphasis: 'soft' }
    ],
    tableFocusLabel: 'Üretim emir görünümü',
    reviewTitle: 'Üretim emri inceleme',
    emptyReviewText: 'Bir üretim emri seçildiğinde hat ve kapasite bilgisi burada görünür.'
  },
  recete: {
    variant: 'formula',
    heroTitle: 'Reçeteleri sürüm ve maliyet düzeniyle standardize edin.',
    heroNote: 'Bu düzen ürün reçetelerini versiyon mantığıyla okuyup maliyet etkisini hızla gösterir.',
    quickFacts: ['Reçete sürümleri ayrıştırılır', 'Parti büyüklüğü ana blokta görünür', 'Maliyet alanı formda vurgulanır'],
    insightCards: [
      { title: 'Aktif tarif', value: '41', note: 'Onaylı reçete havuzu', tone: 'positive' },
      { title: 'Revizyon sırası', value: '7', note: 'Güncelleme bekleyen tarif', tone: 'warning' }
    ],
    formSections: [
      { title: 'Reçete kimliği', description: 'Kod, ürün ve versiyon alanları.', fieldKeys: ['recipeCode', 'product', 'version'], emphasis: 'accent' },
      { title: 'Parti ve maliyet', description: 'Parti büyüklüğü, maliyet ve durum alanları.', fieldKeys: ['batchSize', 'unitCost', 'status'], emphasis: 'outline' }
    ],
    tableFocusLabel: 'Reçete sürüm listesi',
    reviewTitle: 'Reçete detay inceleme',
    emptyReviewText: 'Bir reçete seçildiğinde sürüm ve parti detayları burada görünür.'
  },
  'enerji-kullanim': {
    variant: 'utility',
    heroTitle: 'Üretim enerjisini kaynak bazında parçalayarak izleyin.',
    heroNote: 'Enerji yüzeyi tüketim kalemlerini tek satırda karşılaştırılabilir hale getirir.',
    quickFacts: ['Elektrik, gaz ve su birlikte görünür', 'Parti bazlı enerji dağılımı izlenir', 'Üretim verimliliği için hızlı kıyas sağlar'],
    insightCards: [
      { title: 'Elektrik yoğunluğu', value: '126.4k kWh', note: 'Ana tüketim kalemi', tone: 'neutral' },
      { title: 'Gaz uyarısı', value: '18.9k m3', note: 'Maliyet baskısı artıyor', tone: 'warning' }
    ],
    formSections: [
      { title: 'Parti referansı', description: 'Parti ve ürün bilgisi.', fieldKeys: ['batchNo', 'product'], emphasis: 'accent' },
      { title: 'Enerji bileşenleri', description: 'Elektrik, gaz, su ve buhar alanları.', fieldKeys: ['electricityKwh', 'naturalGasM3', 'waterTon', 'steamKg'], emphasis: 'soft' }
    ],
    tableFocusLabel: 'Enerji kullanım tablosu',
    reviewTitle: 'Enerji tüketim inceleme',
    emptyReviewText: 'Bir parti seçildiğinde kaynak bazlı tüketim detayları burada görünür.'
  },
  'satis-alim-genel': {
    variant: 'balance',
    heroTitle: 'Satış, alım ve nakit dengesini dönemsel kırılımlarla görün.',
    heroNote: 'Finansal özet düzeni çeyrek bazlı toplamları tek pano üzerinden kıyaslatır.',
    quickFacts: ['Dönem bazlı toplam izleme', 'Nakit ve cari eş zamanlı görünür', 'Özet tablo CFO bakışıyla düzenlenmiştir'],
    insightCards: [
      { title: 'Net nakit', value: '₺ 4.6 Mn', note: 'Pozitif finans dengesi', tone: 'positive' },
      { title: 'Cari yük', value: '₺ 3.8 Mn', note: 'Receivable + payable', tone: 'neutral' }
    ],
    formSections: [
      { title: 'Dönem kimliği', description: 'Dönem ve satış/alım toplamları.', fieldKeys: ['period', 'totalSales', 'totalPurchases'], emphasis: 'accent' },
      { title: 'Finans dengesi', description: 'Alacak, borç ve net nakit alanları.', fieldKeys: ['receivable', 'payable', 'netCash'], emphasis: 'outline' }
    ],
    tableFocusLabel: 'Genel toplam tablosu',
    reviewTitle: 'Dönemsel denge inceleme',
    emptyReviewText: 'Bir dönem seçildiğinde nakit ve cari dengesinin özeti burada görünür.'
  },
  'firma-ayarlari': {
    variant: 'settings',
    heroTitle: 'Firma ayarlarını şube, kur ve entegrasyon kurgusuyla yönetin.',
    heroNote: 'Ayar yüzeyi operasyon yerine sistem yapılandırmasını öne çıkaracak biçimde sadeleştirildi.',
    quickFacts: ['Kur ve entegrasyon ayrı blokta', 'Tekil firma kartı deneyimi', 'WebSocket URL sistem alanı olarak vurgulanır'],
    insightCards: [
      { title: 'Aktif entegrasyon', value: '6', note: 'Canlı servis bağlantısı', tone: 'positive' },
      { title: 'Şube topolojisi', value: '5 şube', note: 'Dağıtık yapı', tone: 'neutral' }
    ],
    formSections: [
      { title: 'Kurumsal kimlik', description: 'Firma adı, vergi no ve sektör alanları.', fieldKeys: ['companyName', 'taxNo', 'sector'], emphasis: 'accent' },
      { title: 'Sistem yapılandırması', description: 'Para birimi, websocket ve şube alanları.', fieldKeys: ['defaultCurrency', 'websocketUrl', 'branchCount'], emphasis: 'soft' }
    ],
    tableFocusLabel: 'Firma ayar listesi',
    reviewTitle: 'Sistem ayar inceleme',
    emptyReviewText: 'Firma yapılandırma kaydı seçildiğinde sistem özeti burada görünür.'
  },
  profil: {
    variant: 'identity',
    heroTitle: 'Kullanıcı profilini rol, iletişim ve bildirim tercihleri ile düzenleyin.',
    heroNote: 'Profil görünümü kişisel ayarları daha yumuşak, kimlik odaklı bir düzende sunar.',
    quickFacts: ['Rol ve iletişim ayrılır', 'Dil ve bildirim tercihi öne çıkar', 'Tekil kullanıcı kartı deneyimi'],
    insightCards: [
      { title: 'Yetki seviyesi', value: 'Müdür', note: 'Operasyon erişimi yüksek', tone: 'positive' },
      { title: 'Bildirim modu', value: 'Yüksek', note: 'Yoğun olay akışı', tone: 'warning' }
    ],
    formSections: [
      { title: 'Kimlik ve rol', description: 'Ad soyad ve rol alanları.', fieldKeys: ['fullName', 'role'], emphasis: 'accent' },
      { title: 'İletişim tercihleri', description: 'E-posta, telefon, dil ve bildirim seviyesi.', fieldKeys: ['email', 'phone', 'locale', 'notifyLevel'], emphasis: 'outline' }
    ],
    tableFocusLabel: 'Profil kayıt görünümü',
    reviewTitle: 'Profil detay inceleme',
    emptyReviewText: 'Seçilen kullanıcı için profil ve tercih özeti burada görünür.'
  },
  'urun-tanimlari': {
    variant: 'catalog',
    heroTitle: 'Ürün ağacını SKU, kategori ve reçete grubu ekseninde yönetin.',
    heroNote: 'Katalog görünümü ürün tanımlarını üretim diline yakın bir yapıda sunar.',
    quickFacts: ['SKU odaklı yönetim', 'Kategori ve reçete grubu birlikte görünür', 'Aktif/pasif ürünler hızlı ayrıştırılır'],
    insightCards: [
      { title: 'Aktif SKU', value: '96', note: 'Üretimde kullanılan ürünler', tone: 'positive' },
      { title: 'Arşiv yükü', value: '12', note: 'Pasif ürünler izleniyor', tone: 'warning' }
    ],
    formSections: [
      { title: 'Katalog kimliği', description: 'Stok kodu, kategori ve ürün adı.', fieldKeys: ['sku', 'category', 'productName'], emphasis: 'accent' },
      { title: 'Üretim bağlantısı', description: 'Birim, reçete grubu ve aktiflik.', fieldKeys: ['unit', 'recipeGroup', 'active'], emphasis: 'soft' }
    ],
    tableFocusLabel: 'Ürün katalog görünümü',
    reviewTitle: 'Ürün kartı inceleme',
    emptyReviewText: 'Bir ürün seçildiğinde SKU ve reçete ilişkisi burada görünür.'
  },
  'arac-tanimlari': {
    variant: 'fleet',
    heroTitle: 'Filoyu plaka, araç tipi ve yakıt düzeniyle yönetin.',
    heroNote: 'Filo kartları daha operasyonel, ekipman yönetimi odaklı bir yerleşim kullanır.',
    quickFacts: ['Plaka ilk kimlik alanıdır', 'Yakıt tipi kritik kartta görünür', 'Servisteki araçlar seçili renkle ayrışır'],
    insightCards: [
      { title: 'Aktif filo', value: '16 araç', note: 'Sahada çalışan ekipman', tone: 'positive' },
      { title: 'Servis baskısı', value: '2 araç', note: 'Operasyon dışı varlık', tone: 'warning' }
    ],
    formSections: [
      { title: 'Araç kimliği', description: 'Plaka, tür ve model alanları.', fieldKeys: ['plate', 'type', 'model'], emphasis: 'accent' },
      { title: 'Teknik durum', description: 'Yıl, yakıt tipi ve aktiflik.', fieldKeys: ['year', 'fuelType', 'status'], emphasis: 'outline' }
    ],
    tableFocusLabel: 'Filo kayıt tablosu',
    reviewTitle: 'Araç kartı inceleme',
    emptyReviewText: 'Bir araç seçildiğinde teknik durum ve yakıt bilgisi burada görünür.'
  },
  'arac-bakim-sigorta': {
    variant: 'service',
    heroTitle: 'Araçların bakım ve poliçe akışını tek yüzeyden takip edin.',
    heroNote: 'Servis görünümü yaklaşan süreleri ve maliyet baskısını daha görünür hale getirir.',
    quickFacts: ['Süre yaklaşımı öne çıkar', 'Bakım ve sigorta aynı iş listesinde', 'Maliyet sahası detay panelinde güçlenir'],
    insightCards: [
      { title: 'Yaklaşan poliçe', value: '4', note: 'Kritik takip listesi', tone: 'warning' },
      { title: 'Tamamlanan iş', value: '12', note: 'Son servis kapanışları', tone: 'positive' }
    ],
    formSections: [
      { title: 'Araç ve işlem', description: 'Plaka, işlem türü ve sağlayıcı alanları.', fieldKeys: ['plate', 'serviceType', 'provider'], emphasis: 'accent' },
      { title: 'Takvim ve maliyet', description: 'Bitiş tarihi, tutar ve durum alanları.', fieldKeys: ['expiryDate', 'cost', 'status'], emphasis: 'soft' }
    ],
    tableFocusLabel: 'Bakım ve sigorta listesi',
    reviewTitle: 'Servis kayıt inceleme',
    emptyReviewText: 'Bir servis kaydı seçildiğinde süre ve maliyet detayları burada görünür.'
  },
  'hizmet-sirketleri': {
    variant: 'vendor',
    heroTitle: 'Bakım ve sigorta firmalarını borç ve ödeme ekseninde yönetin.',
    heroNote: 'Tedarikçi benzeri ama servis odaklı bu yüzey firma borçlandırmasını daha belirgin sunar.',
    quickFacts: ['Borç ve ödeme ikili blokta', 'Kategori filtresi servis mantığında', 'Yetkili kişi alanı öne alınır'],
    insightCards: [
      { title: 'Borç toplamı', value: '₺ 914k', note: 'Açık yükümlülük', tone: 'warning' },
      { title: 'Aktif partner', value: '22', note: 'Hizmet sağlayıcı ağı', tone: 'positive' }
    ],
    formSections: [
      { title: 'Firma kimliği', description: 'Firma adı, kategori ve yetkili bilgisi.', fieldKeys: ['companyName', 'category', 'contactPerson'], emphasis: 'accent' },
      { title: 'Borç yönetimi', description: 'Borç, ödenen ve kalan alanları.', fieldKeys: ['debt', 'paid', 'balance'], emphasis: 'outline' }
    ],
    tableFocusLabel: 'Servis partner listesi',
    reviewTitle: 'Firma borç inceleme',
    emptyReviewText: 'Bir firma seçildiğinde borç ve ödeme dengesi burada görünür.'
  },
  'uretim-arac-yakit': {
    variant: 'consumption',
    heroTitle: 'Üretimde kullanılan araçların yakıt ve saat tüketimini ilişkilendirin.',
    heroNote: 'Bu görünüm üretim ve filo verisini tek kart yapısında buluşturur.',
    quickFacts: ['Araç ve parti ilişkisi görünür', 'Yakıt ile saat kullanımı yan yana', 'Maliyet etkisi detay panelinde öne çıkar'],
    insightCards: [
      { title: 'Yakıt yoğunluğu', value: '4.820 lt', note: 'Üretim iç lojistik tüketimi', tone: 'warning' },
      { title: 'Araç saati', value: '312 saat', note: 'Kullanım yoğunluğu', tone: 'neutral' }
    ],
    formSections: [
      { title: 'Üretim bağlantısı', description: 'Üretim no, araç ve vardiya alanları.', fieldKeys: ['batchNo', 'plate', 'shift'], emphasis: 'accent' },
      { title: 'Tüketim ölçümü', description: 'Yakıt, kullanım saati ve maliyet alanları.', fieldKeys: ['fuelLiters', 'usageHours', 'cost'], emphasis: 'soft' }
    ],
    tableFocusLabel: 'Araç yakıt tüketim listesi',
    reviewTitle: 'Tüketim kayıt inceleme',
    emptyReviewText: 'Bir kayıt seçildiğinde yakıt ve maliyet ilişkisi burada görünür.'
  }
};

export const ERP_MODULES: CrudModule[] = BASE_ERP_MODULES.map((module) => ({
  ...module,
  ui: MODULE_UI_SCHEMAS[module.id]
}));

export function getCrudModule(moduleId: string): CrudModule {
  const module = ERP_MODULES.find((item) => item.id === moduleId);

  if (!module) {
    throw new Error(`Unknown module id: ${moduleId}`);
  }

  return module;
}
