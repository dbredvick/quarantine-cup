import { useQuery, queryCache } from "react-query";
import { apiRequest } from "./util";

import { useState, useEffect } from "react";
import firebase from "./firebase";

const firestore = firebase.firestore();

// Fetch and subscribe to user data
export function useFirebaseGame(gameId) {
  return useCustomQuery(gameId && firestore.collection("games").doc(gameId));
}

// Update an existing user
// export function updateUser(uid, data) {
//   return firestore.collection("users").doc(uid).update(data);
// }

// // Create a new user
// export function createUser(uid, data) {
//   return firestore
//     .collection("users")
//     .doc(uid)
//     .set({ uid, ...data }, { merge: true });
// }

// Custom React hook that subscribes to a Firestore query
function useCustomQuery(query) {
  const [queryState, setQueryState] = useState({
    status: "loading",
    data: undefined,
    error: null,
  });

  // Unique identifier for this query
  const queryPath = query && query.path;

  useEffect(() => {
    // Skip if query is a falsy value, allowing us to wait on
    // needed data before passing query into useQuery.
    if (query) {
      return query.onSnapshot(
        (snapshot) => {
          // Get data for collection or individual doc
          const data = snapshot.docs
            ? snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            : { ...snapshot.data(), id: snapshot.id };

          setQueryState({
            status: "success",
            data: data,
            error: null,
          });
        },
        (error) => {
          console.log(error);
          setQueryState((state) => ({
            data: state.data,
            status: "error",
            error: error,
          }));
        }
      );
    }
    // Disable warning about "query" not being in dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryPath]);

  return queryState;
}

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

// Create a new user
export function createGameMove(uid, gameId, cardData) {
  return apiRequest(`game-create-move?uid=${uid}&gameId=${gameId}`, "POST", {
    uid,
    ...cardData,
  });
}

export function resetGame(uid, gameId) {
  return apiRequest(`game-reset?uid=${uid}&gameId=${gameId}`, "POST", {
    uid,
  });
}

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
  return useQuery(cacheKey, query);
}

// Update an existing game
export function updateGame(gameId, uid, data) {
  // Send API request
  return apiRequest(
    `game-update?gameId=${gameId}&uid=${uid}`,
    "PATCH",
    data
  ).then((game) => {
    const cacheKey = ["game", { gameId, uid }];
    // Update cache (and as a result, any component that has called useUser)
    queryCache.setQueryData(cacheKey, game);
    // Return the updated user
    return game;
  });
}

// Create a new game
export function createGame(uid, data) {
  return apiRequest("game-create", "POST", { uid, ...data });
}
