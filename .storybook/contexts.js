import 'fork-awesome/css/fork-awesome.min.css';
import 'inter-ui/inter.css';
import 'typeface-merriweather/index.css';
import 'main.scss';
import './style.scss';

export const contexts = [
  {
    icon: 'box',
    title: 'Themes',
    components: ['div'],
    params: [
      {name: 'Light', props: {className: 'storybook-view light'}},
      {name: 'Dark', props: {className: 'storybook-view dark dark-background'}},
    ],
    options: {
      deep: true,
      disable: false,
      cancelable: false,
    },
  },
];
