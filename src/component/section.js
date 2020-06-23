import React from 'react';

const Section = ({id, title, subsection, children}) => {
  const k = [];
  let headingClass = 'h1';
  if (subsection) {
    k.push('subsection');
    headingClass = 'h5';
  }

  let titleElement = false;

  if (title) {
    titleElement = (
      <div className="section-header">
        {React.createElement(headingClass, {}, title)}
      </div>
    );
  }

  return (
    <section id={id} className={k.join(' ')}>
      {titleElement}
      {children}
    </section>
  );
};

export default Section;
