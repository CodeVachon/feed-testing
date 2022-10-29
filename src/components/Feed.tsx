import ClassNames from "@codevachon/classnames";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import Button from "./Button";
import type { IFeedItemRecord } from "./types";
import { SectionHeading } from "./Typography";
import { FeedItem } from "./FeedItem";

export const Feed: FC = () => {
    const [items, setItems] = useState<Array<IFeedItemRecord>>([]);
    const [lastId, setLastId] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getFeedItems = (lastId?: string) => {
        setIsLoading(true);
        axios({
            method: "GET",
            url: "/api/feed",
            params: {
                last_id: lastId
            }
        })
            .then((response) => {
                if (response.data.length > 0) {
                    setItems((data) => {
                        return [...response.data, ...data].splice(0, 25);
                    });
                    setLastId(response.data[0].id);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getFeedItems(lastId);

        const refresh = setInterval(() => {
            getFeedItems(lastId);
        }, 1500);

        return () => {
            clearInterval(refresh);
        };
    }, [lastId]);

    return (
        <div className={new ClassNames(["flex h-full flex-col"]).list()}>
            <SectionHeading>Data Feed</SectionHeading>
            <ol
                className={new ClassNames([
                    "mt-6 py-2",
                    "flex max-h-[40vh] flex-grow flex-col space-y-4 overflow-y-scroll"
                ]).list()}
            >
                {items.map((item) => (
                    <FeedItem key={item.id} item={item} />
                ))}
            </ol>
            <div className={new ClassNames(["border-t py-2"]).list()}>
                <p>
                    Last ID:
                    <span
                        className={new ClassNames([
                            "inline-block rounded bg-slate-200 p-1.5 font-mono text-xs"
                        ]).list()}
                    >
                        {lastId}
                    </span>
                    {isLoading && <span>...</span>}
                </p>
            </div>
            <div className={new ClassNames(["flex space-x-2"]).list()}>
                <Button
                    onClick={() => {
                        setItems([]);
                        setLastId(undefined);
                    }}
                >
                    Clear
                </Button>
                <Button
                    onClick={() => {
                        getFeedItems(lastId);
                    }}
                >
                    fetch
                </Button>
            </div>
        </div>
    );
};
