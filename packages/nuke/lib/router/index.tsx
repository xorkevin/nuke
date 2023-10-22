import {
  JSX,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

const RouterContext = createContext<{
  url: URL;
  navigate: (url: string) => void;
}>({
  url: new URL(window.location.href),
  navigate: () => {},
});

export type Props = {
  children: ReactNode;
};

export const Router = ({children}: Props): JSX.Element => {
  const [url, setURL] = useState(new URL(window.location.href));

  const navigate = useCallback(
    (url: string) => {
      const u = new URL(url, window.location.href);
      window.history.pushState({}, '', u);
      setURL(u);
    },
    [setURL],
  );

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      'popstate',
      () => {
        setURL(new URL(window.location.href));
      },
      {signal: controller.signal},
    );
    return () => {
      controller.abort();
    };
  }, [setURL]);

  const value = useMemo(() => {
    return {
      url,
      navigate,
    };
  }, [url, navigate]);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};
