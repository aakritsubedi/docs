import React from 'react';
import { useHistory } from 'react-router-dom';

import 'assets/css/card.css';

const Card = ({ product }) => {
  const history = useHistory();
  const { title, image, link } = product;

  const navigate = (link) => {
    history.push(link);
  }

  return (
    <div className="box" onClick={() => navigate(link)}>
      <img src={image} alt={title} />
      <div className="details">{title}</div>
    </div>
  );
};

export default Card;
