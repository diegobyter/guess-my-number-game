let messages = {};

export async function loadLanguage(language) {
    try {
        const response = await fetch(`../langs/${language}.json`);
        if (!response.ok) throw new Error("Language file not found");
        messages = await response.json();
    } catch (error) {
        console.error("Error loading language file:", error);
        messages = {}; // Define as an empty object if there's an error
    }
}

export function getMessage(key) {
    return messages[key] || '';
}
