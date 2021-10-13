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
      name: 'New Year resolutions worksheet',
      description: `Simple worksheet for young students or early ESL/EFL learners.
      Levels: Pre A1-A1
      Follow-up: Glue the completed worksheet on the first page of students’ notebook to remind them of the goals they set at the beginning of the year.
      Goals: teach ss to set goals; teach new vocabulary; encourage independent learning; promote healthy habits`,
      assetTypeId: 'assetTypes::paid',
      categoryId: 'categories::maths',
      ownerId: 'users::user2',
      price: 3.50,
      currency: "GBP",
      validated: true,
      quantity: 1,
      active: true,
      customAttributes: {},
      metadata: {
        images: [
          {
            name: 'screenshot',
            url: 'https://d1e4pidl3fu268.cloudfront.net/b84e75c6-fe8c-4293-8fd5-4a122d94f64d/Coverphoto.crop_694x521_5,0.preview.png'
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
    exampleResource2: {
      name: 'Adjectives ending in ed and ing',
      description: `This short lesson is suitable for Elementary (A2) level ESL/ EAL/ EFL students who are having trouble distinguishing between adjectives ending in -ed and those ending in -ing. It is also suitable for primary school children who need some extra grammar / spag practice.`,
      assetTypeId: 'assetTypes::paid',
      categoryId: 'categories::english',
      ownerId: 'users::user1',
      price: 5.00,
      currency: "GBP",
      validated: true,
      active: true,
      quantity: 1,
      customAttributes: {},
      metadata: {
        images: [
          {
            name: 'screenshot',
            url: 'https://d1e4pidl3fu268.cloudfront.net/0c694f4c-9fb6-4bd0-92e1-aea8bad55782/Whatsincludedadjectivesinedanding.crop_694x521_5,0.preview.png'
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
    exampleResource3: {
      name: 'Chinese New Year Quiz',
      description: `This interactive powerpoint has 27 questions to test your students’ knowledge of the Chinese New Year. It is editable so you can copy slides and create your own questions in addition to the existing ones.
      Suitable for all ages.
      Updated to correct typos and include worksheet version with and without answers in case anyone wants to print and hand out to students.
      
      `,
      assetTypeId: 'assetTypes::free',
      categoryId: 'categories::science',
      ownerId: 'users::user2',
      price: 0.00,
      quantity: 1,
      currency: "GBP",
      validated: true,
      active: true,
      customAttributes: {},
      metadata: {
        images: [
          {
            name: 'screenshot',
            url: 'https://d1e4pidl3fu268.cloudfront.net/c476d12f-f65c-4c62-ab5c-69fafe029dd5/cover.crop_696x521_0,3.preview.png'
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
    exampleResource4: {
      name: 'Numbers and more greetings lesson',
      description: `This resource is the second of a series called Basic English for children. This lesson teaches children to answer the questions How are you and How old are you . It also teaches them numbers 1-10 through songs and interactive activities. It is most suitable for early ESL/EAL/EFL learners, especially children aged 4-7.`,
      assetTypeId: 'assetTypes::paid',
      categoryId: 'categories::maths',
      ownerId: 'users::user2',
      price: 3.00,
      quantity: 1,
      currency: "GBP",
      validated: true,
      active: true,
      customAttributes: {},
      metadata: {
        images: [
          {
            name: 'screenshot',
            url: 'https://d1e4pidl3fu268.cloudfront.net/621c71b7-f4de-4e65-90d4-0a219285e20b/coverimage.crop_699x524_0,1.preview.png'
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
    exampleResource5: {
      name: 'Family tree worksheet',
      description: `A simple worksheet to teach basic vocabulary on members of the family and descriptive language (great to review colours, facial features and clothes). Suitable for young students (EYFS, Grade 1, Kindergarten) and early ESL/EFL/EAL learners.`,
      assetTypeId: 'assetTypes::free',
      categoryId: 'categories::english',
      ownerId: 'users::user2',
      price: 0.00,
      currency: "GBP",
      validated: true,
      quantity: 1,
      active: true,
      customAttributes: {},
      metadata: {
        images: [
          {
            name: 'screenshot',
            url: 'https://d1e4pidl3fu268.cloudfront.net/9e09788a-3afa-49c2-8aaf-83b8fc0d8040/Cover.crop_695x521_9,0.preview.png'
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
    exampleResource6: {
      name: 'Greetings and weather lesson',
      description: `This resource is the first of a series called * Basic English for children*. This lesson teaches children to introduce themselves and practise weather vocabulary. It is most suitable for early ESL/EAL/EFL learners, especially children aged 4-7.`,
      assetTypeId: 'assetTypes::paid',
      categoryId: 'categories::english',
      ownerId: 'users::user1',
      price: 3.10,
      currency: "GBP",
      validated: true,
      quantity: 1,
      active: true,
      customAttributes: {},
      metadata: {
        images: [
          {
            name: 'screenshot',
            url: 'https://d1e4pidl3fu268.cloudfront.net/8c79d765-f9e2-4e60-9941-bc12d7ec987c/Cover.crop_666x500_34,0.preview.PNG'
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
    exampleResource7: {
      name: 'Chinese New Year quiz (easy language)',
      description: `This is an easy Chinese New Year quiz for beginners in English (ESL / EAL/ EFL) or young children (EYFS / Grade 1).`,
      assetTypeId: 'assetTypes::paid',
      categoryId: 'categories::english',
      ownerId: 'users::user1',
      price: 3.00,
      currency: "GBP",
      validated: true,
      quantity: 1,
      active: true,
      customAttributes: {},
      metadata: {
        images: [
          {
            name: 'screenshot',
            url: 'https://d1e4pidl3fu268.cloudfront.net/be92b486-4a41-43cf-bd1f-3d4d49ece79c/Whatsincluded.crop_694x520_0,0.preview.png'
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
    exampleResource8: {
      name: 'Animal report template',
      description: `Younger students (EYFS, Grade 1, Kindergarten) or early ESL/EAL/EFL learners can use this simple template when learning how to write reports.`,
      assetTypeId: 'assetTypes::free',
      categoryId: 'categories::science',
      ownerId: 'users::user1',
      price: 0.00,
      currency: "GBP",
      validated: true,
      quantity: 1,
      active: true,
      customAttributes: {},
      metadata: {
        images: [
          {
            name: 'screenshot',
            url: 'https://d1e4pidl3fu268.cloudfront.net/b279d5cb-9653-4dc8-a175-2c0994125552/Cover.crop_694x521_5,0.preview.png'
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
            'assetTypes::paid': {},
            'assetTypes::free': {}
          },
          searchOptions: {
            modes: {
              default: {
                assetTypesIds: ['assetTypes::paid', 'assetTypes::free'],
                customAttributes: [
                ],
                isActiveFor: [
                  'public',
                  'user'
                ]
              },
              paid: {
                assetTypesIds: ['assetTypes::paid'],
                customAttributes: [
                ],
                isActiveFor: [
                  'public',
                  'user'
                ]
              },
              free: {
                assetTypesIds: ['assetTypes::free'],
                customAttributes: [
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
          avatarUrl: 'https://www.vippng.com/png/detail/148-1481022_businessman-teacher-cartoon-lecture-man-male-boy-customers.png'
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
          avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCzrcGSNi7_0g1vyhJwROpw-ZkP4s1Cehua7_hw7yT_Dx8JEAMIrWRo2l4zFKSFu4IqgM&usqp=CAU'
        }
      }
    }
  },
  workflows: getWorkflows(locale)
  /* eslint-enable quotes */
}
