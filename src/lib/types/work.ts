export interface WorkItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  category: string;
  year: string;
  type: "Webアプリ" | "Webサイト";
}

export type FilterType = "All" | "Webアプリ" | "Webサイト";
