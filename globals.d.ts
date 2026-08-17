// global.d.ts

type Method = "GET" | "POST" | "DELETE";

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

interface FurzonaSettings {
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

interface FurzonaResponse<T> {
	result: T;
}

interface FurzonaPost {
	id: string;
	/** title */
	t?: string;
	/** description/caption */
	d?: string;
	/** content/body text, used for longer text posts */
	c?: string;
	/** artist — attribution/credit text (e.g. "written by me", source name) */
	a?: string;
	/** source — NOT present in this interface yet, seen in key-map as "s" */
	s?: unknown;
	/** categories — positions, matching FurzonaCategory.pos */
	e: number[];
	/** warnings — positions, matching FurzonaWarning.pos */
	w: number[];
	/** nsfwWarnings — positions, matching FurzonaNsfwWarning.pos */
	n: number[];
	/** media — image paths */
	m: string[];
	/** likes — like count */
	l: number;
	/** comments — comment count */
	o: number;
	/** hidden */
	h: boolean;
	/** nsfw */
	f: boolean;
	/** liked — whether the current user has liked this post */
	z: boolean;
	/** type — post type discriminator */
	y: number;
	/** user — author of the post */
	u: FurzonaPostAuthor;
	/** reference — NOT present in this interface yet, seen in key-map as "x" */
	x?: unknown;
	/** ddl — boolean flag, exact meaning unconfirmed (possibly "direct download link") */
	k: boolean;
	/** specialType — string enum or null, exact values unconfirmed */
	i: string | null;
	/** poll — NOT present in this interface yet, seen in key-map as "p" */
	p?: FurzonaPoll;
	/** width — image width, present only on posts with media */
	b?: number;
	/** height — image height, present only on posts with media */
	g?: number;
	/** invite — group/GC invite code, seen on "New GC" style posts */
	j?: string;
	/** emojis */
	q: unknown[];
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

interface FurzonaUser {
	username: string;
	/** description — user's bio */
	d?: string;
	/** icon — avatar image path */
	i?: string;
	/** banner — banner image path */
	b?: string;
	/** permLevel — permission/role level, exact scale unconfirmed */
	p: number;
	/** sessionToken */
	s?: string;
	email: string;
	age: number;
	/** nsfw — whether NSFW content is enabled for this user */
	n: boolean;
	/** dpm — meaning unconfirmed */
	m: unknown;
	/** emailVerified */
	v: boolean;
	/** warns — warning count */
	w: number;
	/** tag — discriminator/badge tag string */
	t?: string;
	/** behaviourPoints */
	h: number;
	/** safeMode */
	o: boolean;
	/** userIcons — unlocked/available icon options */
	c: string[];
}

interface FurzonaComment {
	/** id — comment id */
	id: string;
	/** u — author of the comment */
	u: FurzonaPostAuthor;
	/** c — comment text/content */
	c: string;
	/** s — reply count */
	s: number;
	/** l — like count */
	l: number;
	/** d — whether the current user has liked this comment */
	d: boolean;
	/** t — deleted flag */
	t: boolean;
	/** e — emojis */
	e: unknown[];
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

interface FurzonaPoll {
	title: string;
	/** participants — total vote/participant count */
	p: number;
	/** multiple — whether multiple options can be selected */
	m: boolean;
	options: FurzonaPollOption[];
	/** voted — whether the current user has voted */
	v: boolean;
	/** isOwner — whether the current user created this poll */
	i: boolean;
}

interface FurzonaPollOption {
	text: string;
	/** votedUsers — vote count for this option */
	u: number;
	/** voted — whether the current user voted for this option */
	v: boolean;
}

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

interface FurzonaCredentials {
	email: string;
	password: string;
}

interface FurzonaSignupRequest extends FurzonaCredentials {
	gte16: boolean;
}

interface LikeToggleResult {
	liked: boolean;
	likes: number;
}

interface FurzonaError {
	error: string;
	errorCode: number;
}

type FavoritePost = { post: string };

interface FollowToggleResult {
	following: boolean;
}

interface CommentCreateRequest {
	post: string;
	content: string;
}

interface SearchRequest {
	q: string;
	nsfw?: number;
	hidden?: number;
	catSelector?: number;
	warnSelector?: number;
	nsfwSelector?: number;
}

interface ForgotPasswordRequest {
	email: string;
}

/** POST /followers and /following both take a single userId */
interface UserIdRequest {
	userId: string;
}

interface ChatMuteRequest {
	/** chat id */
	chat: string;
}

interface SendMessageRequest {
	text: string;
	/** optional chat id — unconfirmed whether it is required for 1:1 vs group chats */
	chat?: string;
}

interface SubscribeRequest {
	/** Integer subscription type. Observed values 0..5 all pass validation; the enum is unconfirmed. */
	type: number;
}

interface ReportRequest {
	/** Required reason text */
	reason: string;
	/** Target post — unconfirmed field name */
	post?: string;
	/** Target user — unconfirmed field name */
	user?: string;
}

/**
 * Shape unconfirmed (auth-gated; not observable without a token).
 * Treat as opaque until a token is available to inspect it.
 */
interface FurzonaNotification {
	[key: string]: unknown;
}

/** Shape unconfirmed (auth-gated) */
interface FurzonaChat {
	[key: string]: unknown;
}

/** Shape unconfirmed (auth-gated) */
interface FurzonaChatMessage {
	[key: string]: unknown;
}

/** Shape unconfirmed (auth-gated) */
interface FurzonaBadge {
	[key: string]: unknown;
}

interface ApiEndpoints {
	[endpoint: string]: {
		body?: unknown;
		response: unknown;
	};
	login: {
		body: LoginRequest;
		response: FurzonaUser;
	};
	user: {
		body: FurzonaSignupRequest;
		response: FurzonaUser;
	};
	profile: {
		response: FurzonaProfile;
	};
	post: {
		response: FurzonaPost;
	};
	posts: {
		body: { date?: number };
		response: FurzonaPost[];
	};
	favorite: {
		body: FavoritePost;
		response: LikeToggleResult;
	};
	unfavorite: {
		body: FavoritePost;
		response: LikeToggleResult;
	};
	settings: {
		response: FurzonaSettings
	},
	commentLevels: {
		response: FurzonaComment[];
	};
	comment: {
		body: CommentCreateRequest;
		response: FurzonaComment;
	};
	follow: {
		body: { userId: string };
		response: FollowToggleResult;
	};
	unfollow: {
		body: { userId: string };
		response: FollowToggleResult;
	};
	block: {
		body: { user: string };
		response: unknown;
	};
	unblock: {
		body: { user: string };
		response: unknown;
	};
	user: {
		response: FurzonaUserBase;
	};
	search: {
		body: SearchRequest;
		response: (FurzonaPost | FurzonaUserBase)[];
	};
	forgotPassword: {
		body: ForgotPasswordRequest;
		response: boolean;
	};
	followers: {
		body: UserIdRequest;
		response: FurzonaUserBase[];
	};
	following: {
		body: UserIdRequest;
		response: FurzonaUserBase[];
	};
	chat: {
		body: { userId: string };
		response: FurzonaChat;
	};
	chats: {
		response: FurzonaChat[];
	};
	message: {
		body: SendMessageRequest;
		response: FurzonaChatMessage;
	};
	mute: {
		body: ChatMuteRequest;
		response: unknown;
	};
	unmute: {
		body: ChatMuteRequest;
		response: unknown;
	};
	subscribe: {
		body: SubscribeRequest;
		response: unknown;
	};
	badges: {
		response: FurzonaBadge[];
	};
	upload: {
		response: unknown;
	};
	notifications: {
		response: FurzonaNotification[];
	};
	report: {
		body: ReportRequest;
		response: unknown;
	};
}