/**
 * Fetches portfolio API data and transforms it into the macOS desktop model.
 */

const getProjectTitle = (project, index) => (
    project.name || project.title || `Project ${index + 1}`
);

const getProjectImage = (project) => {
    if (project.image_url) return project.image_url;
    if (project.thumbnail) return project.thumbnail;
    if (project.image) return project.image.startsWith("http") || project.image.startsWith("/") ? project.image : `/img/${project.image}`;
    return "";
};

const getLiveUrl = (project) => (
    project.live_link || project.liveUrl || project.projectUrl || project.project_url || ""
);

const getGithubUrl = (project) => (
    project.github_url || project.githubUrl || project.codeUrl || ""
);

export const createProjectsStructure = (projects) => {
    const projectChildren = projects.map((project, index) => {
        const title = getProjectTitle(project, index);
        const imageUrl = getProjectImage(project);
        const tools = Array.isArray(project.tools) && project.tools.length
            ? `Tools: ${project.tools.join(", ")}`
            : "";

        return {
            id: project._id || project.id || `project-${index}`,
            name: title,
            icon: "/images/folder.png",
            kind: "folder",
            children: [
                {
                    id: `${project._id || project.id || index}-desc`,
                    name: `${title}.txt`,
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    description: [
                        project.description || "No description provided.",
                        tools
                    ].filter(Boolean)
                },
                ...(getLiveUrl(project) ? [{
                    id: `${project._id || project.id || index}-live`,
                    name: "view-live.url",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: getLiveUrl(project)
                }] : []),
                ...(getGithubUrl(project) ? [{
                    id: `${project._id || project.id || index}-github`,
                    name: "view-code.url",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: getGithubUrl(project)
                }] : []),
                ...(imageUrl ? [{
                    id: `${project._id || project.id || index}-img`,
                    name: `${title}.png`,
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl
                }] : [])
            ]
        };
    });

    return {
        work: {
            id: "work",
            type: "work",
            name: "Projects",
            icon: "/icons/work.svg",
            kind: "folder",
            children: projectChildren
        }
    };
};

export const createTechStackStructure = (profileData) => {
    const skills = profileData?.skills_data || profileData?.skills || [];

    if (!Array.isArray(skills)) return [];

    return skills.map((skill, index) => {
        if (typeof skill === "string") {
            return { id: `skill-${index}`, category: "Skills", items: [{ name: skill }] };
        }

        const items = Array.isArray(skill.items)
            ? skill.items.map((item) => (
                typeof item === "string"
                    ? { name: item }
                    : {
                        name: item.name || item.title || "Skill",
                        proficiency: item.proficiency,
                        type: item.type,
                        color: item.color,
                        iconName: item.iconName,
                        iconUrl: item.iconUrl
                    }
            ))
            : Array.isArray(skill.tools)
                ? skill.tools.map((item) => ({ name: item }))
                : [{ name: skill.name || skill.title || "Skill" }];

        return {
            id: skill._id || skill.id || `skill-${index}`,
            category: skill.category || skill.name || "Other",
            items
        };
    });
};

export const createMacOSData = (profileData, projects = []) => {
    const projectList = Array.isArray(projects) ? projects : [];

    return {
        profile: profileData,
        projects: projectList,
        projectsStructure: createProjectsStructure(projectList),
        techStack: createTechStackStructure(profileData),
        contact: createContactStructure(profileData),
        resume: createResumeStructure(profileData),
        error: null
    };
};

export const createContactStructure = (profileData) => {
    const urls = profileData?.urls || {};
    const email = profileData?.gmail || profileData?.email || "";
    const socials = [];

    if (urls.github || profileData?.github) {
        socials.push({
            id: "github",
            text: "GitHub",
            icon: "/icons/github.svg",
            bg: "#24292f",
            link: urls.github || profileData.github
        });
    }

    if (urls.linkedin || profileData?.linkedin) {
        socials.push({
            id: "linkedin",
            text: "LinkedIn",
            icon: "/icons/linkedin.svg",
            bg: "#0a66c2",
            link: urls.linkedin || profileData.linkedin
        });
    }

    if (urls.twitter || profileData?.twitter) {
        socials.push({
            id: "twitter",
            text: "Twitter",
            icon: "/icons/twitter.svg",
            bg: "#ff866b",
            link: urls.twitter || profileData.twitter
        });
    }

    if (email) {
        socials.push({
            id: "email",
            text: "Email",
            icon: "/icons/file.svg",
            bg: "#16a34a",
            link: `mailto:${email}`
        });
    }

    return {
        name: profileData?.name || "Rajan Gupta",
        email,
        avatar: profileData?.profile_picture_url || "/img/face.webp",
        bio: profileData?.about || profileData?.bio || "",
        socials
    };
};

export const createResumeStructure = (profileData) => ({
    href: profileData?.pdf_url || "/img/Resume-Rajan Gupta.pdf",
    name: "Resume.pdf"
});
