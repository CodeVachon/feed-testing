export type FeedItemAction = "Created" | "Edited" | "Deleted";
export interface IFeedItemRecord {
    id: string;
    name: string;
    action: FeedItemAction;
    thing: string;
    timestamp: string;
}
