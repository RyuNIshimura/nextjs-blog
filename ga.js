const fs = require('fs');
require('dotenv').config();
const { google } = require('googleapis');

const client = new google.auth.JWT({
  email: process.env.GA_CLIENT_EMAIL,
  key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'), // 👈 置換する
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

console.log('✅ Client作成');

const analyticsreporting = google.analyticsreporting({
  version: 'v4',
  auth: client,
});

async function getPopularPostData() {
  const res = await analyticsreporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: process.env.GA_VIEW_ID, // 👈 Analytics ViewID の指定
          pageSize: 50, // 👈 要求するページの数
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
  console.log('✅ 人気記事の取得');
  const { reports } = data;
  const gaRowData = reports ? reports[0]?.data?.rows ?? [] : [];
  const popularPaths = gaRowData
    .filter((row) => row.dimensions && row.dimensions[0]) // dimensions や dimensions[0] が存在するデータのみ抽出
    .map((row) => {
      return row.dimensions[0];
    });
  console.log('popularPaths:', popularPaths);
  fs.writeFile('ga.json', JSON.stringify(popularPaths), (err) => {
    console.log('🎉 ga.json生成');
  });
});
