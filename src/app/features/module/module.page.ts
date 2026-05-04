import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getCrudModule } from '@erp/core/data/erp.modules';
import { CrudField, CrudModule, CrudRecord, CrudValue, ModuleFormSection, ModuleUiSchema } from '@erp/core/models/erp.models';
import { ErpStoreService } from '@erp/core/services/erp-store.service';

interface ResolvedFormSection extends ModuleFormSection {
  fields: CrudField[];
}

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
  protected readonly ui: ModuleUiSchema = this.module.ui ?? {
    variant: 'ledger',
    heroTitle: this.module.title,
    heroNote: this.module.description,
    quickFacts: [],
    insightCards: [],
    formSections: [
      {
        title: 'Kayıt alanları',
        description: 'Bu modüle ait tüm alanlar.',
        fieldKeys: this.module.fields.map((field) => field.key),
        emphasis: 'soft'
      }
    ],
    tableFocusLabel: 'Kayıt listesi',
    reviewTitle: 'Kayıt inceleme',
    emptyReviewText: 'Bir kayıt seçildiğinde detay görünümü burada açılır.'
  };
  protected readonly search = signal('');
  protected readonly editingId = signal<string | null>(null);
  protected readonly selectedRecordId = signal<string | null>(null);
  protected readonly moduleVariantClass = computed(() => `module-variant-${this.ui.variant}`);
  protected readonly records = computed(() => this.store.list(this.module.id));
  protected readonly formSections = computed<ResolvedFormSection[]>(() =>
    this.ui.formSections.map((section) => ({
      ...section,
      fields: section.fieldKeys
        .map((key) => this.module.fields.find((field) => field.key === key))
        .filter((field): field is CrudField => !!field)
    }))
  );
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

  protected trackSection(_: number, section: ResolvedFormSection): string {
    return section.title;
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

  protected sectionClass(section: ResolvedFormSection): string {
    return `form-section-${section.emphasis}`;
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
