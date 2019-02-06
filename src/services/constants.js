export const LITERALS = {
  TV_LIST: 'https://api.mlab.com/api/1/databases/tvui/collections/tvui1?s={id:1}&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI',
  TV_LIST_PREFIX: 'https://api.mlab.com/api/1/databases/tvui/collections/tvui1?',
  TV_LIST_SUFFIX: '&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI',
  START_STATIONS: ['TVP 1', 'TVP 2', 'TVN', 'POLSAT'],
  CATEGORY_NAMES: ['film', 'serial', 'sport', 'wiadomosci', 'rozrywka', 'dzieci', 'inne'],
  EXCESSIVE_DATA_MSG: 'Zmniejsz ilość stacji TV (najważniejsze), ustaw przedział czasu, lub wybierz kategorie, bo teraz część późniejszych programów nie jest wyświetlana',
  EMAIL_PROXY: 'https://wt-nabu1312-gmail-com-0.sandbox.auth0-extend.com/email',
  EMAIL_SUBJECT: 'TVui telewizyjny rozklad jazdy',
}

export const FIELDS = [
  {
    key: 'index',
    label: '#',
  },
  /* {
    key: 'id',
    label: 'id',
    sortable: true,
  }, */
  {
    key: 'dayString',
    label: 'Dzień&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
    sortable: true,
  },
  {
    key: 'time',
    label: 'Czas',
    sortable: true,
  },
  {
    key: 'channel',
    label: 'Stacja',
    sortable: true,
  },
  /* {
           key: 'timestamp',
           label: 'Stamp',
           sortable: true,
         }, */
  /* {
    key: 'date',
    label: 'dateTimestamp',
    sortable: true,
  }, */
  {
    key: 'title',
    label: 'Tytuł',
  },
  {
    key: 'type',
    label: 'Rodzaj',
  },
  {
    key: 'category',
    label: 'Kategoria',
    sortable: true,
  },
  {
    key: 'link',
    label: 'Link&nbsp;&nbsp;',
  },
]

export const CATEGORIES = [
  { text: 'Film', value: 'film' },
  { text: 'Serial', value: 'serial' },
  { text: 'Sport', value: 'sport' },
  { text: 'Wiadomości', value: 'wiadomosci' },
  { text: 'Rozrywka', value: 'rozrywka' },
  { text: 'Dzieci', value: 'dla dzieci' },
  { text: 'Inne', value: 'inne' },
]

export const CANAL = [
  {
    text: 'CANAL+ Discovery',
    value: 'CANAL+ Discovery',
  },
  {
    text: 'CANAL+ Family',
    value: 'CANAL+ Family',
  },
  {
    text: 'CANAL+ Film',
    value: 'CANAL+ Film',
  },
  {
    text: 'CANAL+ Seriale',
    value: 'CANAL+ Seriale',
  },
  {
    text: 'CANAL+ Sport 2',
    value: 'CANAL+ Sport 2',
  },
  {
    text: 'CANAL+ Sport',
    value: 'CANAL+ Sport',
  },
  {
    text: 'CANAL+',
    value: 'CANAL+',
  },
]

export const DISCOVERY_NATIONAL = [
  {
    text: 'Discovery Channel',
    value: 'Discovery Channel',
  },
  {
    text: 'Discovery Life',
    value: 'Discovery Life',
  },
  {
    text: 'Discovery Science',
    value: 'Discovery Science',
  },
  {
    text: 'Nat Geo People HD',
    value: 'Nat Geo People HD',
  },
  {
    text: 'Nat Geo',
    value: 'National Geographic',
  },
  {
    text: 'Nat Geo Wild',
    value: 'National Geographic Wild',
  },
]

export const FILMBOX_HBO_KINO = [
  {
    text: 'FilmBox Arthouse',
    value: 'FilmBox Arthouse',
  },
  {
    text: 'FilmBox Extra HD',
    value: 'FilmBox Extra HD',
  },
  {
    text: 'FilmBox Premium HD',
    value: 'FilmBox Premium HD',
  },
  {
    text: 'HBO',
    value: 'HBO',
  },
  {
    text: 'HBO2',
    value: 'HBO2',
  },
  {
    text: 'HBO3',
    value: 'HBO3',
  },

]

