module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
            @import "@/style/_breakpoint.scss";
            `
            }
        }
    }
};