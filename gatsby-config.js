require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: 'Quickular',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/app'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Quickular',
        short_name: 'quickular',
        start_url: '/',
        background_color: '#002211',
        theme_color: '#002211',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
