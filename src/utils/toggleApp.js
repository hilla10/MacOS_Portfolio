export const toggleApp = (appId, dock, windows, openWindow, closeWindow) => {
  const app = dock.find((w) => w.id === appId);
  if (!app?.canOpen) return;

  const windowState = windows[appId];

  if (!windowState) {
    openWindow(appId);
    return;
  }

  console.log(app);

  if (windowState.isOpen) {
    closeWindow(appId);
  } else {
    openWindow(appId);
  }
};
