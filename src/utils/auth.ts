import { DISABLE_AUTH } from "@/config/constants";
export const getTestUser = () => {
  if (DISABLE_AUTH) {
    return {
      id: "test-user",
      name: "Test User",
      email: "test@example.com",
    };
  }
  return null;
};