export const POLSAT = [
  {
    text: 'CI POLSAT',
    value: 'CI POLSAT',
  },
  {
    text: 'POLSAT',
    value: 'POLSAT',
  },
  {
    text: 'POLSAT 2',
    value: 'POLSAT 2',
  },
  {
    text: 'POLSAT Café',
    value: 'POLSAT Café',
  },
  {
    text: 'POLSAT Film',
    value: 'POLSAT Film',
  },
  {
    text: 'POLSAT JimJam',
    value: 'POLSAT JimJam',
  },
  {
    text: 'POLSAT News 2',
    value: 'POLSAT News 2',
  },
  {
    text: 'POLSAT News',
    value: 'POLSAT News',
  },
  {
    text: 'POLSAT Play',
    value: 'POLSAT Play',
  },
  {
    text: 'POLSAT Romans',
    value: 'POLSAT Romans',
  },
  {
    text: 'POLSAT Sport Extra',
    value: 'POLSAT Sport Extra',
  },
  {
    text: 'POLSAT Sport News',
    value: 'POLSAT Sport News',
  },
  {
    text: 'POLSAT Sport',
    value: 'POLSAT Sport',
  },
  {
    text: 'POLSAT Viasat Explore HD',
    value: 'POLSAT Viasat Explore HD',
  },
  {
    text: 'POLSAT Viasat History HD',
    value: 'POLSAT Viasat History HD',
  },
  {
    text: 'POLSAT Viasat Nature HD',
    value: 'POLSAT Viasat Nature HD',
  },
]

export const POLSKIE = [
  {
    text: '13 Ulica',
    value: '13 Ulica',
  },
  {
    text: 'Ale kino+',
    value: 'Ale kino+',
  },
  {
    text: 'ATM Rozrywka',
    value: 'ATM Rozrywka',
  },
  {
    text: 'Eska TV',
    value: 'Eska TV',
  },
  {
    text: 'Fokus TV',
    value: 'Fokus TV',
  },
  {
    text: 'History',
    value: 'HISTORY',
  },
  {
    text: 'History 2',
    value: 'HISTORY2',
  },
  {
    text: 'Kino Polska',
    value: 'Kino Polska',
  },
  {
    text: 'Kino Polska Muzyka',
    value: 'Kino Polska Muzyka',
  },
  {
    text: 'Kino TV',
    value: 'Kino TV',
  },
  {
    text: 'Kuchnia+',
    value: 'Kuchnia+',
  },
  {
    text: 'Motowizja',
    value: 'Motowizja',
  },
  {
    text: 'MTV Polska',
    value: 'MTV Polska',
  },
  {
    text: 'Polo TV',
    value: 'Polo TV',
  },
  {
    text: 'Puls 2',
    value: 'Puls 2',
  },
  {
    text: 'Sportklub',
    value: 'Sportklub',
  },
  {
    text: 'Stopklatka TV',
    value: 'Stopklatka TV',
  },
  {
    text: 'TV 4',
    value: 'TV 4',
  },
  {
    text: 'TVP Info',
    value: 'TVP Info',
  },
  {
    text: 'TVP Kultura',
    value: 'TVP Kultura',
  },
  {
    text: 'TV Puls',
    value: 'TV Puls',
  },
  {
    text: 'TVP Historia',
    value: 'TVP Historia',
  },
  {
    text: 'TVP Seriale',
    value: 'TVP Seriale',
  },
  {
    text: 'TV Republika',
    value: 'TV Republika',
  },
  {
    text: 'TV Trwam',
    value: 'TV Trwam',
  },
]

export const TVP_TVN = [
  {
    text: 'TVP 1',
    value: 'TVP 1',
  },
  {
    text: 'TVP 2',
    value: 'TVP 2',
  },
  {
    text: 'TVP 3',
    value: 'TVP 3',
  },
  {
    text: 'TVP ABC',
    value: 'TVP ABC',
  },
  {
    text: 'TVP HD',
    value: 'TVP HD',
  },
  {
    text: 'TVP Polonia',
    value: 'TVP Polonia',
  },
  {
    text: 'TVP Sport',
    value: 'TVP Sport',
  },
  {
    text: 'TVN',
    value: 'TVN',
  },
  {
    text: 'TVN 7',
    value: 'TVN 7',
  },
  {
    text: 'TVN 24',
    value: 'TVN 24',
  },
  {
    text: 'TVN 24 Biznes',
    value: 'TVN 24 Biznes i Świat',
  },
  {
    text: 'TVN Fabuła',
    value: 'TVN Fabuła',
  },
  {
    text: 'TVN Style',
    value: 'TVN Style',
  },
  {
    text: 'TVN Turbo',
    value: 'TVN Turbo',
  },
]

