interface AuthUser {
  name: string | null;
  photo: string | null;
  token: string | null;
  uid: string | null;
}

export const useCheckAuth = (): AuthUser | null => {
  if (!import.meta.client) return null;

  const raw = localStorage.getItem("user");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};
