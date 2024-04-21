import {type FC, Fragment, type PropsWithChildren} from 'react';
import {
  ColorBG,
  ColorBGClasses,
  ColorClasses,
  ColorFG,
  ColorFGClasses,
  TextClasses,
} from '@xorkevin/nuke/component/text';
import {classNames, modClassNames} from '@xorkevin/nuke/computil';

import styles from './color.module.css';
import {DemoSection, DemoTitle, DemoWell} from './demoutil.js';

type SwatchProps = {
  fg: ColorFG;
  bg: ColorBG;
};
const Swatch: FC<SwatchProps> = ({fg, bg}) => {
  return (
    <figure
      className={classNames(
        ColorClasses.B1,
        modClassNames(styles, 'text-color-swatch-figure'),
      )}
    >
      <div
        className={classNames(
          [ColorFGClasses[fg], ColorBGClasses[bg]],
          modClassNames(styles, 'text-color-swatch'),
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
  return (
    <div className={modClassNames(styles, 'text-color-swatch-row')}>
      {children}
    </div>
  );
};

const Swatches: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={modClassNames(styles, 'text-color-swatches')}>
      {children}
    </div>
  );
};

const Story: FC = () => {
  return (
    <Fragment>
      <DemoTitle>Colors</DemoTitle>
      <DemoSection>Swatches</DemoSection>
      <DemoWell>
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
            <Swatch fg={ColorFG.F1} bg={ColorBG.AA3} />
            <Swatch fg={ColorFG.F2} bg={ColorBG.AA3} />
            <Swatch fg={ColorFG.F3} bg={ColorBG.AA3} />
            <Swatch fg={ColorFG.FA} bg={ColorBG.AA3} />
          </SwatchRow>
          <SwatchRow>
            <Swatch fg={ColorFG.FAI} bg={ColorBG.BA1} />
            <Swatch fg={ColorFG.FAI} bg={ColorBG.BA2} />
            <Swatch fg={ColorFG.FAI} bg={ColorBG.BA3} />
          </SwatchRow>
        </Swatches>
      </DemoWell>
    </Fragment>
  );
};

export default Story;
