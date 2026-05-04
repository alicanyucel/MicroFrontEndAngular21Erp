import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getCrudModule } from '../../core/data/erp.modules';
import { CrudField, CrudModule, CrudRecord, CrudValue } from '../../core/models/erp.models';
import { ErpStoreService } from '../../core/services/erp-store.service';

@Component({
  selector: 'app-module-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './module.page.html',
  styleUrl: './module.page.css'
})
export class ModulePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(UntypedFormBuilder);
  private readonly store = inject(ErpStoreService);

  protected readonly module: CrudModule = getCrudModule(this.route.snapshot.data['moduleId'] as string);
  protected readonly search = signal('');
  protected readonly editingId = signal<string | null>(null);
  protected readonly selectedRecordId = signal<string | null>(null);
  protected readonly records = computed(() => this.store.list(this.module.id));
  protected readonly filteredRecords = computed(() => {
    const query = this.search().trim().toLocaleLowerCase('tr-TR');

    if (!query) {
      return this.records();
    }

    return this.records().filter((record) =>
      Object.entries(record).some(([key, value]) => key !== 'id' && String(value ?? '').toLocaleLowerCase('tr-TR').includes(query))
    );
  });
  protected readonly selectedRecord = computed(() => {
    const selectedId = this.selectedRecordId();

    if (!selectedId) {
      return null;
    }

    return this.records().find((record) => record.id === selectedId) ?? null;
  });

  protected readonly form: UntypedFormGroup = this.buildForm();

  constructor() {
    this.startCreate();
    this.selectedRecordId.set(this.records()[0]?.id ?? null);
  }

  protected trackField(_: number, field: CrudField): string {
    return field.key;
  }

  protected startCreate(): void {
    this.editingId.set(null);
    this.form.reset(this.emptyValueMap());
  }

  protected viewRecord(record: CrudRecord): void {
    this.selectedRecordId.set(record.id);
  }

  protected editRecord(record: CrudRecord): void {
    this.selectedRecordId.set(record.id);
    this.editingId.set(record.id);
    this.form.reset(this.valueMap(record));
  }

  protected saveRecord(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.upsert(this.module.id, {
      id: this.editingId() ?? undefined,
      ...this.form.getRawValue()
    });

    this.selectedRecordId.set(this.editingId() ?? this.records()[0]?.id ?? null);
    this.startCreate();
  }

  protected deleteRecord(recordId: string): void {
    this.store.remove(this.module.id, recordId);

    if (this.editingId() === recordId) {
      this.startCreate();
    }

    if (this.selectedRecordId() === recordId) {
      const nextRecord = this.records().find((record) => record.id !== recordId) ?? null;
      this.selectedRecordId.set(nextRecord?.id ?? null);
    }
  }

  protected cancelEdit(): void {
    this.startCreate();
  }

  protected formatCell(record: CrudRecord, field: CrudField): string {
    const rawValue = record[field.key];

    if (rawValue === null || rawValue === undefined || rawValue === '') {
      return '—';
    }

    if (field.type === 'currency') {
      return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(Number(rawValue));
    }

    if (field.type === 'date') {
      return new Intl.DateTimeFormat('tr-TR').format(new Date(String(rawValue)));
    }

    return String(rawValue);
  }

  protected toneClass(value: CrudValue): string {
    const normalized = String(value ?? '').toLocaleLowerCase('tr-TR');

    if (normalized.includes('risk') || normalized.includes('gecik') || normalized.includes('yaklaşı') || normalized.includes('acık') || normalized.includes('açık')) {
      return 'warning';
    }

    if (normalized.includes('aktif') || normalized.includes('kapandı') || normalized.includes('tamam')) {
      return 'positive';
    }

    return 'neutral';
  }

  protected isSelected(recordId: string): boolean {
    return this.selectedRecordId() === recordId;
  }

  private buildForm(): UntypedFormGroup {
    const controls = this.module.fields.reduce<Record<string, unknown>>((result, field) => {
      result[field.key] = [null, field.required ? Validators.required : []];
      return result;
    }, {});

    return this.formBuilder.group(controls);
  }

  private emptyValueMap(): Record<string, CrudValue> {
    return this.module.fields.reduce<Record<string, CrudValue>>((result, field) => {
      result[field.key] = field.type === 'number' || field.type === 'currency' ? 0 : '';
      return result;
    }, {});
  }

  private valueMap(record: CrudRecord): Record<string, CrudValue> {
    return this.module.fields.reduce<Record<string, CrudValue>>((result, field) => {
      result[field.key] = record[field.key] ?? '';
      return result;
    }, {});
  }
}
