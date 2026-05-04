import { Routes } from '@angular/router';
import { DashboardPageComponent } from './features/dashboard/dashboard.page';
import { ModulePageComponent } from './features/module/module.page';
import { RealtimePageComponent } from './features/realtime/realtime.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPageComponent, title: 'Dashboard' },
  { path: 'cari-kart', component: ModulePageComponent, data: { moduleId: 'cari-kart' }, title: 'Cari Kart Paneli' },
  { path: 'personel-kart', component: ModulePageComponent, data: { moduleId: 'personel-kart' }, title: 'Personel Kart Paneli' },
  { path: 'musteri-satis-tahsilat', component: ModulePageComponent, data: { moduleId: 'musteri-satis-tahsilat' }, title: 'Müşteri Satış ve Tahsilat' },
  { path: 'tedarikci-alim-odeme', component: ModulePageComponent, data: { moduleId: 'tedarikci-alim-odeme' }, title: 'Tedarikçi Alım ve Ödeme' },
  { path: 'uretim', component: ModulePageComponent, data: { moduleId: 'uretim' }, title: 'Üretim Paneli' },
  { path: 'recete', component: ModulePageComponent, data: { moduleId: 'recete' }, title: 'Reçete Paneli' },
  { path: 'enerji-kullanim', component: ModulePageComponent, data: { moduleId: 'enerji-kullanim' }, title: 'Enerji Kullanım Paneli' },
  { path: 'satis-alim-genel', component: ModulePageComponent, data: { moduleId: 'satis-alim-genel' }, title: 'Satış ve Alım İşlemleri' },
  { path: 'firma-ayarlari', component: ModulePageComponent, data: { moduleId: 'firma-ayarlari' }, title: 'Firma Ayarları' },
  { path: 'profil', component: ModulePageComponent, data: { moduleId: 'profil' }, title: 'Profil' },
  { path: 'urun-tanimlari', component: ModulePageComponent, data: { moduleId: 'urun-tanimlari' }, title: 'Ürün Tanımları' },
  { path: 'arac-tanimlari', component: ModulePageComponent, data: { moduleId: 'arac-tanimlari' }, title: 'Araç Tanımları' },
  { path: 'arac-bakim-sigorta', component: ModulePageComponent, data: { moduleId: 'arac-bakim-sigorta' }, title: 'Araç Bakım ve Sigorta' },
  { path: 'hizmet-sirketleri', component: ModulePageComponent, data: { moduleId: 'hizmet-sirketleri' }, title: 'Bakım ve Sigorta Şirketleri' },
  { path: 'uretim-arac-yakit', component: ModulePageComponent, data: { moduleId: 'uretim-arac-yakit' }, title: 'Üretimde Araç ve Yakıt' },
  { path: 'merkez/mesajlar', component: RealtimePageComponent, title: 'Mesaj ve Bildirim Merkezi' },
  { path: '**', redirectTo: 'dashboard' }
];
