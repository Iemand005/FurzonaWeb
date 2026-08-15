// global.d.ts

interface FurzonaCategory {
  pos: number;
  icon: string;
  text: string;
}

interface FurzonaWarning {
  pos: number;
  serious: boolean;
  text: string;
}

interface FurzonaNsfwWarning {
  pos: number;
  text: string;
}

/** Shared shape for both mod and admin entries */
interface FurzonaStaffMember {
  id: string;
  username: string;
  /** User bio/description, may contain \n and @links */
  d: string;
  /** Icon image path */
  i: string;
  /** Banner image path */
  b: string;
  /** Priority/rank */
  p: number;
  /** Is a mod flag */
  m: boolean;
  /** Tag string, e.g. "Mod#5c3604#ffa32b" */
  t: string;
  h: number;
  o: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface FurzonaResult {
  categories: FurzonaCategory[];
  warnings: FurzonaWarning[];
  nsfwWarnings: FurzonaNsfwWarning[];
  version: number;
  amazonVersion: number;
  least: number;
  updateUrl: string;
  contentUrl: string;
  mods: FurzonaStaffMember[];
  admins: FurzonaStaffMember[];
  maxImages: number;
}

interface FurzonaConfigResponse {
  result: FurzonaResult;
}