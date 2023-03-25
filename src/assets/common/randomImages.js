import axios from 'axios';

export const randomImages = async limit => {
  let tmp = [];
  var tag = [
    'sciamano240',
    'ayyasap',
    'ringsel',
    'rude_frog',
    'neocoill',
    'shexyo',
    'araneesama',
    'rak_(kuraga)',
  ];
  const res = await axios
    .get(
      //`https://api.e34.zzz//index.php?page=dapi&s=post&q=index&json=1&limit=${limit}&tags=${tag}`
      `https://api.e34.xxx//index.php?page=dapi&s=post&q=index&json=1&limit=${limit}&tags=${
        tag[Math.floor(Math.random() * tag.length)]
      }&pid=${Math.floor(Math.random() * 20) + 1}`,
      {timeout: 5000},
    )
    .then(res => res.data)
    .then(data => {
      return data.map(item => item.sample_url);
    })
    .catch(err => {
      return [];
    });

  tmp = res;

  // for (var i = 0, len = limit; i < len; i++) {
  //   tmp.push(`https://picsum.photos/id/${Math.floor(Math.random() * 100) + 1}/400/600`);
  // }

  return tmp;
};
