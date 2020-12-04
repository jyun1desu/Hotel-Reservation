module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
            @import "@/style/_breakpoint.scss";
            `
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/Hotel-Reservation/'
    : '/',
};