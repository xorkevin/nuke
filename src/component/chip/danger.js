import Base from './base';

const Chip = (props) => {
  const j = ['danger'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
  });
  return <Base {...k} />;
};

export default Chip;
