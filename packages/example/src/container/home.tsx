import {
  type ChangeEventHandler,
  type FC,
  type PropsWithChildren,
  useCallback,
  useId,
} from 'react';
import {
  Box,
  BoxClasses,
  BoxSize,
  Flex,
  FlexAlignItems,
  FlexDir,
  FlexJustifyContent,
  FlexWrap,
} from '@xorkevin/nuke/component/box';
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

type SwatchProps = {
  fg: ColorFG;
  bg: ColorBG;
};
const Swatch: FC<SwatchProps> = ({fg, bg}) => {
  const captionId = useId();
  const c = classNames([ColorFGClasses[fg], ColorBGClasses[bg]]);
  return (
    <div
      className={ColorClasses.B1}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '8px',
        margin: '8px',
        borderRadius: '8px',
      }}
      role="figure"
      aria-labelledby={captionId}
    >
      <div
        className={c}
        style={{
          width: '96px',
          height: '96px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: '8px',
        }}
      >
        <div className={TextClasses.TitleLarge}>Aa</div>
      </div>
      <code id={captionId} style={{marginTop: '8px'}}>{`${fg}, ${bg}`}</code>
    </div>
  );
};

const SwatchRow: FC<PropsWithChildren> = ({children}) => {
  return (
    <Flex justifyContent={FlexJustifyContent.Center} wrap={FlexWrap.Wrap}>
      {children}
    </Flex>
  );
};

const Swatches: FC<PropsWithChildren> = ({children}) => {
  return (
    <Flex
      className={classNames(
        ColorClasses.B2,
        BoxClasses.PadSmall,
        BoxClasses.BorderRound,
      )}
      alignItems={FlexAlignItems.Center}
      dir={FlexDir.Col}
    >
      {children}
    </Flex>
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
  return (
    <Box size={BoxSize.S4} padded>
      <Box padded>
        <hgroup>
          <h1 className={TextClasses.Display} style={{fontSize: '5rem'}}>
            Nuke
          </h1>
          <p className={TextClasses.Subtitle}>a reactive frontend toolkit</p>
        </hgroup>
      </Box>
      <Box padded>
        <select value={colorScheme} onChange={onModeChange}>
          <option value={ColorScheme.System}>System</option>
          <option value={ColorScheme.Light}>Light</option>
          <option value={ColorScheme.Dark}>Dark</option>
        </select>
        <code>{isDark ? 'dark' : 'light'}</code>
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
