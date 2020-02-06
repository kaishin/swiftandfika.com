module.exports = {
  siteMetadata: {
    title: 'Swift & Fika',
    description: 'The premier Swift conference in the nordics is back in 2020. See you in Stockholm this fall!',
    siteUrl: 'https://swiftandfika.com',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/src/markdown-pages`,
      },
    },
  ],
};
