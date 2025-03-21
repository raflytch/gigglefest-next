import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useAppDispatch } from "@/features/hooks";
import { setCredentials, clearAuthError } from "@/features/auth/authSlice";
import { LoginRequest } from "@/types/auth";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          token: data.data.token,
          user: data.data.user,
        })
      );
      router.push("/");
    },
    onMutate: () => {
      dispatch(clearAuthError());
    },
  });
};
