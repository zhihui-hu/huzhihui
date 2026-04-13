'use client';

import * as React from 'react';

export function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = React.useState(defaultValue);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const onChange = () => {
      setMatches(mediaQuery.matches);
    };

    onChange();
    mediaQuery.addEventListener('change', onChange);

    return () => {
      mediaQuery.removeEventListener('change', onChange);
    };
  }, [query]);

  return matches;
}
