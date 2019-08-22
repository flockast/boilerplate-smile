module.exports = ({ file, options, env }) => {
  const isDev = options.mode === 'development';
  return {
    plugins: {
      'postcss-inline-svg': {},
      'autoprefixer': {},
      'css-mqpacker': !isDev ? {} : false
    }
  }
};
