export interface RawArchiveItem {
  kind: string;
  title: string;
  text: string;
  image?: string;
  priority?: string;
  display_context?: string;
  display_hint?: string;
  tags?: string[];
  credit?: string;
  sources?: Array<{
    label: string;
    url: string;
  }>;
  panel?: any;
}

export declare const elementArchives: Record<number, RawArchiveItem[]>;
