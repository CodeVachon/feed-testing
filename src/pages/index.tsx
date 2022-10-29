import { ClassNames } from "@codevachon/classnames";
import { Feed } from "./../components/Feed";
import { FeedItemForm } from "./../components/FeedItemForm";

export default function Homepage() {
    return (
        <div className={new ClassNames(["flex flex-col"]).list()}>
            <header>
                <h1 className={new ClassNames(["text-2xl font-bold"]).list()}>
                    Redis Feed Testing
                </h1>
            </header>
            <section className={new ClassNames(["flex w-full space-x-6"]).list()}>
                <main className={new ClassNames(["w-full"]).list()}>
                    <Feed />
                </main>
                <aside className={new ClassNames(["w-full"]).list()}>
                    <FeedItemForm />
                </aside>
            </section>
        </div>
    );
}
