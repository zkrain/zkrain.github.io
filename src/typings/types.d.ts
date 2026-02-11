interface MATERIALS {
  Paper?: string;
  [key]?: string;
}

declare const paperCategories = ['va', 'vis+ai', 'application', 'hci', 'ai', 'mining', 'infovis', 'scivis', 'survey'] as const
type paperCategory = typeof paperCategories[number]

declare const tagCategories = ['Urban Computing', 'Trustworthy AI', 'Data Visualization', 'Vis Authoring', 'Large Language Model', 'Multimodality', 'Education', 'Empirical Study', 'Trajectory Analysis', 'Time Series', 'Layout Algorithm', 'Decision Making', 'CAD', 'Spatial Network', "Diagnosis", "3D"] as const
type tagCategory = typeof tagCategories[number]

interface PAPER {
  category: paperCategory[];
  tags: tagCategory[];
  thumb: string;
  title: string;
  authorsB: string;
  authorsA: string;
  type: "Journal" | "Conference" | "Other";
  year: number;
  abbr: string;
  full: string;
  honor: string;
  materials: MATERIALS;
}

export {
  MATERIALS,
  paperCategory,
  tagCategory,
  PAPER,
}