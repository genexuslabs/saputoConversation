const { i18n } = require('./next-i18next.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,

  webpack(config, { isServer, dev }) {
    if (process.env.ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: isServer ? '../analyze/server.html' : './analyze/client.html',
      }));
    }
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};

module.exports = nextConfig;
