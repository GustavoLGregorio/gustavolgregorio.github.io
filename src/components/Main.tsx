import type React from "react";

type MainProps = {
    children: React.ReactElement | React.ReactElement[];
};

export default function Main(props: MainProps) {
    return (
        <main className="flex flex-col gap-16 px-8 py-4 w-full max-w-6xl mx-auto">
            {props.children}
        </main>
    );
}
