module.exports = ({ webpack }) => {
  const isDev = webpack.mode === 'development';
  return {
    plugins: {
      'postcss-inline-svg': {},
      'autoprefixer': {},
      'css-mqpacker': !isDev ? {} : false
    }
  }
};
