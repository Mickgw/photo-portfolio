import { getAlbumContent, getAlbumMetadata } from "@/app/helpers/helpers";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";

export async function generateStaticParams() {
    const albums = getAlbumMetadata();

    return albums.map((album: any) => ({ slug: album.slug }));
}

export async function generateMetadata(props: any) {
    const album = getAlbumContent(props.params.slug);
    return {
        title: `Pictures by Mick - ${album?.title}`,
        description: album?.description,
    };
}

export function getImagesFromFolder(folderName: string) {
    var images = [];

    const imagesFolderPath = `./public/images/${folderName}`;
    const imageFiles = fs.readdirSync(imagesFolderPath);

    images = imageFiles.map((imageFile) => {
        return `/images/${folderName}/${imageFile}`;
    });

    return images;
}

export default function AlbumPage(props: any) {
    const slug = props.params.slug;
    const album = getAlbumContent(slug);
    const images = getImagesFromFolder(album?.imagesFolder);

    return (
        <>
            <Head>
                <title>{album?.title}</title>
                <meta name="description" content={album?.description} />
            </Head>
            <div className="">
                <div className="container flex gap-1 items-center">
                    <Link href="/albums" className="text-blue-500">
                        Albums
                    </Link>
                    <span>/</span>{" "}
                    <span className="font-bold">{album?.title}</span>
                </div>

                <div className="container">
                    <p>{album?.description}</p>
                    <div className="columns-3 gap-x-6 gap-y-6 py-12">
                        {images?.map((image: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="relative mb-6 rounded-lg overflow-hidden"
                                >
                                    <Image
                                        src={image}
                                        alt=""
                                        width={100}
                                        height={100}
                                        priority
                                        sizes="(max-width: 768px) 45vw, 25vw"
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