export const INNE = [
  {
    text: '4FUN.TV',
    value: '4FUN.TV',
  },
  {
    text: 'Active Family',
    value: 'Active Family',
  },
  {
    text: 'Adventure',
    value: 'Adventure',
  },
  {
    text: 'AMC',
    value: 'AMC',
  },
  {
    text: 'Animal Planet HD',
    value: 'Animal Planet HD',
  },
  {
    text: 'AXN',
    value: 'AXN',
  },
  {
    text: 'AXN Black',
    value: 'AXN Black',
  },
  {
    text: 'AXN Spin',
    value: 'AXN Spin',
  },
  {
    text: 'AXN White',
    value: 'AXN White',
  },
  {
    text: 'BBC Brit',
    value: 'BBC Brit',
  },
  {
    text: 'BBC CBeebies',
    value: 'BBC CBeebies',
  },
  {
    text: 'BBC Earth',
    value: 'BBC Earth',
  },
  {
    text: 'BBC First',
    value: 'BBC First',
  },
  {
    text: 'BBC Lifestyle',
    value: 'BBC Lifestyle',
  },
  {
    text: 'CBS Action',
    value: 'CBS Action',
  },
  {
    text: 'CBS Europa',
    value: 'CBS Europa',
  },
  {
    text: 'CBS Reality',
    value: 'CBS Reality',
  },
  {
    text: 'Cartoon Network',
    value: 'Cartoon Network',
  },
  {
    text: 'Cinemax',
    value: 'Cinemax',
  },
  {
    text: 'Cinemax2',
    value: 'Cinemax2',
  },
  {
    text: 'Comedy Central',
    value: 'Comedy Central',
  },
  {
    text: 'Comedy Central Family',
    value: 'Comedy Central Family',
  },
  {
    text: 'Da Vinci',
    value: 'Da Vinci',
  },
  {
    text: 'Disney Channel',
    value: 'Disney Channel',
  },
  {
    text: 'Disney Junior',
    value: 'Disney Junior',
  },
  {
    text: 'Domo+',
    value: 'Domo+',
  },
  {
    text: 'DTX',
    value: 'DTX',
  },
  {
    text: 'E! Entertainment',
    value: 'E! Entertainment',
  },
  {
    text: 'Eleven Sports 1',
    value: 'Eleven Sports 1',
  },
  {
    text: 'Eleven Sports 2',
    value: 'Eleven Sports 2',
  },
  {
    text: 'Eurosport 1',
    value: 'Eurosport 1',
  },
  {
    text: 'Eurosport 2',
    value: 'Eurosport 2',
  },
  {
    text: 'Extreme Sports Channel',
    value: 'Extreme Sports Channel',
  },
  {
    text: 'Fightklub',
    value: 'Fightklub',
  },
  {
    text: 'Food Network',
    value: 'Food Network',
  },
  {
    text: 'FOX Comedy',
    value: 'FOX Comedy',
  },
  {
    text: 'FOX',
    value: 'FOX',
  },
  {
    text: 'HGTV',
    value: 'HGTV',
  },
  {
    text: 'ID',
    value: 'ID',
  },
  {
    text: 'Lifetime',
    value: 'Lifetime',
  },
  {
    text: 'LOVE',
    value: 'LOVE',
  },
  {
    text: 'MiniMini+',
    value: 'MiniMini+',
  },
  {
    text: 'MTV Music',
    value: 'MTV Music',
  },
  {
    text: 'Nickelodeon',
    value: 'Nickelodeon',
  },
  {
    text: 'Novela tv',
    value: 'Novela tv',
  },
  {
    text: 'nSport+',
    value: 'nSport+',
  },
  {
    text: 'Paramount Channel HD',
    value: 'Paramount Channel HD',
  },
  {
    text: 'Planete+',
    value: 'Planete+',
  },
  {
    text: 'Romance TV',
    value: 'Romance TV',
  },
  {
    text: 'SCI FI',
    value: 'SCI FI',
  },
  {
    text: 'Sundance TV',
    value: 'Sundance TV',
  },
  {
    text: 'Superstacja',
    value: 'Superstacja',
  },
  {
    text: 'Tele 5',
    value: 'Tele 5',
  },
  {
    text: 'teleTOON+',
    value: 'teleTOON+',
  },
  {
    text: 'TLC',
    value: 'TLC',
  },
  {
    text: 'TNT',
    value: 'TNT',
  },
  {
    text: 'Travel Channel',
    value: 'Travel Channel',
  },
  {
    text: 'TTV HD',
    value: 'TTV HD',
  },
  {
    text: 'TV 6',
    value: 'TV 6',
  },
  {
    text: 'TVS',
    value: 'TVS',
  },
  {
    text: 'Water Planet',
    value: 'Water Planet',
  },
  {
    text: 'ZOOM TV',
    value: 'ZOOM TV',
  },
]

