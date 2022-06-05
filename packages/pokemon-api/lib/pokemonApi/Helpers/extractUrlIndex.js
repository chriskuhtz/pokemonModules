export var extractUrlIndex = function (url) {
    var splitUrl = url === null || url === void 0 ? void 0 : url.split("/");
    var urlIndex = splitUrl && parseInt(splitUrl[splitUrl.length - 2]);
    return urlIndex;
};
//# sourceMappingURL=extractUrlIndex.js.map