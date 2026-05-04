import { Injectable, signal } from '@angular/core';
import { ERP_MODULES } from '../data/erp.modules';
import { CrudRecord } from '../models/erp.models';

@Injectable({ providedIn: 'root' })
export class ErpStoreService {
  private readonly state = signal<Record<string, CrudRecord[]>>(
    Object.fromEntries(ERP_MODULES.map((module) => [module.id, module.items]))
  );

  list(moduleId: string): CrudRecord[] {
    return this.state()[moduleId] ?? [];
  }

  upsert(moduleId: string, record: Omit<CrudRecord, 'id'> & Partial<Pick<CrudRecord, 'id'>>): void {
    this.state.update((current) => {
      const records = current[moduleId] ?? [];
      const recordId = record.id || this.createId(moduleId);
      const normalized = { ...record, id: recordId } as CrudRecord;
      const existingIndex = records.findIndex((item) => item.id === recordId);

      if (existingIndex >= 0) {
        const updated = [...records];
        updated[existingIndex] = normalized;
        return { ...current, [moduleId]: updated };
      }

      return { ...current, [moduleId]: [normalized, ...records] };
    });
  }

  remove(moduleId: string, recordId: string): void {
    this.state.update((current) => ({
      ...current,
      [moduleId]: (current[moduleId] ?? []).filter((item) => item.id !== recordId)
    }));
  }

  private createId(moduleId: string): string {
    const suffix = Math.random().toString(36).slice(2, 8);
    return `${moduleId}-${suffix}`;
  }
}
