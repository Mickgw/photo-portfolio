import { AlbumPreviews } from "../components/AlbumPreviews/AlbumPreviews";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pictures by Mick",
    description: "Portfolio website for and by Mick",
};

export default function Albums() {
    return (
        <>
            <div className="container">
                <AlbumPreviews />
            </div>
        </>
    );
}
