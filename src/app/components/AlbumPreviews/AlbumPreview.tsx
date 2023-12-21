import Link from "next/link";

export const AlbumPreview = (album: any) => {
    return (
        <Link href={`/${album.slug}`} className="hover:opacity-60">
            <h2 className="font-bold">{album.title}</h2>
        </Link>
    );
};
