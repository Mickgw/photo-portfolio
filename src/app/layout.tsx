import "@/app/assets/styles/global.scss";
import { LenisScroller } from "./components/LenisScroller";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LenisScroller />
            <html lang="en">
                <head>
                    <title>Pictures by Mick Waanders</title>
                    <meta
                        name="description"
                        content="Portfolio website for and by Mick Waanders"
                    />
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                </head>
                <body>
                    <main>{children}</main>
                </body>
            </html>
        </>
    );
}
