import { useQuery, queryCache } from "react-query";
import { apiRequest } from "./util";

// Fetch and subscribe to user data
export function useUser(uid) {
  // Unique cache key for this query
  const cacheKey = uid && ["users", { uid }];
  // Query to fetch user
  const query = () => apiRequest(`user-get?uid=${uid}`);
  // Fetch data with react-query
  // Docs: https://github.com/tannerlinsley/react-query#queries
  return useQuery(cacheKey, query);
}

// Update an existing user
export function updateUser(uid, data) {
  // Send API request
  return apiRequest(`user-update?uid=${uid}`, "PATCH", data).then(user => {
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
