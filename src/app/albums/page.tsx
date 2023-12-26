import { AlbumPreviews } from "../components/AlbumPreviews/AlbumPreviews";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pictures by Mick Waanders",
    description: "Portfolio website for and by Mick Waanders",
};

export default function Albums() {
    return (
        <>
            <div>
                <AlbumPreviews />
            </div>
        </>
    );
}
