import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ERP_MODULES } from '@erp/core/data/erp.modules';
import { ErpStoreService } from '@erp/core/services/erp-store.service';
import { RealtimeService } from '@erp/core/services/realtime.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css'
})
export class DashboardPageComponent {
  private readonly store = inject(ErpStoreService);
  protected readonly realtime = inject(RealtimeService);
  protected readonly modules = ERP_MODULES;
  protected readonly totalRecords = computed(() =>
    this.modules.reduce((total, module) => total + this.store.list(module.id).length, 0)
  );
  protected readonly financeModules = this.modules.filter((module) => module.section === 'Finans');
  protected readonly productionModules = this.modules.filter((module) => module.section === 'Üretim');
}
