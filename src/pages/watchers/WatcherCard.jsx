// WatcherCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './WatcherCard.css';
import defaultImage from './image.webp';

const WatcherCard = ({ watcher, onRemove, onSelect }) => {
  return (
    <div className="card">
      <h2>{watcher.fullname}</h2>
      <img src={defaultImage} alt="Watcher" className="watcher-image" />
      <button onClick={() => onSelect(watcher)}>Select User</button>
      <button onClick={() => onRemove(watcher.id)}>Remove User</button>
      <ul>
        {watcher.movies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

WatcherCard.propTypes = {
  watcher: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default WatcherCard;