export const STATIONS = [
  {
    text: 'TVP 1',
    value: 'TVP 1',
  },
  {
    text: 'TVP 2',
    value: 'TVP 2',
  },
  {
    text: 'POLSAT',
    value: 'POLSAT',
  },
  {
    text: 'TVN',
    value: 'TVN',
  },
  {
    text: 'TV 4',
    value: 'TV 4',
  },
  {
    text: 'TVN 7',
    value: 'TVN 7',
  },
  {
    text: 'TV Puls',
    value: 'TV Puls',
  },
  {
    text: 'Puls 2',
    value: 'Puls 2',
  },
  {
    text: 'TVP Info',
    value: 'TVP Info',
  },
  {
    text: 'TVP Kultura',
    value: 'TVP Kultura',
  },
  {
    text: 'Fokus TV',
    value: 'Fokus TV',
  },
  {
    text: 'TVP Historia',
    value: 'TVP Historia',
  },
  {
    text: 'TVP Seriale',
    value: 'TVP Seriale',
  },
  {
    text: 'AXN',
    value: 'AXN',
  },
  {
    text: 'AXN White',
    value: 'AXN White',
  },
  {
    text: 'AXN Black',
    value: 'AXN Black',
  },
  {
    text: 'Ale kino+',
    value: 'Ale kino+',
  },
  {
    text: 'TNT',
    value: 'TNT',
  },
  {
    text: 'TNT Fabuła',
    value: 'TNT Fabuła',
  },
  {
    text: 'Stopklatka TV',
    value: 'Stopklatka TV',
  },
  {
    text: '13 Ulica',
    value: '13 Ulica',
  },
  {
    text: '4FUN.TV',
    value: '4FUN.TV',
  },
  {
    text: 'Active Family',
    value: 'Active Family',
  },
  {
    text: 'Adventure',
    value: 'Adventure',
  },
  {
    text: 'AMC',
    value: 'AMC',
  },
  {
    text: 'Animal Planet HD',
    value: 'Animal Planet HD',
  },
  {
    text: 'ATM Rozrywka',
    value: 'ATM Rozrywka',
  },
  {
    text: 'AXN Spin',
    value: 'AXN Spin',
  },
  {
    text: 'BBC Brit',
    value: 'BBC Brit',
  },
  {
    text: 'BBC CBeebies',
    value: 'BBC CBeebies',
  },
  {
    text: 'BBC Earth',
    value: 'BBC Earth',
  },
  {
    text: 'BBC First',
    value: 'BBC First',
  },
  {
    text: 'BBC Lifestyle',
    value: 'BBC Lifestyle',
  },
  {
    text: 'CANAL+ Discovery',
    value: 'CANAL+ Discovery',
  },
  {
    text: 'CANAL+ Family',
    value: 'CANAL+ Family',
  },
  {
    text: 'CANAL+ Film',
    value: 'CANAL+ Film',
  },
  {
    text: 'CANAL+ Seriale',
    value: 'CANAL+ Seriale',
  },
  {
    text: 'CANAL+ Sport 2',
    value: 'CANAL+ Sport 2',
  },
  {
    text: 'CANAL+ Sport',
    value: 'CANAL+ Sport',
  },
  {
    text: 'CANAL+',
    value: 'CANAL+',
  },
  {
    text: 'Cartoon Network',
    value: 'Cartoon Network',
  },
  {
    text: 'CBS Action',
    value: 'CBS Action',
  },
  {
    text: 'CBS Europa',
    value: 'CBS Europa',
  },
  {
    text: 'CBS Reality',
    value: 'CBS Reality',
  },
  {
    text: 'CI POLSAT',
    value: 'CI POLSAT',
  },
  {
    text: 'Cinemax',
    value: 'Cinemax',
  },
  {
    text: 'Cinemax2',
    value: 'Cinemax2',
  },
  {
    text: 'Comedy Central Family',
    value: 'Comedy Central Family',
  },
  {
    text: 'Comedy Central',
    value: 'Comedy Central',
  },
  {
    text: 'Da Vinci',
    value: 'Da Vinci',
  },
  {
    text: 'Discovery Channel',
    value: 'Discovery Channel',
  },
  {
    text: 'Discovery Life',
    value: 'Discovery Life',
  },
  {
    text: 'Discovery Science',
    value: 'Discovery Science',
  },
  {
    text: 'Disney Channel',
    value: 'Disney Channel',
  },
  {
    text: 'Disney Junior',
    value: 'Disney Junior',
  },
  {
    text: 'Domo+',
    value: 'Domo+',
  },
  {
    text: 'DTX',
    value: 'DTX',
  },
  {
    text: 'E! Entertainment',
    value: 'E! Entertainment',
  },
  {
    text: 'Eleven Sports 1',
    value: 'Eleven Sports 1',
  },
  {
    text: 'Eleven Sports 2',
    value: 'Eleven Sports 2',
  },
  {
    text: 'Eska TV',
    value: 'Eska TV',
  },
  {
    text: 'Eurosport 1',
    value: 'Eurosport 1',
  },
  {
    text: 'Eurosport 2',
    value: 'Eurosport 2',
  },
  {
    text: 'Extreme Sports Channel',
    value: 'Extreme Sports Channel',
  },
  {
    text: 'Fightklub',
    value: 'Fightklub',
  },
  {
    text: 'FilmBox Arthouse',
    value: 'FilmBox Arthouse',
  },
  {
    text: 'FilmBox Extra HD',
    value: 'FilmBox Extra HD',
  },
  {
    text: 'FilmBox Premium HD',
    value: 'FilmBox Premium HD',
  },
  {
    text: 'Food Network',
    value: 'Food Network',
  },
  {
    text: 'FOX Comedy',
    value: 'FOX Comedy',
  },
  {
    text: 'FOX',
    value: 'FOX',
  },
  {
    text: 'HBO',
    value: 'HBO',
  },
  {
    text: 'HBO2',
    value: 'HBO2',
  },
  {
    text: 'HBO3',
    value: 'HBO3',
  },
  {
    text: 'HGTV',
    value: 'HGTV',
  },
  {
    text: 'HISTORY',
    value: 'HISTORY',
  },
  {
    text: 'HISTORY2',
    value: 'HISTORY2',
  },
  {
    text: 'ID',
    value: 'ID',
  },
  {
    text: 'Kino Polska Muzyka',
    value: 'Kino Polska Muzyka',
  },
  {
    text: 'Kino Polska',
    value: 'Kino Polska',
  },
  {
    text: 'Kino TV',
    value: 'Kino TV',
  },
  {
    text: 'Kuchnia+',
    value: 'Kuchnia+',
  },
  {
    text: 'Lifetime',
    value: 'Lifetime',
  },
  {
    text: 'LOVE',
    value: 'LOVE',
  },
  {
    text: 'MiniMini+',
    value: 'MiniMini+',
  },
  {
    text: 'Motowizja',
    value: 'Motowizja',
  },
  {
    text: 'MTV Music',
    value: 'MTV Music',
  },
  {
    text: 'MTV Polska',
    value: 'MTV Polska',
  },
  {
    text: 'Nat Geo People HD',
    value: 'Nat Geo People HD',
  },
  {
    text: 'National Geographic Wild',
    value: 'National Geographic Wild',
  },
  {
    text: 'National Geographic',
    value: 'National Geographic',
  },
  {
    text: 'Nickelodeon',
    value: 'Nickelodeon',
  },
  {
    text: 'Novela tv',
    value: 'Novela tv',
  },
  {
    text: 'nSport+',
    value: 'nSport+',
  },
  {
    text: 'Paramount Channel HD',
    value: 'Paramount Channel HD',
  },
  {
    text: 'Planete+',
    value: 'Planete+',
  },
  {
    text: 'Polo TV',
    value: 'Polo TV',
  },
  {
    text: 'POLSAT 2',
    value: 'POLSAT 2',
  },
  {
    text: 'POLSAT Café',
    value: 'POLSAT Café',
  },
  {
    text: 'POLSAT Film',
    value: 'POLSAT Film',
  },
  {
    text: 'POLSAT JimJam',
    value: 'POLSAT JimJam',
  },
  {
    text: 'POLSAT News 2',
    value: 'POLSAT News 2',
  },
  {
    text: 'POLSAT News',
    value: 'POLSAT News',
  },
  {
    text: 'POLSAT Play',
    value: 'POLSAT Play',
  },
  {
    text: 'POLSAT Romans',
    value: 'POLSAT Romans',
  },
  {
    text: 'POLSAT Sport Extra',
    value: 'POLSAT Sport Extra',
  },
  {
    text: 'POLSAT Sport News',
    value: 'POLSAT Sport News',
  },
  {
    text: 'POLSAT Sport',
    value: 'POLSAT Sport',
  },
  {
    text: 'POLSAT Viasat Explore HD',
    value: 'POLSAT Viasat Explore HD',
  },
  {
    text: 'POLSAT Viasat History HD',
    value: 'POLSAT Viasat History HD',
  },
  {
    text: 'POLSAT Viasat Nature HD',
    value: 'POLSAT Viasat Nature HD',
  },
  {
    text: 'PULS 2',
    value: 'PULS 2',
  },
  {
    text: 'Romance TV',
    value: 'Romance TV',
  },
  {
    text: 'SCI FI',
    value: 'SCI FI',
  },
  {
    text: 'Sportklub',
    value: 'Sportklub',
  },
  {
    text: 'Sundance TV',
    value: 'Sundance TV',
  },
  {
    text: 'Superstacja',
    value: 'Superstacja',
  },
  {
    text: 'Tele 5',
    value: 'Tele 5',
  },
  {
    text: 'teleTOON+',
    value: 'teleTOON+',
  },
  {
    text: 'TLC',
    value: 'TLC',
  },
  {
    text: 'Travel Channel',
    value: 'Travel Channel',
  },
  {
    text: 'TTV HD',
    value: 'TTV HD',
  },
  {
    text: 'TV 6',
    value: 'TV 6',
  },
  {
    text: 'TV Republika',
    value: 'TV Republika',
  },
  {
    text: 'TV Trwam',
    value: 'TV Trwam',
  },
  {
    text: 'TVN 24 Biznes i Świat',
    value: 'TVN 24 Biznes i Świat',
  },
  {
    text: 'TVN 24',
    value: 'TVN 24',
  },
  {
    text: 'TVN Fabuła',
    value: 'TVN Fabuła',
  },
  {
    text: 'TVN Style',
    value: 'TVN Style',
  },
  {
    text: 'TVN Turbo',
    value: 'TVN Turbo',
  },
  {
    text: 'TVP 3',
    value: 'TVP 3',
  },
  {
    text: 'TVP ABC',
    value: 'TVP ABC',
  },
  {
    text: 'TVP HD',
    value: 'TVP HD',
  },
  {
    text: 'TVP Polonia',
    value: 'TVP Polonia',
  },
  {
    text: 'TVP Sport',
    value: 'TVP Sport',
  },
  {
    text: 'TVS',
    value: 'TVS',
  },
  {
    text: 'Water Planet',
    value: 'Water Planet',
  },
  {
    text: 'ZOOM TV',
    value: 'ZOOM TV',
  },
]
