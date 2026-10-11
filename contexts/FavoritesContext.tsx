"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";

type Action =
  | { type: "SET"; payload: number[] }
  | { type: "ADD"; payload: number }
  | { type: "REMOVE"; payload: number };

function favoritesReducer(state: number[], action: Action): number[] {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return state.includes(action.payload) ? state : [...state, action.payload];
    case "REMOVE":
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
}

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);
  const { user } = useAuth();
  const router = useRouter();

  // Load favorites when user changes
  useEffect(() => {
    if (user) {
      supabase
        .from("favorites")
        .select("product_id")
        .then(({ data, error }) => {
          if (!error && data) {
            const ids = data.map((row: { product_id: number }) => row.product_id);
            dispatch({ type: "SET", payload: ids });
          }
        });
    } else {
      dispatch({ type: "SET", payload: [] });
    }
  }, [user]);

  const isFavorite = useCallback(
    (id: number) => {
      return favorites.includes(id);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (id: number) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const favorited = favorites.includes(id);

      if (favorited) {
        // Optimistic remove
        dispatch({ type: "REMOVE", payload: id });
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", id);

        if (error) {
          // Rollback
          dispatch({ type: "ADD", payload: id });
        }
      } else {
        // Optimistic add
        dispatch({ type: "ADD", payload: id });
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, product_id: id });

        if (error) {
          // Rollback
          dispatch({ type: "REMOVE", payload: id });
        }
      }
    },
    [user, favorites, router]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
