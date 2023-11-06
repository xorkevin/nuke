import {useId, type FC, type PropsWithChildren} from 'react';
import {Container, ContainerSize} from '@xorkevin/nuke/component/container';
import {
  ColorBG,
  ColorBGClasses,
  ColorClasses,
  ColorFG,
  ColorFGClasses,
  TextClasses,
} from '@xorkevin/nuke/component/text';
import {classNames} from '@xorkevin/nuke/computil';

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {children}
    </div>
  );
};

type SwatchesProps = {
  dark?: boolean;
};
const Swatches: FC<PropsWithChildren<SwatchesProps>> = ({dark, children}) => {
  return (
    <div
      className={classNames({
        dark: dark ?? false,
        [ColorClasses.B2]: true,
      })}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '16px',
        borderRadius: '8px',
        marginTop: '8px',
      }}
    >
      {children}
    </div>
  );
};

const Home: FC = () => {
  return (
    <Container size={ContainerSize.S4} padded>
      <Container padded>
        <hgroup>
          <h1
            className={TextClasses.Display}
            style={{'--nuke-text-display-size': '5rem'}}
          >
            Nuke
          </h1>
          <p className={TextClasses.Subtitle}>a reactive frontend toolkit</p>
        </hgroup>
      </Container>
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
      <Swatches dark>
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
    </Container>
  );
};

export default Home;
