import fs from "fs";
import blogs from '~/assets/devto.json'

type Blog = {
    title:  string,
    description: string,
    slug: string,
    markdown: string,
    github: string,
    devto_url: string,
    created_at: string,
    tag_list: string[],
    public_reactions_count: number,
    comments_count: number,
    cover_image: string,
}

const HomePage = () => {
    const cleanData: Blog[] = [];
    const clean = blogs.forEach((data) => {

        const newdata = {
            title: data.title,
            description: data.description,
            slug: data.slug,
            markdown: data.markdown,
            github: data.github,
            devto_url: data.url,
            created_at: data.created_at,
            tag_list: data.tag_list,
            public_reactions_count: data.public_reactions_count,
            comments_count: data.comments_count,
            cover_image: data.cover_image ?? data.social_image,
        }
        cleanData.push(newdata)
    })

    clean

    console.log(cleanData);
    console.log(clean);

    const jsonContent = JSON.stringify(cleanData, null, 2);

    fs.writeFile("assets/blogs.json", jsonContent, "utf8", (err) => {
        if (err) {
            console.error("An error occurred while writing the file:", err);
        } else {
            console.log("blogs.json has been saved successfully.");
        }
    });

};

export default HomePage;
