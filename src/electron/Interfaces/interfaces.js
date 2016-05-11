declare class App {
    on<T>(name: string, window: Function): void;
    quit(): void;
}

declare class ipcMain {
    on(name: string, callback: Function): void;
}

declare class WebContents {
    openDevTools(): void;
}

declare module electron {
    declare var app: App;
    declare var ipcMain: ipcMain;
    declare class BrowserWindow {
        constructor(param: Object): void;
        loadURL(url: string): void;
        on(name: string, callback: Function): void;
        webContents: WebContents;
    }
}
