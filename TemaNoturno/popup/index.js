const toggleButton = document.getElementById("toggleButton");

chrome.storage.local.get("darkMode", ({ darkMode }) => {
    toggleButton.textContent = darkMode ? "Desativar Tema" : "Ativar Tema";
});

toggleButton.addEventListener("click", () => {
    chrome.storage.local.get("darkMode", ({ darkMode }) => {
        const newMode = !darkMode;
        chrome.storage.local.set({ darkMode: newMode });

        toggleButton.textContent = newMode ? "Desativar Tema" : "Ativar Tema";

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (mode) => {
                    if (mode) {
                        document.documentElement.classList.add("dark-mode");
                    } else {
                        document.documentElement.classList.remove("dark-mode");
                    }
                },
                args: [newMode]
            });
        });
    });
});
