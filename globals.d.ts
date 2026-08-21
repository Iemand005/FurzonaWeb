
// RequestService

type Method = "GET" | "POST" | "DELETE" | "PUT";

type EndpointPath<K extends keyof ApiEndpoints> = K | [K, ...string[]];
type ResponseBody<K extends keyof ApiEndpoints> = Promise<ApiEndpoints[K]["response"]>;

type ApiRequestFn = <K extends keyof ApiEndpoints>(endpoint: EndpointPath<K>, method?: Method, body?: ApiEndpoints[K]["body"]) => ResponseBody<K>;
type ApiSafeRequestFn = <K extends keyof ApiEndpoints>(endpoint: EndpointPath<K>, method?: Method, body?: ApiEndpoints[K]["body"], attempt?: number) => ResponseBody<K>;
type ReadEndpointFn = <K extends keyof ApiEndpoints>(endpoint: EndpointPath<K>) => ResponseBody<K>;
type WriteEndpointFn = <K extends keyof ApiEndpoints>(endpoint: EndpointPath<K>, body?: ApiEndpoints[K]["body"]) => ResponseBody<K>;
type ProbeEndpointFn = <K extends keyof ApiEndpoints>(endpoint: EndpointPath<K>) => Promise<void>;

// Furzona API

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
	/** whether this account/token is suspended — Android client checks this before parsing the rest */
	suspended?: boolean;
	/** active bans for the account */
	bans?: FurzonaBan[];
	/** custom emojis */
	emojis?: FurzonaEmoji[];
	/** subscribed push/notification types (ints, see SubscribeRequest) */
	subs?: number[];
	/** news counter — defaults 0 when absent */
	news?: number;
	/** message counter — defaults 0 when absent */
	msgs?: number;
	/** safe mode view enabled — defaults false when absent */
	smv?: boolean;
}

