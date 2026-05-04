import { Routes } from '@angular/router';
import { ERP_MODULES } from '@erp/core/data/erp.modules';

const defaultModuleId = ERP_MODULES[0]?.id ?? 'cari-kart';

const moduleRoutes: Routes = ERP_MODULES.map((module) => ({
	path: module.id,
	loadComponent: () => import('@erp/features/module/module.page').then((entry) => entry.ModulePageComponent),
	data: { moduleId: module.id },
	title: module.title
}));

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: defaultModuleId },
	...moduleRoutes,
	{
		path: 'merkez/mesajlar',
		loadComponent: () => import('@erp/features/realtime/realtime.page').then((entry) => entry.RealtimePageComponent),
		title: 'Mesaj ve Bildirim Merkezi'
	}
];
