import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/features/hooks";
import { clearAuthError } from "@/features/auth/authSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const GlobalAlert = () => {
  const error = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(clearAuthError());
    }, 300);
  };

  if (!error) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-xl text-center">Error</DialogTitle>
          <DialogDescription className="text-center max-w-xs mx-auto">
            {error}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-center">
          <Button onClick={handleClose}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
