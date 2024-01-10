import {useRouter} from 'next/router';
import {useCallback} from 'react';

/**
 * useRemoveQueryParameters
 *
 * This hook provides a function that removes specified query parameters from the URL.
 */
export const useRemoveQueryParameters = () => {
  const router = useRouter();

  /**
   * removeQueryParameters
   *
   * This function removes specified query parameters and updates the URL.
   *
   * @param {string[]} keysToRemove - An array of query parameter keys to be removed from the URL.
   */
  const removeQueryParameters = useCallback(
    (keysToRemove: string[]) => {
      const currentQuery = {...router.query};

      // Remove each key specified in `keysToRemove` from the current query object.
      keysToRemove.forEach((key) => {
        delete currentQuery[key];
      });

      // Update the URL without causing a page remount.
      router.replace(
        {
          pathname: router.pathname,
          query: currentQuery,
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router]
  );

  return {
    removeQueryParameters,
  };
};
