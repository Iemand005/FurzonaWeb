// global.d.ts

type Method = "GET" | "POST";

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


interface LoginRequest {
	email: string;
	password: string;
}

interface FurzonaUserBase {
	id: string;
	username: string;
	/** Bio/description, may contain \n */
	d: string;
	/** Icon image path, null if not set */
	i: string | null;
	/** Banner image path, null if not set */
	b: string | null;
	/** Priority/rank */
	p: number;
	m: boolean;
	/** Tag string, null if unset */
	t: string | null;
	h: number;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

/** Full user object, e.g. from /login */
interface FurzonaUser extends FurzonaUserBase {
	/** Token */
	s: string;
	/** Email address */
	e: string;
	/** Account type/age? */
	a: number;
	n: boolean;
	/** Verified flag */
	v: boolean;
	/** Warnings array — likely indices matching FurzonaWarning.pos */
	w: number[];
}

/** Author summary embedded in a post — subset of FurzonaUser fields, plus `o` */
interface FurzonaPostAuthor extends FurzonaUserBase {
	o: boolean;
}

type LoginResponse = FurzonaResponse<FurzonaUser>;

interface FurzonaResponse<T> {
	result: T;
}

interface FurzonaPost {
	id: string;
	/** Title, optional — some posts omit it */
	t?: string;
	/** Description/caption text */
	d?: string;
	/** Content/body text, used for longer text posts */
	c?: string;
	/** Attribution/credit text (e.g. "written by me", source name) */
	a?: string;
	/** Category positions, matching FurzonaCategory.pos */
	e: number[];
	/** Warning positions, matching FurzonaWarning.pos */
	w: number[];
	/** NSFW warning positions, matching FurzonaNsfwWarning.pos */
	n: number[];
	/** Media image paths */
	m: string[];
	l: number;
	o: number;
	h: boolean;
	f: boolean;
	z: boolean;
	y: number;
	u: FurzonaPostAuthor;
	k: boolean;
	/** Unknown, seen only as null */
	i: string | null;
	/** Image width, present only on posts with media */
	b?: number;
	/** Image height, present only on posts with media */
	g?: number;
	/** Group/GC invite code, seen on "New GC" style posts */
	j?: string;
	q: unknown[];
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

interface FurzonaPostsResponse {
	result: FurzonaPost[];
}

type FurzonaPostResponse = FurzonaResponse<FurzonaPost>;

interface FurzonaProfileStats {
	posts: number;
	liked: number;
	likes: number;
	commented: number;
	comments: number;
	followed: number;
	followers: number;
}

interface FurzonaProfile {
	user: FurzonaPostAuthor;
	following: boolean;
	stats: FurzonaProfileStats;
	/** Unknown shape, seen only as null — likely ban details/reason when present */
	ban: unknown | null;
	blocked: boolean;
	/** Unknown shape, seen only as null */
	featured: unknown | null;
	online: boolean;
}

type ProfileResponse = FurzonaResponse<FurzonaProfile>;

interface LikeToggleResult {
	liked: boolean;
	likes: number;
}

type LikeToggleResponse = FurzonaResponse<LikeToggleResult>;

interface ApiEndpoints {
	login: {
		body: LoginRequest;
		response: FurzonaUser;
	};
	user: {
		body: { userId: number };
		response: FurzonaUser;
	};
	profile: {
		body: undefined;
		response: FurzonaProfile;
	};
	post: {
		body: undefined;
		response: FurzonaPost;
	};
	posts: {
		body: { date?: number };
		response: FurzonaPost[];
	};
	favorite: {
		body: { post: string };
		response: LikeToggleResult;
	};
}