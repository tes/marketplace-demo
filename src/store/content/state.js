export default {
  locale: '',
  currency: '',
  fetchingContentStatus: false,

  defaultLocale: 'en',
  defaultCurrency: 'USD',

  // from local JSON translation files
  localEntries: {},
  // from Content Entry API
  apiEntries: {},
  // used to refresh app when contents change
  lastContentUpdatedDate: '',

  addedRoutes: [],

  maxUploadFileSize: Math.pow(1024, 2) * 10, // 10 MB

  appUpdateAvailable: false,
  appUpdateNoCache: true,

  placeholderImageBaseUrl: 'https://t4.ftcdn.net/jpg/00/68/85/89/360_F_68858900_7KRDOJQYfK0h6HvEbc4ZnHx84HZXtVOq.jpg',
  acceptWebP: false,
  // http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever
  blankImageBase64: 'https://t4.ftcdn.net/jpg/00/68/85/89/360_F_68858900_7KRDOJQYfK0h6HvEbc4ZnHx84HZXtVOq.jpg',

  contentEditing: false,

  // from post message
  editingEntries: {},
  selectedEntry: {},
  messageOrigin: null,
}
