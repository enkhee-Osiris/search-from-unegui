/** @format */

import axios from 'axios';

const keywords = ['ипотек', '8 хувь', '8%', '8 %', 'лизинг', 'leasing', 'ipotek'];
// const keywords = [
//   'урагш',
//   'урагшаа',
//   'наран талдаа',
//   'нар үздэг',
//   'нар үзнэ',
//   'uragsh',
//   'uragshaa',
//   'naran taldaa',
//   'nar uzdeg',
//   'nar uzne',
// ];
// const keywords = ['гал тогоо тусдаа', 'гал тогоо', 'gal togoo', 'gal togoo tusdaa'];
// const rubic = 1877; // 1 өрөө
const rubic = 1878; // 2 өрөө
// const rubic = 1879; // 3 өрөө

const instance = axios.create({
  baseURL: 'https://m.unegui.mn/api/',
  timeout: 20000,
  headers: {
    Accept: '*/*',
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
  },
});

function priceFormatter(price, square_meter) {
  if (Number(price) <= 10000000) {
    return `${((Number(price) * Number(square_meter)) / 1000000).toFixed(2)} сая`;
  }

  return `${(Number(price) / 1000000).toFixed(2)} сая`;
}

async function main() {
  let i = 1;
  let finished = false;
  const results = [];
  const regex = new RegExp(keywords.join('|'), 'i');

  while (!finished) {
    // console.log(`fetching page #${i}`);
    await instance
      .get(`/items/?page=${i}&rubric=${rubic}`)
      .then(response => {
        const {data} = response;

        // TODO: check result is not in results
        // Number(result.attrs.attrs__talbai) >= 45 &&
        data.results.forEach(result => {
          if (
            (regex.test(result.description) || regex.test(result.title)) &&
            Number(result.attrs.attrs__davhar) !== Number(result.attrs.attrs__davhar1) &&
            Number(result.attrs.attrs__davhar1) > 2 &&
            Number(result.attrs.attrs__ashon) >= 2000 &&
            ((Number(result.price) <= 10000000 &&
              Number(result.price) * Number(result.attrs.attrs__talbai) <= 120000000) ||
              Number(result.price) <= 120000000)
          ) {
            results.push(result);
          }
        });
        // console.log(data.next);

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
    console.log(
      `[[https://www.unegui.mn/adv/${result.id}_${result.slug}/][${
        result.attrs.attrs__talbai
      } (${priceFormatter(result.price, result.attrs.attrs__talbai)}) - ${result.title}]]`,
    );
  });
}

main();
