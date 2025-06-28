const darkModeToggleButton = document.getElementById("toggleButton");
const videoOverlayToggleButton = document.getElementById("videoShadowButton");

function initializeToggleStates() {
    chrome.storage.local.get(["darkMode", "videoShadow"], ({ darkMode, videoShadow }) => {
        updateDarkModeButtonLabel(darkMode);
        updateVideoOverlayButtonLabel(videoShadow);
    });
}

function updateDarkModeButtonLabel(isEnabled) {
    darkModeToggleButton.textContent = isEnabled ? "Desativar Tema" : "Ativar Tema";
}

function updateVideoOverlayButtonLabel(isEnabled) {
    videoOverlayToggleButton.textContent = isEnabled
        ? "Desativar Sombra Sobre Os Vídeos"
        : "Ativar Sombra Sobre Os Vídeos";
}

function toggleDarkMode() {
    chrome.storage.local.get("darkMode", ({ darkMode }) => {
        const isDarkModeEnabled = !darkMode;
        chrome.storage.local.set({ darkMode: isDarkModeEnabled });
        updateDarkModeButtonLabel(isDarkModeEnabled);

        applyToActiveTab("dark-mode", isDarkModeEnabled);
    });
}

function toggleVideoOverlay() {
    chrome.storage.local.get("videoShadow", ({ videoShadow }) => {
        const isOverlayEnabled = !videoShadow;
        chrome.storage.local.set({ videoShadow: isOverlayEnabled });
        updateVideoOverlayButtonLabel(isOverlayEnabled);

        applyToActiveTab("video-shadow-enabled", isOverlayEnabled);
    });
}

function applyToActiveTab(cssClass, shouldEnable) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTabId = tabs[0].id;

        chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            func: (className, enable) => {
                const root = document.documentElement;
                root.classList.toggle(className, enable);
            },
            args: [cssClass, shouldEnable]
        });
    });
}

darkModeToggleButton.addEventListener("click", toggleDarkMode);
videoOverlayToggleButton.addEventListener("click", toggleVideoOverlay);

initializeToggleStates();
