export const fetchResumeTemplates = async () => {
    try {
        // Placeholder API (simulate fetching resume templates)
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
            throw new Error("Failed to fetch resume templates");
        }
        const data = await response.json();

        // Return mock resume templates
        return data.slice(0, 10).map((item) => ({
            name: `Template ${item.id}`,
            description: item.title,
        }));
    } catch (error) {
        console.error("Error fetching resume templates:", error);
        return [];
    }
};
