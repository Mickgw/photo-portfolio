import fs from "fs";
import matter from "gray-matter";

interface PostMetadataProps {
    title: string;
    slug: string;
}

export const  getAlbumMetadata = () : PostMetadataProps[] => {
    const folder = "albums/";
    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter((file) => file.endsWith(".md"));

    const albums = markdownPosts.map((fileName) => {
        const fileContents = fs.readFileSync(`albums/${fileName}`, "utf8");
        const matterResult = matter(fileContents);

        return {
            title: matterResult.data.title,
            metaTitle: matterResult.data.metaTitle,
            description: matterResult.data.description,
            year: matterResult.data.date,
            imagesFolder: matterResult.data.imagesFolder,
            slug: fileName.replace(".md", ""),
        }
    })

    return albums;
}

export const  getAlbumContent = (slug: string) => {
    const folder = "albums/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);

    return matterResult.data;
}