import { useStore, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type TTokens = {
  access: string | undefined;
  refresh: string | undefined;
};

type TAuthStore = {
  user: TUser | undefined;
  tokens: TTokens | undefined;
};

type AuthStore = TAuthStore & {
  setUserData: (user: TUser | undefined) => void;
  setTokens: (tokens: TTokens | undefined) => void;
  setAccessToken: (access: string | undefined) => void;
  clearAuthData: () => void;
};

const authStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: undefined,
        tokens: undefined,

        setUserData: (user: TUser | undefined) =>
          set({
            user: user,
          }),

        setTokens: (tokens: TTokens | undefined) =>
          set({
            tokens: tokens,
          }),

        setAccessToken: (access: string | undefined) => {
          const prevTokens = get().tokens;
          set({
            tokens: {
              access: access,
              refresh: prevTokens?.refresh,
            },
          });
        },

        clearAuthData: () =>
          set({
            user: undefined,
            tokens: undefined,
          }),
      }),
      {
        name: 'auth',
        onRehydrateStorage: () => {
          // optional
          return (_, error) => {
            if (error) {
              console.error('An error happened during hydration', error);
            }
          };
        },
      }
    )
  )
);

/**
 * Required for zustand stores, as the lib doesn't expose this type
 */
export type ExtractState<S> = S extends { getState: () => infer T } ? T : never;
type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;

// SELECTORS
const accessTokensSelector = (state: ExtractState<typeof authStore>) => state.tokens;
const actionsSelector = (state: ExtractState<typeof authStore>) => {
  const actions = {
    setTokens: state.setTokens,
    setAccessToken: state.setAccessToken,
    setUserData: state.setUserData,
    clearAuthData: state.clearAuthData,
  };
  return actions;
};

// GETTERS
export const getAccessTokens = () => accessTokensSelector(authStore.getState());
export const getAuthActions = () => actionsSelector(authStore.getState());
export const getUserDetails = () => authStore((state) => state.user);

function useAuthStore<U>(selector: Params<U>[1]) {
  return useStore(authStore, selector);
}

export const useAccessToken = () => useAuthStore(accessTokensSelector);
