chrome.storage.local.get("darkMode", ({ darkMode }) => {
    if (darkMode) {
        document.documentElement.classList.add("dark-mode");
    }
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.toggleDarkMode !== undefined) {
    if (request.toggleDarkMode) {
        document.documentElement.classList.add("dark-mode");
    } else {
        document.documentElement.classList.remove("dark-mode");
    }
    }
});