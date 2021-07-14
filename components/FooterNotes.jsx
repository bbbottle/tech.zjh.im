import React from 'react';

const FooterNotes = (props) => {
  return (
    <>
      <hr />
      <small>{props.children}</small>
    </>
  )
}

export default FooterNotes;
