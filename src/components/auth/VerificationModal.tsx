"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useRegister";
import { useAppSelector } from "@/features/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ErrorModal } from "./ErrorModal";

export const VerificationModal = () => {
  const router = useRouter();
  const {
    resendVerificationMutation,
    clearRegistration,
    verificationErrorMessage,
    isVerificationErrorModalOpen,
    closeVerificationErrorModal,
  } = useRegister();

  const registrationEmail = useAppSelector(
    (state) => state.auth.registrationEmail
  );

  const [resendCooldown, setResendCooldown] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (resendVerificationMutation.isSuccess) {
      setResendCooldown(60);
    }
  }, [resendVerificationMutation.isSuccess]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendCooldown]);

  const handleResendVerification = () => {
    if (registrationEmail && resendCooldown === 0) {
      resendVerificationMutation.mutate(registrationEmail);
    }
  };

  const handleOk = () => {
    clearRegistration();
    setOpen(false);
    router.push("/login");
  };

  if (!registrationEmail) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              {resendVerificationMutation.isSuccess ? (
                <CheckCircle className="h-6 w-6 text-primary" />
              ) : (
                <AlertCircle className="h-6 w-6 text-primary" />
              )}
            </div>
            <DialogTitle className="text-xl text-center">
              Email Verification Required
            </DialogTitle>
            <DialogDescription className="text-center max-w-xs mx-auto">
              {resendVerificationMutation.isSuccess
                ? "Verification email has been resent successfully."
                : `A verification link has been sent to ${registrationEmail}. Please check your inbox and click the link to verify your account.`}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              className="sm:flex-1"
              onClick={handleResendVerification}
              disabled={
                resendCooldown > 0 || resendVerificationMutation.isPending
              }
            >
              {resendVerificationMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-1">Sending...</span>
                </>
              ) : resendCooldown > 0 ? (
                `Resend in ${resendCooldown}s`
              ) : (
                "Resend Verification"
              )}
            </Button>

            <Button className="sm:flex-1" onClick={handleOk}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isVerificationErrorModalOpen && (
        <ErrorModal
          message={
            verificationErrorMessage || "Failed to resend verification email"
          }
          open={isVerificationErrorModalOpen}
          onClose={closeVerificationErrorModal}
        />
      )}
    </>
  );
};
