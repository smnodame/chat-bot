const config = {
    start_id: '16',
    bot: {
      name: 'Clave Host',
      _id: 2
    },
    steps: [
      {
        id: '1',
        question: 'What number I am thinking?',
        trigger: '15',
        system: true,
        message: `It's around {amount}, so you have to pay {price} bath per month.`,
        input: {
          mode: 'PRODUCT-CARD',
          title: 'Coverage amounts',
          card: {
            image: require('./images/hamberger.svg'),
            title: 'Crabstick Cocktail',
            description: 'Parsley sausage, Crab stick, Mozzarella Cheese. With the choices of crust between Pan and Crispy Thin available.',
            min: 1000,
            max: 10000,
            currency: '$',
            default_number: 2000,
            increase_number: 1000,
            key: 'amount',
          },
          button: {
            operation: 'ADD',
            default_number: 0.75,
            increase_number: 0.75,
            per: 'MO',
            key: 'price',
          }
        }
      },
      {
        id: '2',
        message: 'Awesome! You are a telepath!',
        trigger: '3',
        image: 'http://smnodame.com/public/profile.jpg',
      },
      {
        id: '3',
        message: 'Nice place!',
        location: {
          latitude: 48.864601,
          longitude: 2.398704
        },
        trigger: '5'
      },
      {
        id: '4',
        trigger: '7',
        message: 'I am thinking number {number}.',
        input: {
          mode: 'INPUT',
          textinput: {
            type: 'number',
            min: 0,
            max: 100,
            placeholder: 'ADD SOME WORD ...',
            keyboardType: 'number-pad',
            key: 'number',
          },
        }
      },
      {
        id: '5',
        message: 'What number I am thinking?',
        trigger: '4',
      },
      {
        id: '6',
        message: 'I am {answer}',
        input: {
          mode: 'INPUT',
          textinput: {
            placeholder: 'เพิ่มคำตอบ',
            key: 'answer',
          },
        },
        trigger: '7.1',
      },
      {
        id: '7',
        message: 'How are you today?',
        trigger: '6',
      },
      {
        id: '7.1',
        message: 'Where are you?',
        trigger: '8',
      },
      {
        id: '8',
        input: {
          mode: 'BUTTON',
          layout: 'vertical',
          options: [{
            label: 'CHIANG MAI',
            value: 'I AM IN CHIANG MAI',
            trigger: '8.1',
          }, {
            label: 'BANGKOK',
            value: 'I AM IN BANGKOK',
            trigger: '10',
          }, {
            label: 'KORAT',
            value: 'I AM IN KORAT',
            trigger: '11',
          }]
        }
      },
      {
        id: '8.1',
        message: 'Since?',
        trigger: '9'
      },
      {
        id: '9',
        message: 'the date is {date}',
        input: {
          mode: 'CALENDAR',
          calendar: {
            mode: 'datetime',
            key: 'date',
          },
          button: {
            text: 'CHOOSE'
          }
        },
        trigger: '12'
      },
      {
        id: '10',
        message: 'you choose BANGKOK',
        trigger: '13'
      },
      {
        id: '11',
        message: 'you choose Korat',
        trigger: '14'
      },
      {
        id: '12',
        message: 'Thank you for you info!'
      },
      {
        id: '13',
        input: {
          min: 1,
          max: 2,
          message_func: (chosen) => {
            return chosen.reduce((o, n, index) => {
                return `${o} ${index + 1}. ${n.value}\n`
              }, '')
          },
          mode: 'CHECKBOX',
          options: [{
            label: 'CM',
            value: 'CHIANG MAI',
            key: 'CM',
          }, {
            label: 'BKK',
            value: 'BANGKOK',
            key: 'BKK',
          }, {
            label: 'KR',
            value: 'KORAT',
            key: 'KR',
          }],
          button: {
            text: 'CHOOSE'
          },
        },
        trigger: '12',
      },
      {
        id: '14',
        message: 'Your text is {TEXT} and number is {NUMBER}',
        input: {
          mode: 'MULTI-INPUT',
          title: 'Taylor Swift',
          description: 'Taylor Alison Swift is an American singer-songwriter.',
          inputs: [{
            placeholder: 'THIS IS TEXT',
            key: 'TEXT',
          }, {
            placeholder: 'THIS IS NUMBER PAD',
            keyboardType: 'number-pad',
            key: 'NUMBER',
          }],
          button: {
            text: 'TAKE IT'
          }
        },
        trigger: '15',
      },
      {
        id: '15',
        question: 'choose you option!',
        message: 'You have to pay more {total}',
        input: {
          mode: 'OPTION-FEATURE',
          title: 'Add Others To Your Policy',
          message_func: (chosen) => {
            return `We enabled ${chosen.length} items.`
          },
          options: [{
            title: 'Icon Button',
            description: 'The Icon Buttons, can take text and/or icon as child elements inside the Button.',
            price: 0,
            per: 'MO',
            checked: false,
            currency: '$',
            key: 'icon_button',
            popup: {
              title: 'Taylor Swift',
              description: 'Taylor Alison Swift is an American singer-songwriter.',
              inputs: [{
                placeholder: 'THIS IS TEXT',
                key: 'TEXT',
                require: true,
              }, {
                placeholder: 'THIS IS NUMBER PAD',
                keyboardType: 'number-pad',
                key: 'NUMBER',
                require: false,
              }],
              button: {
                text: 'TAKE IT'
              },
            },
          }, {
            title: 'Button Size',
            description: 'Include the following props with your Button',
            price: 52,
            per: 'MI',
            checked: false,
            currency: '฿',
            key: 'button_size',
          }, {
            title: 'Disabled Button',
            description: 'A disabled button is unusable and un-clickable.',
            price: 20,
            per: 'S',
            checked: true,
            currency: '$',
            key: 'disabled_button',
          }],
          button: {
            operation: 'ADD',
            default_number: 0,
            per: 'MO',
            key: 'total',
          }
        },
        system: true,
        trigger: '16',
      },
      {
        id: '16',
        question: 'choose you option!',
        message: 'You have to pay more {total} bath.',
        trigger: '2',
        input: {
          mode: 'CIRCLE-CARD',
          title: 'Add Extra Coverage',
          description: 'Parsley sausage, Crab stick, Mozzarella Cheese. With the choices of crust between Pan and Crispy Thin available.',
          button: {
            operation: 'ADD',
            default_number: 5,
            per: 'MO',
            key: 'total',
          },
          options: [
              {
                  key: 1,
                  image: require('./images/gallery.svg'),
                  name: 'GALLERY',
                  currency: '$',
                  selected: true,
                  popup: {
                    step_1: {
                      image: require('./images/gallery.svg'),
                      title: 'GALLERY',
                      description: 'Gallery may refer to: Contents.',
                      min: 1000,
                      max: 10000,
                      currency: '$',
                      default_number: 2000,
                      increase_number: 1000,
                      button: {
                        operation: 'ADD',
                        default_number: 0.75,
                        increase_number: 0.75,
                        per: 'MO',
                      },
                    },
                    step_2: {
                      title: 'IMPORTANT',
                      description: 'Gallery may refer to: Contents.',
                      items: [
                        {
                          image: require('./images/location.svg'),
                          description: '"Location" is the debut single by American singer Khalid. It was released on August 26, 2016'
                        },
                        {
                          image: require('./images/phone.svg'),
                          description: 'A mobile phone, known as a cell phone in North America'
                        }
                      ],
                      button: {
                        text: 'GOT IT',
                      },
                    }
                  },
              },
              {
                  key: 2,
                  image: require('./images/calendar.svg'),
                  name: 'CALENDAR',
                  currency: '$',
                  selected: false,
                  popup: {
                    step_1: {
                      image: require('./images/calendar.svg'),
                      title: 'CALENDAR',
                      description: 'A calendar is a system of organizing days for social, religious, commercial or administrative purposes. ',
                      min: 50,
                      max: 100,
                      currency: '$',
                      default_number: 60,
                      increase_number: 1,
                      button: {
                        operation: 'เพิ่ม',
                        default_number: 0.25,
                        increase_number: 0.25,
                        per: 'MO',
                      },
                    },
                    step_2: {
                      title: 'IMPORTANT',
                      description: 'Gallery may refer to: Contents.',
                      items: [
                        {
                          image: require('./images/location.svg'),
                          description: '"Location" is the debut single by American singer Khalid. It was released on August 26, 2016'
                        },
                        {
                          image: require('./images/phone.svg'),
                          description: 'A mobile phone, known as a cell phone in North America'
                        },
                        {
                          image: require('./images/phone.svg'),
                          description: 'A mobile phone, known as a cell phone in North America'
                        }
                      ],
                      button: {
                        text: 'CONFIRM',
                      },
                    }
                  },
              },
              {
                  key: 3,
                  image: require('./images/video.svg'),
                  name: 'VIDEO',
                  price: 500,
                  currency: '฿',
                  selected: false,
                  popup: {
                    step_1: {
                      image: require('./images/video.svg'),
                      title: 'VIDEO',
                      description: 'Video is an electronic medium for the recording, copying, playback, broadcasting, and display of moving visual media. ',
                      min: 0,
                      max: 100,
                      currency: '฿',
                      default_number: 0,
                      increase_number: 1,
                      button: {
                        operation: 'ADD',
                        default_number: 0.50,
                        increase_number: 0.50,
                        per: 'MO',
                      },
                    },
                    step_2: {
                      title: 'IMPORTANT',
                      description: 'Gallery may refer to: Contents.',
                      items: [
                        {
                          image: require('./images/location.svg'),
                          description: '"Location" is the debut single by American singer Khalid. It was released on August 26, 2016'
                        },
                      ],
                      button: {
                        text: 'CONFIRM',
                      },
                    }
                  },
              }
          ]
        },
        system: true,
      },
    ]
  }


export {
    config
}