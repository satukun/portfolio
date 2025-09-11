export interface TechCategory {
  name: string;
  icon: string;
  technologies: TechItem[];
}

export interface TechItem {
  name: string;
  level: number; // 1-5のレベル
  description: string;
}
