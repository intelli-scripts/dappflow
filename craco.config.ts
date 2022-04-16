import webpack from 'webpack';

export default {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.plugins = [
                ...webpackConfig.plugins,
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                }),

            ];
            webpackConfig.resolve = {
                ...webpackConfig.resolve,
                fallback: {
                    ...webpackConfig.resolve.fallback,
                    crypto: require.resolve('crypto-browserify'),
                    stream: require.resolve('stream'),
                    buffer: require.resolve("buffer")
                }
            }
            return webpackConfig;
        },
    }
};