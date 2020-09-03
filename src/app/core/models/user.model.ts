export interface IUser {
    readonly id?: string;
    readonly type?: string;
    readonly login?: string;
    readonly description?: string;
    readonly display_name?: string;
    readonly broadcaster_type?: string;
    readonly offline_image_url?: string;
    readonly profile_image_url?: string;
    readonly view_count?: number;
}
