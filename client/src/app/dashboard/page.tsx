import React from 'react';
import {getProjects} from "@/util/api";

const Page = async () => {
    const projects = await getProjects();
    console.log(projects);
    return (
        <div>

        </div>
    );
};

export default Page;