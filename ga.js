const fs = require('fs');
require('dotenv').config();
const { google } = require('googleapis');

const client = new google.auth.JWT({
  email: process.env.GA_CLIENT_EMAIL,
  key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'), // ð ç½®æãã
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

console.log('â Clientä½æ');

const analyticsreporting = google.analyticsreporting({
  version: 'v4',
  auth: client,
});

async function getPopularPostData() {
  const res = await analyticsreporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: process.env.GA_VIEW_ID, // ð Analytics ViewID ã®æå®
          pageSize: 50, // ð è¦æ±ãããã¼ã¸ã®æ°
          dateRanges: [
            {
              startDate: '30daysAgo',
              endDate: 'today',
            },
          ],
          metrics: [{ expression: 'ga:pageviews' }],
          dimensions: [{ name: 'ga:pagePath' }, { name: 'ga:pageTitle' }],
          orderBys: [{ fieldName: 'ga:pageviews', sortOrder: 'DESCENDING' }],
        },
      ],
    },
  });
  return res.data;
}

getPopularPostData().then((data) => {
  console.log('â äººæ°è¨äºã®åå¾');
  const { reports } = data;
  const gaRowData = reports ? reports[0]?.data?.rows ?? [] : [];
  const popularPaths = gaRowData
    .filter((row) => row.dimensions && row.dimensions[0]) // dimensions ã dimensions[0] ãå­å¨ãããã¼ã¿ã®ã¿æ½åº
    .map((row) => {
      return row.dimensions[0];
    });
  console.log('popularPaths:', popularPaths);
  fs.writeFile('ga.json', JSON.stringify(popularPaths), (err) => {
    console.log('ð ga.jsonçæ');
  });
});
