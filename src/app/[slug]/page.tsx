import { getAlbumContent, getAlbumMetadata } from "@/app/helpers/helpers";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
    const albums = getAlbumMetadata();

    return albums.map((album: any) => ({ slug: album.slug }));
}

export async function generateMetadata(props: any) {
    const album = getAlbumContent(props.params.slug);
    return {
        title: album?.metaTitle,
        description: album?.description,
    };
}

export default function AlbumPage(props: any) {
    const slug = props.params.slug;
    const album = getAlbumContent(slug);

    return (
        <>
            <Head>
                <title>{album?.title}</title>
                <meta name="description" content={album?.description} />
            </Head>
            <div className="container">
                <div className="flex gap-1 items-center">
                    <Link href="/" className="text-blue-500">
                        Home
                    </Link>
                    <span>/</span>{" "}
                    <span className="font-bold">{album?.title}</span>
                </div>

                <h1 className="text-[100px] font-bold">{album?.title}</h1>
                <p>{album?.description}</p>
                <div className="grid grid-cols-2 gap-8">
                    {album.images?.map((item: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="w-full h-[700px] relative"
                            >
                                <Image
                                    src={item}
                                    alt=""
                                    fill
                                    priority
                                    className="object-cover object-center"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
