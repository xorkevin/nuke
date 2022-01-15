const shanghaiPreview =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAdgB2AAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAcACoDAREAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAABwQGCAX/xAAsEAABAwMDAgQGAwAAAAAAAAABAgMEAAURBhIhBzETQVFxCBQiMoGRFUJh/8QAGgEBAQEAAwEAAAAAAAAAAAAAAgMEAAEFBv/EAB0RAAMBAAMBAQEAAAAAAAAAAAABAhEDEiExE0H/2gAMAwEAAhEDEQA/AFvS2qYrgSPGH7r2aPnpeCPbr42pAwsVBsqjpi84wAT60U9O28RHlX1Wzl/HvTB21FVvk4OsuulxOE+eBVJBQeuTsuKPhpOSecCraSCbp1quOHGzdppTyCEoOc/ms/fUaa48ejNF6w6PtDaWlFvcCE8/Uf0alS0S8/h0k9WbbcciC+hLYIClk4Aoys+hpsLervxAL0NPszkSH/KQ5ynlSkNnCkMo25Wg+RyonkY+k8jvSqsYuPj7J+ls07frZrfTTGpbHdDIt8tBUlY4IPYpUPIpIII9atFb8J1Dl4yMY7GT95/3dViRje1SJ8u5JiWicplO7K3F54Hp7Vh+vw9RpJazTXSXR1geh/MXxpiU8oBI3o5wPPmnhmdaxXk6I0tKtimERm0A5OG/pBOPPFcwLQJay6bRWNVw7xbrwsvw4b0RDLiAttIcStJVt7E4WeDweK457enc31WE3Qi09NOnMDSDcjxzD8ZRdIxu3urX29lY/FVieqDyV3ps5DnUiUHFAYxuPlT7g/MzFpi5S1z0Zc7LHb3rDL09SpWGkdH3u4sxG1NvYIArSn4Y6laX1rVN5RAXiV9oBBxSzzSbRQtUamu+8L+YG5X9scii2JSivXG/3JxoBboVlHmKXZ4d9EHEjUFxTIdSFo4Wodj6+9S1lVCw/9k=';

const comments = [
  {
    id: '0',
    username: 'xorkevin',
    score: 256,
    time: Date.now() - 0.5 * 86400000,
    content: 'Lorem ipsum dolor sit amet',
    children: [
      {
        id: '00',
        username: 'xorkevin',
        score: 32,
        time: Date.now() - 0.25 * 86400000,
        content: 'Consectetur adipiscing elit',
        children: [
          {
            id: '000',
            username: 'xorkevin',
            score: 16,
            time: Date.now(),
            content:
              'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
          },
        ],
      },
      {
        id: '01',
        username: 'xorkevin',
        score: 128,
        time: Date.now() - 0.325 * 86400000,
        content: 'Nunc facilisis orci dui, sit amet dictum massa porta at',
        children: [
          {
            id: '010',
            username: 'xorkevin',
            score: 16,
            time: Date.now(),
            content:
              'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
          },
          {
            id: '011',
            username: 'xorkevin',
            score: 16,
            time: Date.now(),
            content:
              'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
            children: [
              {
                id: '0110',
                username: 'xorkevin',
                score: 16,
                time: Date.now(),
                content:
                  'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
                children: [
                  {
                    id: '01100',
                    username: 'xorkevin',
                    score: 16,
                    time: Date.now(),
                    content:
                      'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
                  },
                ],
              },
            ],
          },
          {
            id: '012',
            username: 'xorkevin',
            score: 16,
            time: Date.now(),
            content:
              'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
          },
        ],
      },
    ],
  },
  {
    id: '1',
    username: 'xorkevin',
    score: 64,
    time: Date.now() - 0.75 * 86400000,
    content: 'Integer fringilla aliquet condimentum',
    children: [
      {
        id: '10',
        username: 'xorkevin',
        score: 8,
        time: Date.now() - 0.015625 * 86400000,
        content: 'In hac habitasse platea dictumst',
      },
      {
        id: '11',
        username: 'xorkevin',
        score: 16,
        time: Date.now(),
        content:
          'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
      },
    ],
  },
  {
    id: '2',
    username: 'xorkevin',
    score: 1,
    time: Date.now() - 180000,
    content:
      'Vivamus nibh enim, dignissim quis consequat at, sagittis in magna',
    children: [
      {
        id: '20',
        username: 'xorkevin',
        score: 16,
        time: Date.now(),
        content:
          'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
        children: [
          {
            id: '200',
            username: 'xorkevin',
            score: 16,
            time: Date.now(),
            content:
              'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
            children: [
              {
                id: '2000',
                username: 'xorkevin',
                score: 16,
                time: Date.now(),
                content:
                  'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
                children: [
                  {
                    id: '20000',
                    username: 'xorkevin',
                    score: 16,
                    time: Date.now(),
                    content:
                      'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
                    children: [
                      {
                        id: '200000',
                        username: 'xorkevin',
                        score: 16,
                        time: Date.now(),
                        content:
                          'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
                        children: [
                          {
                            id: '2000000',
                            username: 'xorkevin',
                            score: 16,
                            time: Date.now(),
                            content:
                              'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
                            children: [
                              {
                                id: '20000000',
                                username: 'xorkevin',
                                score: 16,
                                time: Date.now(),
                                content:
                                  'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
                                children: [
                                  {
                                    id: '200000000',
                                    username: 'xorkevin',
                                    score: 16,
                                    time: Date.now(),
                                    content:
                                      'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
                                    children: [
                                      {
                                        id: '2000000000',
                                        username: 'xorkevin',
                                        score: 16,
                                        time: Date.now(),
                                        content:
                                          'Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus',
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const tableData = [
  {
    name: 'Elrond',
    description:
      'a Half-elven conveyor, member of White Council and lord of Rivendell.',
  },
  {
    name: 'Erestor',
    description: 'an Elf-lord, advisor, and the chief of the House of Elrond.',
  },
  {
    name: 'Gandalf the Grey',
    description:
      'a Wizard, one of the Istari, and member of both the White Council and The Fellowship.',
  },
  {
    name: 'Aragorn',
    description:
      'a Ranger, heir of Isildur, member of The Fellowship, and Chieftain of the Dúnedain in the North.',
  },
  {
    name: 'Frodo Baggins',
    description:
      'a Hobbit of the Shire, member of The Fellowship, and Ring-bearer.',
  },
  {
    name: 'Bilbo Baggins',
    description:
      'a Hobbit of the Shire, former Ring-bearer, uncle of Frodo and long resident in Rivendell.',
  },
  {
    name: 'Boromir of Gondor',
    description:
      'son of Denethor II Ruling Steward of Minas Tirith, and member of The Fellowship.',
  },
  {
    name: 'Glóin of the Lonely Mountain',
    description:
      'representative of the King under the Mountain, Dain Ironfoot of the Dwarves.',
  },
  {
    name: 'Gimli',
    description:
      'son of Gloin, member of The Fellowship, and dwarf of the Lonely Mountain.',
  },
  {
    name: 'Legolas',
    description:
      'a Sindar Elf of the Woodland Realm (Mirkwood), son of Thranduil the Elvenking, and member of The Fellowship.',
  },
  {
    name: 'Glorfindel',
    description:
      'an Elf-lord of Rivendell, rescuer of Frodo and his company from the Nine.',
  },
  {
    name: 'Galdor of the Havens',
    description: 'messenger from Círdan of the Grey Havens.',
  },
];

export {shanghaiPreview, comments, tableData};
