const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const addLessLoader = (loaderOptions = {}) => (config, env) => {
  // Need these for production mode, which are copied from react-scripts
  const publicPath = require('sprint-scripts/config/paths').servedPath;
  const shouldUseRelativeAssetPaths = publicPath === './';
  const isEnvDevelopment = env === 'development';
  const isEnvProduction = env === 'production';
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
  const lessRegex = /\.less$/;
  const lessModuleRegex = /\.module\.less$/;

  const getLessLoader = cssOptions => {
    return [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: require('mini-css-extract-plugin').loader,
        options: Object.assign(
          {},
          shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
        ),
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
      {
        loader: require.resolve('less-loader'),
        options: Object.assign(loaderOptions, {
          source: isEnvProduction && shouldUseSourceMap,
        }),
      },
    ].filter(Boolean);
  };

  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf))
    .oneOf;

  // Insert less-loader as the penultimate item of loaders (before file-loader)
  loaders.splice(
    loaders.length - 1,
    0,
    {
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getLessLoader({
        importLoaders: 2,
        sourceMap: isEnvProduction && shouldUseSourceMap,
      }),
      sideEffects: true,
    },
    {
      test: lessModuleRegex,
      use: getLessLoader({
        importLoaders: 2,
        sourceMap: isEnvProduction && shouldUseSourceMap,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent,
      }),
    }
  );

  return config;
};

const webpack = (config, env) => {
  const configuration = addLessLoader()(config, env);

  return configuration;
};

const devServer = configFunction => {
  return (proxy, allowedHost) => {
    const config = configFunction(proxy, allowedHost);
    // const fs = require('fs');
    // config.https = {
    //   key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
    //   cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
    //   ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
    //   passphrase: process.env.REACT_HTTPS_PASS
    // };

    // Return your customised Webpack Development Server config.
    return config;
  };
};

const jest = config => config;

const pathsOverride = (paths, env) => paths;

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack,
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest,
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer,
  // The paths config to use when compiling your react app for development or production.
  paths: pathsOverride,
};
