import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ERP_MODULES } from '@erp/core/data/erp.modules';
import { RealtimeService } from '@erp/core/services/realtime.service';

interface NavigationItem {
  label: string;
  description: string;
  path: string;
  section: string;
  badge?: string;
  accent: string;
  exact?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly router = inject(Router);

  protected readonly title = 'Zen ERP';
  protected readonly realtime = inject(RealtimeService);
  protected readonly sidebarOpen = signal(false);
  protected readonly currentUrl = signal(this.router.url || '/dashboard');
  protected readonly todayLabel = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  private readonly navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      description: 'Genel durum, KPI ve operasyon özeti',
      path: '/dashboard',
      section: 'Genel',
      accent: '#0f766e',
      exact: true
    },
    ...ERP_MODULES.map((module) => ({
      label: module.navLabel,
      description: module.description,
      path: `/${module.id}`,
      section: module.section,
      badge: module.badge,
      accent: module.accent
    })),
    {
      label: 'Mesaj ve Bildirim Merkezi',
      description: 'WebSocket tabanlı iletişim ve uyarı akışı',
      path: '/merkez/mesajlar',
      section: 'İletişim',
      badge: 'Live',
      accent: '#c26b2a'
    }
  ];

  protected readonly navGroups = computed(() => {
    const sections = [...new Set(this.navigationItems.map((item) => item.section))];

    return sections.map((section) => ({
      section,
      items: this.navigationItems.filter((item) => item.section === section)
    }));
  });

  protected readonly unreadNotifications = computed(
    () => this.realtime.notifications().filter((notification) => !notification.read).length
  );
  protected readonly isRealtimeConnected = computed(
    () => this.realtime.connectionStatus() === 'connected'
  );

  protected readonly activeLabel = computed(() => {
    const matched = this.navigationItems.find((item) =>
      item.exact ? this.currentUrl() === item.path : this.currentUrl().startsWith(item.path)
    );

    return matched?.label ?? 'Zen ERP';
  });

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects);
        this.sidebarOpen.set(false);
      });
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((value) => !value);
  }

  protected realtimeStatusLabel(): string {
    switch (this.realtime.connectionStatus()) {
      case 'connected':
        return 'WebSocket bağlı';
      case 'disconnected':
        return 'Hat kapalı';
      default:
        return 'Mock akış';
    }
  }
}
