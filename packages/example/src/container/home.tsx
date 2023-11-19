import type {FC, PropsWithChildren} from 'react';
import {Box, BoxClasses, BoxSize} from '@xorkevin/nuke/component/box';
import {
  ColorBG,
  ColorBGClasses,
  ColorClasses,
  ColorFG,
  ColorFGClasses,
  TextClasses,
} from '@xorkevin/nuke/component/text';
import {classNames} from '@xorkevin/nuke/computil';

import styles from './home.module.css';

type SwatchProps = {
  fg: ColorFG;
  bg: ColorBG;
};
const Swatch: FC<SwatchProps> = ({fg, bg}) => {
  return (
    <figure
      className={classNames(
        ColorClasses.B1,
        styles['text-color-swatch-figure'],
      )}
    >
      <div
        className={classNames(
          [ColorFGClasses[fg], ColorBGClasses[bg]],
          styles['text-color-swatch'],
        )}
      >
        <div className={TextClasses.TitleLarge}>Aa</div>
      </div>
      <figcaption>
        <code>{`${fg}, ${bg}`}</code>
      </figcaption>
    </figure>
  );
};

const SwatchRow: FC<PropsWithChildren> = ({children}) => {
  return <div className={styles['text-color-swatch-row']}>{children}</div>;
};

const Swatches: FC<PropsWithChildren> = ({children}) => {
  return (
    <div
      className={classNames(
        ColorClasses.B2,
        BoxClasses.PadSmall,
        BoxClasses.BorderRound,
        styles['text-color-swatches'],
      )}
    >
      {children}
    </div>
  );
};

const Home: FC = () => {
  return (
    <Box size={BoxSize.S4} padded center>
      <Box padded>
        <hgroup>
          <h1
            className={classNames(
              TextClasses.Display,
              styles['heading-display'],
            )}
          >
            Nuke
          </h1>
          <p className={TextClasses.Subtitle}>a reactive frontend toolkit</p>
        </hgroup>
      </Box>
      <Swatches>
        <SwatchRow>
          <Swatch fg={ColorFG.F1} bg={ColorBG.B1} />
          <Swatch fg={ColorFG.F2} bg={ColorBG.B1} />
          <Swatch fg={ColorFG.F3} bg={ColorBG.B1} />
          <Swatch fg={ColorFG.FA} bg={ColorBG.B1} />
        </SwatchRow>
        <SwatchRow>
          <Swatch fg={ColorFG.F1} bg={ColorBG.B2} />
          <Swatch fg={ColorFG.F2} bg={ColorBG.B2} />
          <Swatch fg={ColorFG.F3} bg={ColorBG.B2} />
          <Swatch fg={ColorFG.FA} bg={ColorBG.B2} />
        </SwatchRow>
        <SwatchRow>
          <Swatch fg={ColorFG.F1} bg={ColorBG.B3} />
          <Swatch fg={ColorFG.F2} bg={ColorBG.B3} />
          <Swatch fg={ColorFG.F3} bg={ColorBG.B3} />
          <Swatch fg={ColorFG.FA} bg={ColorBG.B3} />
        </SwatchRow>
        <SwatchRow>
          <Swatch fg={ColorFG.F1} bg={ColorBG.BA} />
          <Swatch fg={ColorFG.F2} bg={ColorBG.BA} />
          <Swatch fg={ColorFG.F3} bg={ColorBG.BA} />
          <Swatch fg={ColorFG.FA} bg={ColorBG.BA} />
        </SwatchRow>
        <SwatchRow>
          <Swatch fg={ColorFG.F1} bg={ColorBG.A1} />
          <Swatch fg={ColorFG.F2} bg={ColorBG.A1} />
          <Swatch fg={ColorFG.F3} bg={ColorBG.A1} />
          <Swatch fg={ColorFG.FA} bg={ColorBG.A1} />
        </SwatchRow>
        <SwatchRow>
          <Swatch fg={ColorFG.F1} bg={ColorBG.A2} />
          <Swatch fg={ColorFG.F2} bg={ColorBG.A2} />
          <Swatch fg={ColorFG.F3} bg={ColorBG.A2} />
          <Swatch fg={ColorFG.FA} bg={ColorBG.A2} />
        </SwatchRow>
        <SwatchRow>
          <Swatch fg={ColorFG.F1} bg={ColorBG.AA1} />
          <Swatch fg={ColorFG.F2} bg={ColorBG.AA1} />
          <Swatch fg={ColorFG.F3} bg={ColorBG.AA1} />
          <Swatch fg={ColorFG.FA} bg={ColorBG.AA1} />
        </SwatchRow>
        <SwatchRow>
          <Swatch fg={ColorFG.F1} bg={ColorBG.AA2} />
          <Swatch fg={ColorFG.F2} bg={ColorBG.AA2} />
          <Swatch fg={ColorFG.F3} bg={ColorBG.AA2} />
          <Swatch fg={ColorFG.FA} bg={ColorBG.AA2} />
        </SwatchRow>
        <SwatchRow>
          <Swatch fg={ColorFG.FI} bg={ColorBG.BI} />
          <Swatch fg={ColorFG.FA} bg={ColorBG.BI} />
        </SwatchRow>
      </Swatches>
    </Box>
  );
};

export default Home;
