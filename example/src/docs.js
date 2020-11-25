import React from 'react';

import {Container, Card} from '@xorkevin/nuke';

const Story = ({children}) => {
  return (
    <Container padded>
      <Card>
        <Container className="story-body" padded>
          {children}
        </Container>
      </Card>
    </Container>
  );
};

const action = (name) => (...args) => {
  console.log(`Perform action ${name} with args:`, args);
};

export {Story, action};
