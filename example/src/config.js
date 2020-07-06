const thamesPreview =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA8ADwAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAYACoDAREAAhEBAxEB/8QAGwAAAQQDAAAAAAAAAAAAAAAABQIEBgcACAn/xAAsEAABAwMCAgkFAAAAAAAAAAABAgMEAAUREiEGEwcjMTJBUWGDkSKhwdHw/8QAGQEBAQADAQAAAAAAAAAAAAAAAQIDBAUA/8QAIBEAAgIABwEBAAAAAAAAAAAAAAECEQMEEhMUIUEFUf/aAAwDAQACEQMRAD8AtluVbFuKAuEfOTnrh+6xPPteMFkU/QpDVb1Y0zWD7wqH9BGVZILRmopGRJaPuCjnJjxWh/CbjOpCmpLSwQFbLB2O4quQmGyFYbCUKCtafmjdTHQ0FUuJwN0/NVrQaWc3mrnOfuT7bcheQpZALgT4nzrekklZy4t3RieILskZbcfAT2qydvCpeHH0tTl4WNwmHZUaO9Nel63EB0BErSCN8DG/8a13hGZYgi6XziOx3aQ+yh0xU6BrSSRpA2zv96NiMonnjSjLoMWjpQuKYTjhkkhIOU8zceGcZrXnle+jPDNuuw5E6RLuuIys3VzKm0nt9KNgeSa4TkPx7k+BEd76snQcjeuxSOXbFIlTOQ80mO91iAnuHb6gfxUyinTLhJq0S2FPlNIiDkO6o4CBlJGBjBoSVEtuySQb6tYW28w4pLgAIKTUuIqbIxxJZluSnZVtQtCNjywg49aUv0GxzDNyERkGK9s2kdw+VToRaZ//2Q';

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

export {thamesPreview, comments};
