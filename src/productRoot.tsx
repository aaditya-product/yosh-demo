import { createContext, useContext, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Each product is mounted under its own base path, '/genie' or '/luna'.
// Screens navigate by product-relative path and this resolves it for the mount.
const RootContext = createContext('/');

export function ProductRoot({ root, children }: { root: string; children: ReactNode }) {
  return <RootContext.Provider value={root}>{children}</RootContext.Provider>;
}

export function useProductPath() {
  const root = useContext(RootContext);
  return (path: string) => `${root === '/' ? '' : root}/${path.replace(/^\//, '')}`;
}

export function useGo() {
  const navigate = useNavigate();
  const resolve = useProductPath();
  return (path: string) => navigate(resolve(path));
}
