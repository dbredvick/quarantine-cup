import { useQuery, queryCache } from "react-query";
import { apiRequest } from "./util";

// Fetch and subscribe to user data
export function useUser(uid) {
  // Unique cache key for this query
  const cacheKey = uid && ["users", { uid }];
  // Query to fetch user
  const query = () => apiRequest(`user-get?uid=${uid}`);
  // Fetch data with react-query
  return useQuery(cacheKey, query);
}

// Update an existing user
export function updateUser(uid, data) {
  // Send API request
  return apiRequest(`user-update?uid=${uid}`, "PATCH", data).then((user) => {
    const cacheKey = ["users", { uid }];
    // Update cache (and as a result, any component that has called useUser)
    queryCache.setQueryData(cacheKey, user);
    // Return the updated user
    return user;
  });
}

// Create a new user
export function createUser(uid, data) {
  return apiRequest("user-create", "POST", { uid, ...data });
}

// GAME

// Fetch and subscribe to game data
export function useGame(uid) {
  // Unique cache key for this query
  const cacheKey = uid && ["game", { uid }];
  // Query to fetch user
  const query = () => apiRequest(`game-get?uid=${uid}`);
  // Fetch data with react-query
  return useQuery(cacheKey, query);
}

export function useSingleGame(uid, gameId) {
  // Unique cache key for this query
  const cacheKey = ["game", { gameId, uid }];
  // Query to fetch user
  const query = () => apiRequest(`game-get?uid=${uid}&gameId=${gameId}`);
  // Fetch data with react-query
  return useQuery(cacheKey, query, {
    // Refetch the data every second
    refetchInterval: 10000,
  });
}

// Update an existing game
export function updateGame(gameId, uid, data) {
  // Send API request
  return apiRequest(
    `game-update?gameId=${gameId}&uid=${uid}`,
    "PATCH",
    data
  ).then((user) => {
    const cacheKey = ["game", { gameId, uid }];
    // Update cache (and as a result, any component that has called useUser)
    queryCache.setQueryData(cacheKey, user);
    // Return the updated user
    return user;
  });
}

// Create a new game
export function createGame(uid, data) {
  return apiRequest("game-create", "POST", { uid, ...data });
}
