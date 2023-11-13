import {
  type ChangeEventHandler,
  type FC,
  type PropsWithChildren,
  useCallback,
  useId,
} from 'react';
import {Box, BoxClasses, BoxSize} from '@xorkevin/nuke/component/box';
import {
  ColorBG,
  ColorBGClasses,
  ColorClasses,
  ColorFG,
  ColorFGClasses,
  ColorScheme,
  TextClasses,
  useDarkMode,
} from '@xorkevin/nuke/component/text';
import {classNames, strToEnum} from '@xorkevin/nuke/computil';

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
  const {isDark, colorScheme, setMode} = useDarkMode();
  const onModeChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      setMode(strToEnum(ColorScheme, e.target.value) ?? ColorScheme.System);
    },
    [setMode],
  );
  const darkModeSelectorId = useId();
  return (
    <Box size={BoxSize.S4} padded>
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
      <Box padded>
        <form>
          <label htmlFor={darkModeSelectorId}>dark mode</label>
          <select
            id={darkModeSelectorId}
            name="scheme"
            value={colorScheme}
            onChange={onModeChange}
          >
            <option value={ColorScheme.System}>System</option>
            <option value={ColorScheme.Light}>Light</option>
            <option value={ColorScheme.Dark}>Dark</option>
          </select>
          <output name="isDark" htmlFor={darkModeSelectorId}>
            {isDark ? 'dark' : 'light'}
          </output>
        </form>
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
          <Swatch fg={ColorFG.FI} bg={ColorBG.BI} />
          <Swatch fg={ColorFG.FA} bg={ColorBG.BI} />
        </SwatchRow>
      </Swatches>
    </Box>
  );
};

export default Home;
