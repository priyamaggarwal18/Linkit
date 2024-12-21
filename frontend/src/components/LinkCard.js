import React from 'react';

const LinkCard = ({ link }) => {
  return (
    <div>
      <h3>{link.title}</h3>
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {link.url}
      </a>
    </div>
  );
};

export default LinkCard;
