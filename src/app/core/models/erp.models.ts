export type CrudValue = string | number | boolean | null;

export type CrudFieldType = 'text' | 'number' | 'currency' | 'date' | 'select' | 'textarea' | 'status';

export interface CrudField {
  key: string;
  label: string;
  type: CrudFieldType;
  required?: boolean;
  options?: string[];
}

export interface CrudSummary {
  label: string;
  value: string;
  tone: 'positive' | 'warning' | 'neutral';
}

export type ModuleLayoutVariant =
  | 'ledger'
  | 'people'
  | 'pipeline'
  | 'procurement'
  | 'factory'
  | 'formula'
  | 'utility'
  | 'balance'
  | 'settings'
  | 'identity'
  | 'catalog'
  | 'fleet'
  | 'service'
  | 'vendor'
  | 'consumption';

export interface ModuleInsightCard {
  title: string;
  value: string;
  note: string;
  tone: 'positive' | 'warning' | 'neutral';
}

export interface ModuleFormSection {
  title: string;
  description: string;
  fieldKeys: string[];
  emphasis: 'accent' | 'soft' | 'outline';
}

export interface ModuleUiSchema {
  variant: ModuleLayoutVariant;
  heroTitle: string;
  heroNote: string;
  quickFacts: string[];
  insightCards: ModuleInsightCard[];
  formSections: ModuleFormSection[];
  tableFocusLabel: string;
  reviewTitle: string;
  emptyReviewText: string;
}

export interface CrudRecord {
  id: string;
  [key: string]: CrudValue;
}

export interface CrudModule {
  id: string;
  title: string;
  navLabel: string;
  description: string;
  section: string;
  badge: string;
  accent: string;
  fields: CrudField[];
  summary: CrudSummary[];
  items: CrudRecord[];
  ui?: ModuleUiSchema;
}

export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
  read: boolean;
  level: 'info' | 'success' | 'warning';
}

export interface ChatMessage {
  id: string;
  author: string;
  team: string;
  content: string;
  createdAt: string;
  incoming: boolean;
}
