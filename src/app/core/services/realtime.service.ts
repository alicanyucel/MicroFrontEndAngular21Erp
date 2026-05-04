import { Injectable, signal } from '@angular/core';
import { interval } from 'rxjs';
import { ChatMessage, NotificationItem } from '../models/erp.models';

type ConnectionStatus = 'mock' | 'connected' | 'disconnected';

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private socket?: WebSocket;

  private readonly notificationsState = signal<NotificationItem[]>([
    {
      id: 'ntf-1',
      title: 'Tahsilat alarmı',
      detail: 'Nova İnşaat için 1.340.000 TL açık bakiye limitine ulaştı.',
      createdAt: '5 dk önce',
      read: false,
      level: 'warning'
    },
    {
      id: 'ntf-2',
      title: 'Üretim tamamlandı',
      detail: 'UR-6798 emri kalite kontrol onayı aldı.',
      createdAt: '12 dk önce',
      read: false,
      level: 'success'
    },
    {
      id: 'ntf-3',
      title: 'Bakım takvimi',
      detail: '34 ZEN 101 plakalı aracın bakım tarihi yaklaşıyor.',
      createdAt: '28 dk önce',
      read: true,
      level: 'info'
    }
  ]);

  private readonly messagesState = signal<ChatMessage[]>([
    {
      id: 'msg-1',
      author: 'Finans Ekibi',
      team: 'Muhasebe',
      content: 'Beta Çelik için bugün kısmi ödeme çıkışı planlandı.',
      createdAt: '09:12',
      incoming: true
    },
    {
      id: 'msg-2',
      author: 'Operasyon Müdürü',
      team: 'Üretim',
      content: 'UR-6801 için enerji kullanım sapmasını akşam raporuna ekleyin.',
      createdAt: '09:18',
      incoming: false
    },
    {
      id: 'msg-3',
      author: 'Bakım Planlama',
      team: 'Filo',
      content: '34 ZEN 303 bugün 15:00 sonrası servise çıkacak.',
      createdAt: '09:24',
      incoming: true
    }
  ]);

  private readonly status = signal<ConnectionStatus>('mock');
  readonly notifications = this.notificationsState.asReadonly();
  readonly messages = this.messagesState.asReadonly();
  readonly connectionStatus = this.status.asReadonly();

  constructor() {
    interval(20000).subscribe((tick) => {
      const templates = [
        'Yeni üretim emri plan tablosuna düştü.',
        'Araç bakım maliyeti limitin yüzde 85 seviyesine ulaştı.',
        'Cari hesap mutabakatı için yeni not paylaşıldı.'
      ];

      this.pushNotification({
        id: `auto-${tick}`,
        title: 'Canlı sistem akışı',
        detail: templates[tick % templates.length],
        createdAt: 'Az önce',
        read: false,
        level: tick % 2 === 0 ? 'info' : 'warning'
      });
    });
  }

  connect(url: string): void {
    if (!url || typeof WebSocket === 'undefined') {
      this.status.set('mock');
      return;
    }

    this.socket?.close();
    this.status.set('disconnected');

    try {
      this.socket = new WebSocket(url);
      this.socket.onopen = () => this.status.set('connected');
      this.socket.onerror = () => this.status.set('mock');
      this.socket.onclose = () => this.status.set('mock');
      this.socket.onmessage = (event) => {
        this.pushNotification({
          id: `ws-${Date.now()}`,
          title: 'Sunucu bildirimi',
          detail: typeof event.data === 'string' ? event.data : 'Yeni WebSocket verisi alındı.',
          createdAt: 'Az önce',
          read: false,
          level: 'info'
        });
      };
    } catch {
      this.status.set('mock');
    }
  }

  sendMessage(content: string, author = 'Operasyon Müdürü', team = 'ERP'): void {
    const trimmed = content.trim();

    if (!trimmed) {
      return;
    }

    const payload: ChatMessage = {
      id: `msg-${Date.now()}`,
      author,
      team,
      content: trimmed,
      createdAt: new Intl.DateTimeFormat('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date()),
      incoming: false
    };

    this.messagesState.update((current) => [...current, payload]);

    if (this.status() === 'connected' && this.socket) {
      this.socket.send(trimmed);
    } else {
      this.pushNotification({
        id: `notify-${Date.now()}`,
        title: 'Mock kanal mesajı',
        detail: 'Mesaj gönderildi ve lokal akışa işlendi.',
        createdAt: 'Az önce',
        read: false,
        level: 'success'
      });
    }
  }

  markNotificationRead(notificationId: string): void {
    this.notificationsState.update((current) =>
      current.map((item) => (item.id === notificationId ? { ...item, read: true } : item))
    );
  }

  private pushNotification(notification: NotificationItem): void {
    this.notificationsState.update((current) => [notification, ...current].slice(0, 8));
  }
}
