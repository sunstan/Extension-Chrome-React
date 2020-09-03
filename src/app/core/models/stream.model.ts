export interface IStream {
    readonly id?: string;
    readonly user_id?: string;
    readonly user_name?: string;
    readonly game_id?: string;
    readonly type?: 'live'|'';
    readonly title?: string;
    readonly viewer_count?: number;
    readonly strated_at?: string;
    readonly language?: string;
    readonly thumbnail_url?: string;
}