/** Ban object from GET /settings `bans` (Android Ban.parseBan) */
interface FurzonaBan {
	id: string;
	/** ban type discriminator — defaults 0 when absent/null */
	type: number;
	reason: string;
	/** when the ban expires — date string */
	until: string;
	/** mod/admin who issued the ban */
	issuer: FurzonaPostAuthor;
	/** whether the ban has been lifted — defaults false when absent/null */
	unbanned: boolean;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

/** Shape from the Android client's Emoji.parseEmoji — exact fields unconfirmed */
interface FurzonaEmoji {
	[key: string]: unknown;
}

/** Shape from the Android client's Log.parseLog — exact fields unconfirmed */
interface FurzonaLog {
	[key: string]: unknown;
}

/** GET /adminStatus response (Android ServerInfo) */
interface FurzonaServerInfo {
	/** users parsed from the "fcm" child object */
	fcm: FurzonaUserBase[];
	serverBattery: number;
	serverBatteryStatus: string;
	objectStats: string;
}

interface LoginRequest {
	email: string;
	password: string;
}

interface FurzonaUserBase {
	/** id — user id */
	id: string;
	/** username */
	username: string;
	/** description — user's bio, may contain \n */
	d: string;
	/** icon — avatar image path */
	i: string | null;
	/** banner — banner image path */
	b: string | null;
	/** permLevel — permission/role level */
	p: PermissionLevel;
	/** dpm — disable profile media (confirmed via Android client's Editor.setProfileMediaDisabled) */
	m: boolean;
	/** tag — discriminator/badge tag string */
	t: string | null;
	/** behaviourPoints */
	h: number;
	/**
	 * Also confirmed on the Android client but JSON key letters not yet mapped:
	 * linked (boolean, defaults false). Note dpm defaults TRUE when absent on
	 * public user objects.
	 */
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

/** Full user object, e.g. from /login */
interface FurzonaUser extends FurzonaUserBase {
	/** sessionToken */
	s: string;
	/** email — user's email address */
	e: string;
	/** age — account age */
	a: number;
	/** nsfw — whether NSFW content is enabled for this user */
	n: boolean;
	/** emailVerified */
	v: boolean;
	/** warns — warning indices, matching FurzonaWarning.pos */
	w: number[];
	/** safeMode */
	o: boolean;
	/** userIcons — icon unlock count/level (parsed as an int by the Android client) */
	c: number;
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

enum PermissionLevel {
	User = 0,
	Moderator = 1,
	Admin = 2
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

/**
 * Poll object embedded in a post (Android Poll.parsePoll).
 * Field letters confirmed against PollMapping getters: p=participants,
 * m=multiple, v=voted, i=isOwner.
 */
interface FurzonaPoll {
	id: string;
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
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

interface FurzonaPollOption {
	id: string;
	text: string;
	/** votedUsers — vote count for this option */
	u: number;
	/** voted — whether the current user voted for this option */
	v: boolean;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

/** POST /submitPolls body — cast votes for a poll */
interface SubmitPollRequest {
	/** poll id */
	poll: string;
	/** selected option ids */
	options: string[];
}

/** POST /viewPollResults body */
interface ViewPollResultsRequest {
	/** poll id */
	poll: string;
}

/** Per-option result entry returned by /submitPolls and /viewPollResults, keyed by option id */
interface PollOptionResult {
	voted: boolean;
	votedUsers: number;
}

/** POST /submitPolls response */
interface SubmitPollResult {
	/** whether the vote registered */
	__voted: boolean;
	/** new total participant count */
	__participants: number;
	/** per-option results keyed by option id */
	[optionId: string]: PollOptionResult | boolean | number;
}

/** POST /viewPollResults response — per-option results keyed by option id */
interface PollResultsResult {
	[optionId: string]: PollOptionResult;
}

/** Poll payload attached to POST /post when creating a poll (Android Poll.getNetworkData) */
interface CreatePollRequest {
	title: string;
	/** whether multiple options can be selected */
	multiple: boolean;
	/** plain-text option labels */
	options: string[];
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
	/** active ban details when present */
	ban: FurzonaBan | null;
	blocked: boolean;
	/** pinned/featured post when present */
	featured: FurzonaPost | null;
	/** defaults false when absent */
	online: boolean;
	/** account age — defaults -1 when absent */
	age?: number;
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

enum ErrorCode {
	Unknown = -1,
	Deprecated = 2,
	NogLoggedIn = 5
}

interface FurzonaErrorResponse {
	error: string;
	errorCode: ErrorCode;
}

type FavoritePost = { post: string };

type FavoriteComment = { comment: string };

interface FollowToggleResult {
	following: boolean;
	/** the target user's new follower count (confirmed via Android follow/unfollow) */
	followers: number;
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

interface NewSearchRequest {
	/** free-text query (web client); the Android client splits this into title/content instead */
	query?: string;
	/** nsfw filter mode — Android always sends it (0 by default) */
	nsfw?: number;
	/** hidden filter mode — Android always sends it (0 by default) */
	hidden?: number;
	/** match against post title */
	title?: string;
	/** match against post content/description */
	content?: string;
	/** category selector mode — Android always sends it (0 by default) */
	catSelector?: number;
	/** category positions, matching FurzonaCategory.pos */
	categories?: number[];
	/** warning selector mode — Android always sends it (0 by default) */
	warnSelector?: number;
	/** warning positions, matching FurzonaWarning.pos */
	warnings?: number[];
	/** nsfw warning selector mode — Android always sends it (0 by default) */
	nsfwSelector?: number;
	/** nsfw warning positions, matching FurzonaNsfwWarning.pos */
	nsfwWarnings?: number[];
	/** filter by author username/id */
	postedBy?: string;
	/** search tab index (Android advancedSearchQuick/advancedSearchPosts) */
	tab?: number;
	/** set true to search users instead of posts (Android advancedSearchUsers) */
	users?: boolean;
}

/** POST /newSearch result — posts and matching users */
interface FurzonaNewSearchResult {
	/** posts */
	p: FurzonaPost[];
	/** users */
	u: FurzonaUserBase[];
}

/** Discriminator for notification objects returned by GET /data/{id} */
type FurzonaNotificationType =
	| "mention-post"
	| "mention-comment"
	| "follow"
	| "unfollow"
	| "comment"
	| "reply"
	| "suspended"
	| (string & {});

/**
 * Mirrors the native notifier's `PNRes` object (see the C# NotifBackground task).
 * Field names may differ between the raw API JSON and the C# model — treat as best-effort.
 */
interface FurzonaNotificationObject {
	/** Type discriminator */
	__type: FurzonaNotificationType;
	/** Present for mention-post / mention-comment — carries the post and its author */
	PostM?: { user: FurzonaPostAuthor };
	/** Present for follow / unfollow — the other user */
	UserM?: FurzonaUserBase;
	/** Present for comment — content read via `.Content` in the C# notifier */
	CommentM?: FurzonaComment;
	/** Present for reply — content read via `.Content` in the C# notifier */
	CommentR?: FurzonaComment;
	[key: string]: unknown;
}

/** GET /data/{id} response (after the `result` wrapper is unwrapped) */
interface FurzonaNotificationResponse {
	obj: FurzonaNotificationObject;
}

interface ForgotPasswordRequest {
	email: string;
}

interface VerifyEmailRequest {
	/** Verification / password-reset code sent by email */
	code: string;
}

interface BanRequest {
	userId: string;
	reason: string;
	period: number;
}

/** PUT /user — profile edit (Android LocalUser.Editor.apply); only provided fields are sent */
interface EditUserRequest {
	username?: string;
	description?: string;
	/** uploaded icon file id/path */
	icon?: string;
	/** uploaded banner file id/path */
	banner?: string;
	email?: string;
	age?: number;
	nsfw?: boolean;
	/** disable profile media */
	dpm?: boolean;
	/** warning positions, matching FurzonaWarning.pos */
	warns?: number[];
}

/** PUT /password — change password; responds with a fresh session token */
interface ResetPasswordRequest {
	password: string;
}

/** PUT /password response — new session token under the user key "s" */
interface PasswordResetResult {
	s: string;
}

/** POST /adminLogs and POST /modLogs body */
interface AdminLogsRequest {
	query?: string;
	/** epoch ms (UTC) — fetch logs before this timestamp */
	date?: number;
}

/** POST /exec — run a server command (admin) */
interface ExecRequest {
	cmd: string;
}

/** POST /safeModeView */
interface SafeModeViewRequest {
	enabled: boolean;
}

/** Group/GC search query — shared by POST /users and POST /groups */
interface UserOrGroupSearchRequest {
	query: string;
}

/** POST /editGroup — takes at least `chat`; other allowed fields unconfirmed */
interface EditGroupRequest {
	/** chat id */
	chat: string;
	[key: string]: unknown;
}

/** POST /post — only `type` is confirmed required; the rest map to FurzonaPost keys */
interface CreatePostRequest {
	/** post type discriminator (numeric): 0 = text, 1 = image/media */
	type: number;
	/** title */
	title?: string;
	/** content/body text */
	text?: string;
	/** media paths (from /upload) — field name unconfirmed */
	media?: string[];
	/** poll payload when the post is a poll (Android Poll.getNetworkData) */
	poll?: CreatePollRequest;
	[key: string]: unknown;
}

interface GetPostsRequest {
	/** Date before which post to search */
	date?: number;
	/** Post cagegory I dunno yet what this uh are */
	category?: string;
}

/**
 * Public group shape from POST /groups.
 * Field order observed: id, t, description, m, i, createdAt, updatedAt.
 */
interface FurzonaGroup {
	id: string;
	/** title/name */
	t: string;
	/** description */
	description: string | null;
	/** member count */
	m: number;
	/** icon image path, null when unset */
	i: string | null;
	createdAt: string;
	updatedAt: string;
}

/** POST /followers and /following both take a single userId */
interface UserIdRequest {
	userId: string;
}

/** POST /followers, /following and /getAlts — userId plus optional epoch-ms pagination cursor */
interface UserListRequest {
	userId: string;
	/** epoch ms (UTC) — fetch entries before this timestamp */
	date?: number;
}

/** POST /modUsers — mod-visible user list, paginated by date */
interface DatePageRequest {
	/** epoch ms (UTC) — fetch entries before this timestamp */
	date?: number;
}

/** POST /modNote — attach a mod note to a user */
interface ModNoteRequest {
	userId: string;
	note: string;
}

/** POST /suspendUser */
interface SuspendUserRequest {
	userId: string;
	reason: string;
}

/** POST /purge and POST /deleteAllComments — target by `user` id */
interface TargetUserRequest {
	user: string;
}

/** POST /changeTag (admin) */
interface ChangeTagRequest {
	user: string;
	tag: string;
}

/** POST /changePermLevel (admin) */
interface ChangePermLevelRequest {
	user: string;
	permLevel: PermissionLevel;
}

/** POST /award (admin) — grant behaviour points */
interface AwardRequest {
	userId: string;
	points: number;
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

/**
 * POST /report — create a report. Exactly one target id is set depending on
 * what is being reported (post, comment or user) — confirmed via the Android
 * client's Report.reportPost/reportComment/reportUser.
 */
interface ReportRequest {
	/** Required reason text */
	reason: string;
	/** Target post id (reportPost) */
	post?: string;
	/** Target comment id (reportComment) */
	comment?: string;
	/** Target user id (reportUser) */
	user?: string;
	/** uploaded evidence files */
	attachments?: ReportAttachmentInput[];
}

/** Attachment entry sent with POST /report */
interface ReportAttachmentInput {
	/** media kind (Android names uploads image.jpg / gif.gif / video.mp4 per type) */
	type: AttachmentType;
	/** uploaded file id (from /upload) */
	file: string;
}

/** Attachment entry as returned on a FurzonaReport */
interface FurzonaAttachment {
	/** content path (resolvable against the content URL) */
	path: string;
	/** media kind */
	type: AttachmentType;
}

/**
 * Report object from GET /report/{id}, /postReports, /commentReports,
 * /userReports and POST /allReports (Android Report.parseReport).
 */
interface FurzonaReport {
	id: string;
	/** the user who filed the report — null when unavailable */
	reporter: FurzonaPostAuthor | null;
	reason: string;
	/** report type discriminator (int) */
	type: number;
	attachments: FurzonaAttachment[];
	/** present when a post was reported */
	post: FurzonaPost | null;
	/** present when a user was reported */
	user: FurzonaPostAuthor | null;
	/** present when a comment was reported */
	comment: FurzonaComment | null;
	/** defaults false when absent */
	resolved: boolean;
	/** mod currently assigned to this report */
	assigned: FurzonaPostAuthor | null;
	createdAt: string; // ISO date string
	updatedAt: string; // ISO date string
}

/** POST /allReports body — list every report before this timestamp */
interface AllReportsRequest {
	/** epoch ms (UTC) — pagination cursor */
	date?: number;
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

enum PostType {
	Text = 0
}

/**
 * Attachment media kind (Android Attachment.Raw.upload picks the upload
 * filename per type: 1 -> image.jpg, 2 -> gif.gif, anything else -> video.mp4).
 */
enum AttachmentType {
	Image = 1,
	Gif = 2,
	Video = 3
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
		/** POST /user = signup; PUT /user = profile edit (EditUserRequest); DELETE /user = delete account */
		body: FurzonaSignupRequest | EditUserRequest;
		/** POST/PUT return the full user; DELETE returns a success boolean */
		response: FurzonaUser | boolean;
	};
	profile: {
		response: FurzonaProfile;
	};
	post: {
		body: CreatePostRequest;
		response: FurzonaPost;
	};
	posts: {
		body: GetPostsRequest;
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
	likeComment: {
		body: FavoriteComment;
		response: LikeToggleResult;
	};
	unlikeComment: {
		body: FavoriteComment;
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
	search: {
		body: SearchRequest;
		response: (FurzonaPost | FurzonaUserBase)[];
	};
	newSearch: {
		body: NewSearchRequest;
		response: FurzonaNewSearchResult;
	};
	data: {
		response: FurzonaNotificationResponse;
	};
	forgotPassword: {
		body: ForgotPasswordRequest;
		response: boolean;
	};
	followers: {
		body: UserListRequest;
		response: FurzonaUserBase[];
	};
	following: {
		body: UserListRequest;
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
	/** POST /report = file a report; GET /report/{id} = fetch one; DELETE /report/{id} = remove one (mod) */
	report: {
		body: ReportRequest;
		response: boolean | FurzonaReport;
	};
	/** GET /assignReport/{id} — claim a report (mod) */
	assignReport: {
		response: boolean;
	};
	/** GET /reviewed/{id} — whether a report has been reviewed */
	reviewed: {
		response: boolean;
	};
	/** GET /postReports — post reports queue (mod) */
	postReports: {
		response: FurzonaReport[];
	};
	/** GET /commentReports — comment reports queue (mod) */
	commentReports: {
		response: FurzonaReport[];
	};
	/** GET /userReports — user reports queue (mod) */
	userReports: {
		response: FurzonaReport[];
	};
	/** POST /allReports — every report, paginated by date (mod) */
	allReports: {
		body: AllReportsRequest;
		response: FurzonaReport[];
	};
	verifyEmail: {
		body: VerifyEmailRequest;
		response: boolean;
	};
	users: {
		body: UserOrGroupSearchRequest;
		response: FurzonaUserBase[];
	};
	groups: {
		body: UserOrGroupSearchRequest;
		response: FurzonaGroup[];
	};
	chatTyping: {
		body: ChatMuteRequest;
		response: unknown;
	};
	ban: {
		body: BanRequest;
		response: unknown;
	};
	unban: {
		body: UserIdRequest;
		response: unknown;
	};
	groupInfo: {
		body: ChatMuteRequest;
		response: unknown;
	};
	editGroup: {
		body: EditGroupRequest;
		response: unknown;
	};
	/** GET /asUser/{id} — act as another user (admin) */
	asUser: {
		response: FurzonaUser;
	};
	/** PUT /password — change password, returns a fresh session token */
	password: {
		body: ResetPasswordRequest;
		response: PasswordResetResult;
	};
	/** POST /sendConsent — parental consent request */
	sendConsent: {
		body: LoginRequest;
		response: boolean;
	};
	/** POST /clearLogin — log out all devices */
	clearLogin: {
		response: boolean;
	};
	/** GET /adminStatus — server admin info (admin) */
	adminStatus: {
		response: FurzonaServerInfo;
	};
	/** POST /adminLogs — server logs (admin) */
	adminLogs: {
		body: AdminLogsRequest;
		response: FurzonaLog[];
	};
	/** POST /modLogs — mod logs (moderator) */
	modLogs: {
		body: AdminLogsRequest;
		response: FurzonaLog[];
	};
	/** POST /exec — run a server command (admin) */
	exec: {
		body: ExecRequest;
		response: string;
	};
	/** POST /sendVerificationEmail — resend the verification email */
	sendVerificationEmail: {
		response: boolean;
	};
	/** POST /wipeSpecial — wipe special posts (admin) */
	wipeSpecial: {
		response: boolean;
	};
	/** GET /ping — list online users */
	ping: {
		response: FurzonaUserBase[];
	};
	/** GET /pong/{id} — respond to another user's ping */
	pong: {
		response: boolean;
	};
	/** GET /cleanServer — clean the server (admin), returns affected count */
	cleanServer: {
		response: number;
	};
	/** POST /isEmailVerified — refresh + return email verification state */
	isEmailVerified: {
		response: boolean;
	};
	/** GET /setOnline — mark this session online */
	setOnline: {
		response: boolean;
	};
	/** POST /safeModeView — toggle safe mode view */
	safeModeView: {
		body: SafeModeViewRequest;
		response: boolean;
	};
	/** POST /submitPolls — cast votes on a poll */
	submitPolls: {
		body: SubmitPollRequest;
		response: SubmitPollResult;
	};
	/** POST /viewPollResults — reveal per-option results for a poll */
	viewPollResults: {
		body: ViewPollResultsRequest;
		response: PollResultsResult;
	};
}

type ProbeResult = { endpoint: string, methods: Method[] };