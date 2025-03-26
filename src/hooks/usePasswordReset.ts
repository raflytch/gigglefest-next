import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import {
  forgotPassword,
  generateOtp,
  verifyOtp,
  resetPassword,
  ForgotPasswordRequest,
  GenerateOtpRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
} from "@/services/authService";
import { setCookie, destroyCookie } from "nookies";
import {
  setLoading,
  setError,
  setSuccess,
  setToken,
  setOtp,
  setEmail,
  resetState,
} from "@/features/auth/passwordResetSlice";
import { toast } from "sonner";

export const usePasswordReset = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token, otp } = useAppSelector((state) => state.passwordReset);

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordRequest) => forgotPassword(data),
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
    },
    onSuccess: async (data, variables) => {
      dispatch(setToken(data.data.token));
      dispatch(setEmail(variables.email));
      setCookie(null, "reset_token", data.data.token, {
        maxAge: 60 * 60,
        path: "/",
      });

      toast.success(data.message || "Reset password code sent to your email");

      try {
        await generateOtp({ token: data.data.token });
        router.push(
          `/otp-verification?email=${encodeURIComponent(variables.email)}`
        );
        dispatch(setSuccess(true));
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Failed to generate OTP";
        dispatch(setError(errorMessage));
        toast.error(errorMessage);
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to reset password";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (data: { otp: string }) => {
      if (!token) throw new Error("No reset token found");
      return verifyOtp({ token, otp: data.otp });
    },
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
    },
    onSuccess: (data, variables) => {
      dispatch(setOtp(variables.otp));
      setCookie(null, "reset_otp", variables.otp, {
        maxAge: 60 * 60,
        path: "/",
      });
      toast.success(data.message || "OTP verified successfully");
      router.push("/new-password");
      dispatch(setSuccess(true));
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to verify OTP";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: { password: string; confirmPassword: string }) => {
      if (!token) throw new Error("No reset token found");
      if (!otp) throw new Error("No OTP found");

      return resetPassword({
        token,
        otp,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
    },
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
    },
    onSuccess: (data) => {
      destroyCookie(null, "reset_token", { path: "/" });
      destroyCookie(null, "reset_otp", { path: "/" });
      dispatch(resetState());

      toast.success(data.message || "Password updated successfully");

      router.push("/login?reset=success");
      dispatch(setSuccess(true));
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update password";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("No reset token found");
      return generateOtp({ token });
    },
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
    },
    onSuccess: (data) => {
      dispatch(setSuccess(true));
      toast.success(data.message || "OTP code resent to your email");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to resend OTP";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });

  return {
    forgotPassword: forgotPasswordMutation.mutate,
    verifyOtp: verifyOtpMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    resendOtp: resendOtpMutation.mutate,
    isLoading:
      forgotPasswordMutation.isPending ||
      verifyOtpMutation.isPending ||
      resetPasswordMutation.isPending ||
      resendOtpMutation.isPending,
  };
};
