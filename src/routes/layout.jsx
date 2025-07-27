import { ModeToggle } from "@/components/ui/mode-toggle";

export default function RootLayout({ children }) {
    return (
        <>
            {children}
            <ModeToggle className={"fixed bottom-4 right-4"} />
        </>
    );
}
