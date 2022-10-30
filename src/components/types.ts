export type FeedItemAction = "Created" | "Edited" | "Deleted";
export type FeedItemThing = "Project" | "Test" | "User";
export interface IFeedItemRecord {
    id: string;
    name: string;
    action: FeedItemAction;
    thing: FeedItemThing;
    timestamp: string;
}
