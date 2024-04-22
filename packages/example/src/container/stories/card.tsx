import {type FC, Fragment} from 'react';
import {
  Box,
  BoxPadded,
  BoxSize,
  Flex,
  FlexJustifyContent,
} from '@xorkevin/nuke/component/box';
import {
  Button,
  ButtonGroup,
  ButtonVariant,
} from '@xorkevin/nuke/component/button';
import {TextClasses} from '@xorkevin/nuke/component/text';

import {DemoTitle, DemoWell} from './demoutil.js';

const Story: FC = () => {
  return (
    <Fragment>
      <DemoTitle>Card</DemoTitle>
      <DemoWell>
        <Box size={BoxSize.S2} padded paddedSmall center card>
          <hgroup>
            <h3 className={TextClasses.TitleMedium}>Card</h3>
            <p>A test card</p>
          </hgroup>
          <Box padded={BoxPadded.TB} paddedSmall>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel
            lectus elit. Curabitur vitae risus nec sem mollis sodales.
          </Box>
          <Flex justifyContent={FlexJustifyContent.End}>
            <ButtonGroup gap>
              <Button>Cancel</Button>
              <Button variant={ButtonVariant.Primary}>Submit</Button>
            </ButtonGroup>
          </Flex>
        </Box>
      </DemoWell>
    </Fragment>
  );
};

export default Story;
