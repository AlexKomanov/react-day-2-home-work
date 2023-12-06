// Watcher.jsx
import React, { useEffect, useState } from 'react';
import watcherService from './watcher.service';
import Modal from 'react-modal';
import WatcherCard from './WatcherCard';
import './Watcher.css';

const Watcher = () => {
  const [watchers, setWatchers] = useState([]);
  const [selectedWatcher, setSelectedWatcher] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMovie, setNewMovie] = useState('');

  const fetchWatchers = async () => {
    const allWatchers = await watcherService.getAllWatchers();
    setWatchers(allWatchers);
  };

  const handleAddWatcher = async () => {
    const newWatcher = await watcherService.addWatcher({
      fullname: prompt('Enter watcher name:'),
      movies: [],
    });
    setWatchers((prevWatchers) => [...prevWatchers, newWatcher]);
  };

  const handleRemoveWatcher = async (watcherId) => {
    await watcherService.removeWatcher(watcherId);
    fetchWatchers();
  };

  const handleSelectWatcher = (watcher) => {
    setSelectedWatcher(watcher);
    setModalIsOpen(true);
  };

  const handleUpdateName = async () => {
    await watcherService.updateWatcherName(selectedWatcher.id, newName);

    // Update the local state of the selected watcher with the new name
    setSelectedWatcher((prevWatcher) => ({
      ...prevWatcher,
      fullname: newName,
    }));

    setNewName('');
    fetchWatchers();
  };

  const handleUpdateMovies = async () => {
    if (newMovie) {
      await watcherService.updateWatcherMovies(selectedWatcher.id, newMovie);

      // Update the local state of the selected watcher with the new movies list
      setSelectedWatcher((prevWatcher) => ({
        ...prevWatcher,
        movies: [...prevWatcher.movies, newMovie],
      }));

      setNewMovie('');
      fetchWatchers();
    }
  };

  const handleRemoveMovie = async (movieToRemove) => {
    await watcherService.removeWatcherMovie(selectedWatcher.id, movieToRemove);

    // Update the local state of the selected watcher with the updated movies list
    setSelectedWatcher((prevWatcher) => ({
      ...prevWatcher,
      movies: prevWatcher.movies.filter((movie) => movie !== movieToRemove),
    }));

    fetchWatchers();
  };

  useEffect(() => {
    fetchWatchers();
  }, []);

  return (
    <div>
      <h1>Watcher App</h1>
      <button onClick={handleAddWatcher}>Add Watcher</button>
      <div className="watchers-container">
        {watchers.map((watcher) => (
          <WatcherCard
            key={watcher.id}
            watcher={watcher}
            onRemove={handleRemoveWatcher}
            onSelect={handleSelectWatcher}
          />
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Watcher Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button className="modal-close" onClick={() => setModalIsOpen(false)}>
          X
        </button>
        <h2>{selectedWatcher?.fullname}'s Movies</h2>
        <ul>
          {selectedWatcher?.movies.map((movie, index) => (
            <li key={index}>
              {movie}
              <button style={{marginLeft : 5}}onClick={() => handleRemoveMovie(movie)}>X</button>
            </li>
          ))}
        </ul>
        <label>
          Update Name:
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </label>
        <button onClick={handleUpdateName}>Update Name</button>
        <label>
          Add Movie:
          <input type="text" value={newMovie} onChange={(e) => setNewMovie(e.target.value)} />
        </label>
        <button onClick={handleUpdateMovies}>Add Movie</button>
      </Modal>
    </div>
  );
};

export default Watcher;
