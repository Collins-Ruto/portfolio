import { repos } from "~/assets/repos";
import fs from "fs";
import type { RepositoryData } from "~/types/types";
import sortedArray from '~/assets/sortedArray.json'
import pinnedArray from '~/assets/pinnedProjects.json'

const HomePage = () => {
    const cleanData: RepositoryData[] = [];
    const cleanPinned: RepositoryData[] = [];
    const clean = repos.forEach((data) => {
        sortedArray.forEach((obj) => {
            if (data.name === obj.name) {
                const newdata = {
                    ...obj,
                    topics: data.topics
                }
                cleanData.push(newdata)
            }
        })

        pinnedArray.forEach((obj) => {

            if (data.name === obj.name) {
                const newdata = {
                    ...obj,
                    topics: data.topics
                }
                cleanPinned.push(newdata)
            }
        })

        // const newdata = {
        //     name: data.name,
        //     id: data.id,
        //     html_url: data.html_url,
        //     created_at: data.created_at,
        //     stargazers_count: data.stargazers_count,
        //     description: data.description ?? "",
        //     homepage: data.homepage ?? "",
        //     pin_url: ""
        // }
        // cleanData.push(newdata)
    })

    clean

    console.log(cleanData);
    console.log(clean);

    const jsonContent = JSON.stringify(cleanData, null, 2);
    const jsonPinnedContent = JSON.stringify(cleanPinned, null, 2);

    fs.writeFile("assets/sortedArray3.json", jsonContent, "utf8", (err) => {
        if (err) {
            console.error("An error occurred while writing the file:", err);
        } else {
            console.log("sortedArray2.json has been saved successfully.");
        }
    });
    
    fs.writeFile("assets/pinnedProjects3.json", jsonPinnedContent, "utf8", (err) => {
        if (err) {
            console.error("An error occurred while writing the file:", err);
        } else {
            console.log("pinnedProjects2.json has been saved successfully.");
        }
    });
};

export default HomePage;
