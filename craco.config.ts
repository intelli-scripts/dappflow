export default {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.resolve = {
                ...webpackConfig.resolve,
                fallback: {
                    ...webpackConfig.resolve.fallback,
                    crypto: require.resolve('crypto-browserify'),
                    stream: require.resolve('stream')
                }
            }
            return webpackConfig;
        },
    }
};