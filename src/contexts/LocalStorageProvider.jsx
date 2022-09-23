

const getLocalStorage = () => {
    return window.localStorage();
}

export default function LocalStorageProvider() {
    const localStorage = getLocalStorage();
    return localStorage;
}