const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = {
  webpack(config, env) {
    config = injectBabelPlugin('@babel/plugin-proposal-optional-chaining', config);
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);

    config = rewireLess.withLoaderOptions({
      modifyVars: { '@primary-color': '#439F46' },
      javascriptEnabled: true,
    })(config, env);
    return config;
  },
  devServer(configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      config.proxy = {
        '/api': {
          target: 'https://avf.dev.anfast.com.vn',
          secure: false,
          changeOrigin: true,
        },
        '/event': {
          target: 'https://avf.dev.anfast.com.vn',
          changeOrigin: true,
        },
        '/transition':{
          target: 'https://localhost:5001/',
          secure: false,
          changeOrigin: true,
        },
        '/vrp':{
          target: 'http://localhost:18000',
          secure: false,
          changeOrigin: true,
        },
        '/orderApi': {
          target: 'https://[::1]:44309',
          secure: false
        },
      };

      config.compress = false;

      return config;
    };
  },
};
