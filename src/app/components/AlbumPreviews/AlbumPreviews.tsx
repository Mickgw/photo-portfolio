import { getAlbumMetadata } from "@/app/helpers/helpers";
import { AlbumPreview } from "./AlbumPreview";

export const AlbumPreviews = () => {
    const albumMetadata = getAlbumMetadata();

    return (
        <div className="grid grid-cols-2 gap-8">
            {albumMetadata.map((album: any, index: number) => {
                return <AlbumPreview {...album} key={index} />;
            })}
        </div>
    );
};
