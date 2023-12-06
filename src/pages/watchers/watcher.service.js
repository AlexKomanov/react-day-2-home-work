// watcher.service.js
import AsyncStorageService from '../../services/async-storage.service';

const watcherService = {
  getAllWatchers: async () => {
    return await AsyncStorageService.getAll();
  },

  addWatcher: async (newWatcher) => {
    const updatedWatcher = { ...newWatcher, id: `w${Date.now()}` };
    await AsyncStorageService.addItem(updatedWatcher);
    return updatedWatcher;
  },

  removeWatcher: async (watcherId) => {
    await AsyncStorageService.removeItem(watcherId);
  },

  updateWatcherMovies: async (watcherId, newMovie) => {
    const watchers = await AsyncStorageService.getAll();
    const updatedWatchers = watchers.map((watcher) => {
      if (watcher.id === watcherId) {
        return { ...watcher, movies: [...watcher.movies, newMovie] };
      }
      return watcher;
    });

    await AsyncStorageService.setAll(updatedWatchers);
  },

  removeWatcherMovie: async (watcherId, movieToRemove) => {
    const watchers = await AsyncStorageService.getAll();
    const updatedWatchers = watchers.map((watcher) => {
      if (watcher.id === watcherId) {
        return { ...watcher, movies: watcher.movies.filter(movie => movie !== movieToRemove) };
      }
      return watcher;
    });

    await AsyncStorageService.setAll(updatedWatchers);
  },

  updateWatcherName: async (watcherId, newName) => {
    await AsyncStorageService.updateItem(watcherId, { fullname: newName });
  },
};

export default watcherService;
