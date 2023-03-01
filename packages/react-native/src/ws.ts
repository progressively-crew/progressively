export const connectWs = (wsUrl: string, sdkParams: string) => {
  const ws = new WebSocket(`${wsUrl}?opts=${sdkParams}`);
};
