
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.js',
  
  plugins: [
    babel({
      exclude: 'node_modules/**',
    })
  ],
  targets: [
    {
      format: 'iife',
      moduleName: 'MMD',
      dest: 'build/js/MMD.js'
    }
    
  ]

};

