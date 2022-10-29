import ClassNames from "@codevachon/classnames";
import { dayjs } from "./../libs/dayjs";
import { FC, Fragment } from "react";
import { IFeedItemRecord } from "./types";
import { Transition } from "@headlessui/react";

export const FeedItem: FC<{ item: IFeedItemRecord }> = ({ item }) => (
    <Transition
        as={Fragment}
        appear={true}
        show={true}
        enter="transition transform duration-500"
        enterFrom="opacity-0 -translate-y-12"
        enterTo="opacity-100 translate-y-0"
        leave="transition transform duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
        <li className={new ClassNames(["flex items-start space-x-2"]).list()}>
            <div className={new ClassNames(["py-1"]).list()}>
                <p
                    className={new ClassNames(["h-4 w-4 rounded-full bg-green-500"])
                        .add({
                            "bg-red-800": item.action === "Deleted",
                            "bg-orange-600": item.action === "Edited"
                        })
                        .list()}
                ></p>
            </div>
            <div className={new ClassNames(["flex-grow"]).list()}>
                <div>
                    <span className={new ClassNames(["font-bold"]).list()}>{item.name}</span>{" "}
                    <span
                        className={new ClassNames(["font-bold text-green-700"])
                            .add({
                                "text-red-800": item.action === "Deleted",
                                "text-orange-600": item.action === "Edited"
                            })
                            .list()}
                    >
                        {item.action}
                    </span>{" "}
                    a <span className={new ClassNames(["text-sky-800"]).list()}>{item.thing}</span>
                </div>
                <div>
                    <p
                        className={new ClassNames(["text-xs text-slate-500"]).list()}
                        title={dayjs(item.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                    >
                        {dayjs(item.timestamp).fromNow()}
                    </p>
                </div>
            </div>
        </li>
    </Transition>
);
