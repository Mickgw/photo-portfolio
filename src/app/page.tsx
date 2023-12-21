import Head from "next/head";
import { AlbumPreviews } from "./components/AlbumPreviews/AlbumPreviews";

export default function Home() {
    return (
        <>
            <Head>
                <title>Pictures by Mick Waanders</title>
                <meta
                    name="description"
                    content="Portfolio website from Mick Waanders"
                />
            </Head>
            <div>
                <h1 className="text-[100px] font-bold">Home page</h1>
                <AlbumPreviews />
            </div>
        </>
    );
}
