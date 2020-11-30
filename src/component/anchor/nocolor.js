import Base from './base';

const Anchor = (props) => {
  const j = ['no-color'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
  });
  return <Base {...k} />;
};

export default Anchor;
