import Base from './base';

const Img = (props) => {
  const j = ['rounded'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
  });
  return <Base {...k} />;
};

export default Img;
