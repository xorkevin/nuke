import React from 'react';
import {CommentSection, Comment} from 'src/component/comment';

export default {title: 'Comment section'};

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
export const plain = () => (
  <CommentSection comments={comments}></CommentSection>
);
