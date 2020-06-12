/** @format */

import axios from 'axios';

const keywords = ['ипотек', '8 хувь', '8%', '8 %', 'лизинг', 'leasing', 'ipotek'];
const rubic = 1878;

const instance = axios.create({
  baseURL: 'https://m.unegui.mn/api/',
  timeout: 10000,
  headers: {
    Accept: '*/*',
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
  },
});

async function main() {
  let i = 1;
  let finished = false;
  const results = [];
  const regex = new RegExp(keywords.join('|'), 'i');

  while (!finished) {
    console.log(`fetching page #${i}`);
    await instance
      .get(`/items/?page=${i}&rubric=${rubic}`)
      .then(response => {
        const {data} = response;

        // TODO: check result is not in results
        data.results.forEach(result => {
          if (regex.test(result.description) || regex.test(result.title)) {
            results.push(result);
          }
        });
        console.log(data.next);

        if (data.next == null) {
          finished = true;
        }
      })
      .catch(error => {
        console.error('Error while fetch:', error.message);
      });

    i = i + 1;
  }

  results.forEach(result => {
    console.log(`https://www.unegui.mn/adv/${result.id}_${result.slug}/`);
  });
}

main();
