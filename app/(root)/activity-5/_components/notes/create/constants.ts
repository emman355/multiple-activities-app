export const categoryOptions = [
  { value: 'work', label: 'Work', color: 'bg-primary' },
  { value: 'personal', label: 'Personal', color: 'bg-secondary' },
  { value: 'ideas', label: 'Ideas', color: 'bg-accent' },
  { value: 'projects', label: 'Projects', color: 'bg-[#ea580c]' },
] as const;

export type CategoryValue = (typeof categoryOptions)[number]['value'];
