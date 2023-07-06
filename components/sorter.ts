import { repos } from "~/assets/repos";
import fs from "fs";
import type { RepositoryData } from "~/types/types";



const HomePage = () => {

    const cleanData: RepositoryData[] = [];
    const clean = repos.forEach((data) => {
        const newdata = {
            name: data.name,
            id: data.id,
            html_url: data.html_url,
            created_at: data.created_at,
            stargazers_count: data.stargazers_count,
            description: data.description ?? "",
            homepage: data.homepage ?? "",
            pin_url: ""
        }
        cleanData.push(newdata)
    })

    clean

    console.log(cleanData);
    console.log(clean);

    const jsonContent = JSON.stringify(cleanData, null, 2);

    fs.writeFile("assets/sortedArray.json", jsonContent, "utf8", (err) => {
        if (err) {
            console.error("An error occurred while writing the file:", err);
        } else {
            console.log("sortedArray.json has been saved successfully.");
        }
    });

};

export default HomePage;
