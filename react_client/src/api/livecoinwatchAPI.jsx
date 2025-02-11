// LiveCoinWatch Documenation for API Calls and Options:
// https://livecoinwatch.github.io/lcw-api-docs/?javascript#coinslist

/*
  NOTE: this should be changed to an Async/Await function
  See pages 25 and 26 of Learning REACT textbook (O'Reilly 2nd Edition)
*/
const functions = require('firebase-functions');
const apiKey = functions.config().vite.live_coin_watch;
/**
 * POST request to retrieve the LiveCoinWatch 'resource: /coin/list'
 */
const coinListRequestOptions = {
  method: 'POST',
  headers: new Headers({
    'x-api-key': apiKey,
    'Content-Type': 'application/json',
  }),
  body: JSON.stringify({
    codes: [
      'AMP',
      'BAL',
      'BNB',
      'BOND',
      'BTC',
      'CLV',
      'COMP',
      'DOGE',
      'DOT',
      'ETH',
      'FET',
      'FORTH',
      'LUNC',
      'USDC',
      'USDT',
    ],
    // codes: assets,
    currency: 'USD',
    sort: 'rank',
    order: 'ascending',
    offset: 0,
    limit: 0,
    meta: false,
  }),
};

const lcwCryptoAPI = async () => {
  try {
    return await fetch(
      new Request('https://api.livecoinwatch.com/coins/map'),
      coinListRequestOptions
    ).then(async (response) => {
      const isJson = response.headers
        .get('content-type')
        ?.includes('application/json');
      const data = isJson && (await response.json());

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      // console.table(data[0].delta)
      return [...data];
    });
  } catch (err) {
    console.log('LiveCoinWatch Post Error:', err);
    return err;
  }
};

export default lcwCryptoAPI;
