exports.config = {
  projectRoot: './src',
  projectName: 'scully-blog',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
    '/about': {
      type: 'default',
      slug: {
        folder: "./src/app/about"
      }
    }
    
  }
};