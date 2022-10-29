import ClassNames from "@codevachon/classnames";
import { Transition } from "@headlessui/react";
import axios from "axios";
import { FC, Fragment, ReactNode, useCallback, useState } from "react";
import Button from "./Button";
import ListBox from "./Listbox";
import Stack from "./Stack";
import type { FeedItemAction, FeedItemThing, IFeedItemRecord } from "./types";
import { SectionHeading } from "./Typography";
import WrapControl from "./WrapControl";

export const FeedItemForm: FC = () => {
    const [formData, setFormData] = useState<Omit<IFeedItemRecord, "timestamp" | "id">>({
        name: "Billy Bob",
        action: "Created",
        thing: "Test"
    });
    const [isWorking, setIsWorking] = useState<boolean>(false);

    const onSubmit = useCallback(() => {
        setIsWorking(true);
        axios({
            method: "POST",
            url: "/api/feed",
            data: { ...formData, timestamp: new Date().toISOString() }
        }).finally(() => {
            setIsWorking(false);
        });
    }, [formData]);

    return (
        <form
            onSubmit={onSubmit}
            className={new ClassNames(["relative rounded-lg bg-slate-100 p-6"]).list()}
        >
            <Stack>
                <SectionHeading>Add an Event</SectionHeading>
                <WrapControl label="User">
                    <ListBox
                        value={formData.name}
                        onChange={(value) => setFormData((data) => ({ ...data, name: value }))}
                        options={["Billy Bob", "Penny", "Sheldon Cooper"]}
                    />
                </WrapControl>
                <WrapControl label="Perform Action">
                    <ListBox
                        value={formData.action}
                        onChange={(value: FeedItemAction) =>
                            setFormData((data) => ({ ...data, action: value }))
                        }
                        options={["Created", "Edited", "Deleted"] as Array<FeedItemAction>}
                    />
                </WrapControl>
                <WrapControl label="This Thing">
                    <ListBox
                        value={formData.thing}
                        onChange={(value: FeedItemThing) =>
                            setFormData((data) => ({ ...data, thing: value }))
                        }
                        options={["Project", "Test", "User"] as Array<FeedItemThing>}
                    />
                </WrapControl>
                <div>
                    <Button onClick={onSubmit}>Submit</Button>
                </div>
            </Stack>
            <FormOverlayCard show={isWorking}>Sending...</FormOverlayCard>
        </form>
    );
};

const FormOverlayCard: FC<{
    show: boolean;
    inModal?: boolean;
    className?: string | ClassNames;
    children: ReactNode;
}> = ({ className = "", show = false, inModal = false, children }) => (
    <Transition as={Fragment} show={show}>
        <Transition.Child
            as={Fragment}
            enter="ease-out transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in transition-opacity duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div
                className={new ClassNames([
                    "absolute z-50 rounded-lg",
                    "flex items-center justify-center",
                    "bg-white/25 backdrop-blur-sm"
                ])
                    .add({ "inset-0": inModal, "inset-[-0.30rem]": !inModal })
                    .add(className)
                    .list()}
            >
                {children && (
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out transition-opacity duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100  translate-y-0 sm:scale-100"
                        leave="ease-in transition-opacity duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0  translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className={new ClassNames([
                                "flex items-center space-x-4",
                                "bg-white dark:bg-slate-700",
                                "text-slate-700 dark:text-white",
                                "rounded-lg border bg-opacity-75 py-4 px-6 shadow-xl"
                            ]).list()}
                        >
                            {children}
                        </div>
                    </Transition.Child>
                )}
            </div>
        </Transition.Child>
    </Transition>
);
