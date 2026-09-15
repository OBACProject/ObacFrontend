/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ekawit.ac.th',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/login', '/academic/*', '/teacher/*', '/admin/*', '/student/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/academic/', '/teacher/', '/admin/', '/student/', '/login'],
      },
    ],
  },
};
