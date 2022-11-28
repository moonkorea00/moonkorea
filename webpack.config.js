module.exports = {
  module: {
    rules: [
      {
        // babel loader
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
};
