function applyClassIfEnabled(className, isEnabled) {
    document.documentElement.classList.toggle(className, isEnabled);
}

function applyStoredPreferences() {
    chrome.storage.local.get(["darkMode", "videoShadow"], ({ darkMode, videoShadow }) => {
        applyClassIfEnabled("dark-mode", darkMode);
        applyClassIfEnabled("video-shadow-enabled", videoShadow);
    });
}

function handleRuntimeMessage(request) {
    if ("toggleDarkMode" in request) {
        applyClassIfEnabled("dark-mode", request.toggleDarkMode);
    }

    if ("toggleVideoShadow" in request) {
        applyClassIfEnabled("video-shadow-enabled", request.toggleVideoShadow);
    }
}

applyStoredPreferences();

chrome.runtime.onMessage.addListener(handleRuntimeMessage);
