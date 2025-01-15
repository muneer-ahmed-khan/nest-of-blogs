type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
  [key: string]: any; // For any additional fields
};

export const useCheckAuth = (): User | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user) as User;
  }

  return null;
};
