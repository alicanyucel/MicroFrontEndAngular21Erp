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
