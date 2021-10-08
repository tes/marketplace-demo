// This file is used to seed Stelace database with data exported below,
// using init-data.js script (`yarn seed`).

const { getWorkflows } = require('../workflows')

// Please ensure you add your own translations if not using 'en' or 'fr'
const locale = process.env.VUE_APP_DEFAULT_LANGUAGE || 'en'

/* eslint-disable quotes */
module.exports = {
  // Object type keys like 'assetTypes' map to objects to create.
  // Nested object keys are only used by init-data script to enable references
  // where ids are expected, so that you can use 'assetTypes::someName'
  // instead of an id you don’t know yet (that will look like 'typ_xx…').
  assetTypes: {
    paid: {
      name: "paid",
      timeBased: false,
      infiniteStock: true,
      active: true
    },
    free: {
      name: "free",
      timeBased: false,
      infiniteStock: true,
      active: true
    }
  },
  assets: {
    exampleResource: {
      name: 'Example Resource',
      description: `Resource description`,
      assetTypeId: 'assetTypes::paid',
      categoryId: 'categories::maths',
      ownerId: 'users::user2',
      price: 3.50,
      currency: "GBP",
      validated: true,
      active: true,
      customAttributes: {},
      metadata: {
        images: [
          {
            name: 'screenshot',
            url: './resource-files/test-resource.png'
          }
        ],
        files: [
          {
            name: 'test-pdf',
            url: './resource-files/test-resource-file.pdf'
          }
        ]
      }
    },
    exampleResource1: {
      name: 'Example Resource 2',
      description: `Resource description 2`,
      assetTypeId: 'assetTypes::paid',
      categoryId: 'categories::science',
      ownerId: 'users::user1',
      price: 5.00,
      currency: "GBP",
      validated: true,
      active: true,
      customAttributes: {},
      metadata: {
        images: [
          {
            name: 'screenshot',
            url: './resource-files/test-resource.png'
          }
        ],
        files: [
          {
            name: 'test-pdf',
            url: './resource-files/test-resource-file.pdf'
          }
        ]
      }
    }
  },
  exampleResource2: {
    name: 'Example Resource 3',
    description: `Resource description 3`,
    assetTypeId: 'assetTypes::free',
    categoryId: 'categories::science',
    ownerId: 'users::user2',
    price: 0.00,
    currency: "GBP",
    validated: true,
    active: true,
    customAttributes: {},
    metadata: {
      images: [
        {
          name: 'screenshot',
          url: './resource-files/test-resource.png'
        }
      ],
      files: [
        {
          name: 'test-pdf',
          url: './resource-files/test-resource-file.pdf'
        }
      ]
    }
  },
  categories: {
    science: {
      name: 'Science'
    },
    maths: {
      name: 'Maths'
    },
    english: {
      name: 'English'
    }
  },
  config: {
    default: {
      stelace: {
        instant: {
          serviceName: process.env.VUE_APP_SERVICE_NAME,
          // The following is kept in sync with STELACE_INSTANT_WEBSITE_URL when deploying translations
          // And needed to enable dashboard live content editor
          // platformUrl: 'https://example.com,
          logoUrl: '',
          locale,
          currency: 'GBP',
          assetTypes: {
            'assetTypes::renting': {
              customAttributes: [
                'scenery',
              ]
            },
            'assetTypes::selling': {
              customAttributes: [
                'passive',
                'scenery',
              ]
            }
          },
          searchOptions: {
            modes: {
              default: {
                assetTypesIds: ['assetTypes::renting', 'assetTypes::selling'],
                customAttributes: [
                  'passive',
                  'scenery'
                ],
                isActiveFor: [
                  'public',
                  'user'
                ]
              },
              renting: {
                assetTypesIds: ['assetTypes::renting'],
                customAttributes: [
                  'scenery'
                ],
                isActiveFor: [
                  'public',
                  'user'
                ]
              },
              selling: {
                assetTypesIds: ['assetTypes::selling'],
                customAttributes: [
                  'passive',
                  'scenery'
                ],
                isActiveFor: [
                  'public',
                  'user'
                ]
              }
            }
          },
          ratingsOptions: {
            stats: {
              default: {
                labels: ['main'],
                maxScore: 5,
                form: 'star',
                hasComment: true
              }
            },
            types: {
              main: {
                label: 'main',
                maxScore: 5,
                form: 'star',
                hasComment: true,
              },
            },
            editOrder: [
              'main',
            ],
          },

          assetsInUniqueCountry: 'fr',
          assetsInUniqueCountryActive: true,
          googleAnalyticsTrackingActive: true,
          googleAnalyticsTrackingId: 'UA-XXXXXX-1', // for development

          twitterUsername: 'StelaceAPI',
          // facebookUrl: ''
        }
      }
    }
  },
  customAttributes: {
    passive: {
      name: 'passive',
      type: 'boolean',
      metadata: {
        instant: {
          i18n: {
            label: {
              entry: 'instant',
              field: 'config.customAttributes.passive_label',
              default: 'Passive House' // in case translation is missing
              // Generally in the default language of the platform
            },
            description: {}
          },
          materialIcon: 'wb_sunny', // example of UI customization with metadata
          priority: 10 // used to order custom attributes in UI
        }
      }
    },
    scenery: {
      name: 'scenery',
      type: 'boolean',
      metadata: {
        instant: {
          i18n: {
            label: {
              entry: 'instant',
              field: 'config.customAttributes.scenery_label',
              default: 'Breathtaking Scenery'
            },
            description: {}
          },
          materialIcon: 'insert_photo', // example of UI customization with metadata
          priority: 20 // used to order custom attributes in UI
        }
      }
    }
  },
  messages: {

  },
  ratings: {

  },
  transactions: {

  },
  users: {
    user1: {
      username: `larry@tes.com`,
      password: `larry@tes.com`,
      email: `larry@tes.com`,
      displayName: 'Larry',
      firstname: 'Last',
      lastname: 'Minute Larry',
      metadata: {
        instant: {
          avatarUrl: 'https://stelace-instant-files.s3.eu-central-1.amazonaws.com/p/238380/live/images/b857b499cb5da04af538d320ae6c28cc-Jeanne.png'
        }
      }
    },
    user2: {
      username: `mona@tes.com`,
      password: `mona@tes.com`,
      email: `mona@tes.com`,
      displayName: 'Mona',
      firstname: 'Mona',
      lastname: 'The Money Maker',
      metadata: {
        instant: {
          avatarUrl: 'https://stelace-instant-files.s3.eu-central-1.amazonaws.com/p/238380/live/images/b857b499cb5da04af538d320ae6c28cc-Jeanne.png'
        }
      }
    }
  },
  workflows: getWorkflows(locale)
  /* eslint-enable quotes */
}
