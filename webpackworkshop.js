// this is not related to the application in the directory! This is for note taking in Josh Elder's webpack workshop
// -follow docs core concepts
// -out of the box, webpack only handles js files
//  we must use loaders to make it be able to read other file types
// -make sure you know what version of webpack you're running, because otherwise it can cause problems
// -babel is really easy to set up with webpack, just go to babel setup, build, webpack
/*
client/
  src/
    index.js
    components/
      App.jsx
node_modules/
public/
  index.html
server/
  index.js
package.json
webpack.config.js
*/
const path = require('path');
const SRC_FILE = path.resolve(__dirname, 'client', 'src', 'index.js');
const OUT_DIR = path.resolve(__dirname, 'public')
// log to make sure it's correct
// console.log('src test ', SRC_FILE);

// webpack does 'treeshaking' when you destructure things
// it will ONLY include what you've destructured and it's dependencies

module.exports = {
  entry: SRC_FILE,
  output: {
    path: OUT_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.css$/,
        use: blah ^ look above
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  devtool: 'source-map'
}



// create .babelrc file to use babel with more things
module.exports = {
  entry: SRC_FILE,
  output: {
    path: OUT_DIR,
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: blah ^ look above
      }
    ]
  }
}

// .babelrc file below / .bablerc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}


//Module resolution helps identify a file by it's relative path
// use resolve as listed in the first webpack config above ^

//Devtool uses a sourcemap to make identifying errors easier,
//since babel ends up putting more code into the file, and line errors may not correspond correctly

