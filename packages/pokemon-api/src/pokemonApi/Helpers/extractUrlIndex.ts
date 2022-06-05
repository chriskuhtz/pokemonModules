export const extractUrlIndex = (url: string): number => {
  const splitUrl = url?.split("/");
  const urlIndex = splitUrl && parseInt(splitUrl[splitUrl.length - 2]);
  return urlIndex;
};
