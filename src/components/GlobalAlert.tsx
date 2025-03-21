import { Alert, AlertDescription } from "@/components/ui/alert";
import { XCircle } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/features/hooks";
import { clearAuthError } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";

export const GlobalAlert = () => {
  const error = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          dispatch(clearAuthError());
        }, 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (!error) return null;

  return (
    <div className="fixed inset-x-0 top-6 flex justify-center items-center z-50 px-4">
      <div
        className={`w-full max-w-sm transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <Alert
          variant="destructive"
          className="shadow-lg border border-destructive/20 backdrop-blur-sm bg-destructive/5 relative overflow-hidden py-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-destructive/5 opacity-50"></div>
          <div className="relative flex items-center gap-2.5">
            <div className="bg-destructive/20 p-1.5 rounded-full flex-shrink-0">
              <XCircle className="h-4 w-4 text-destructive" />
            </div>
            <div className="flex-1 min-w-100">
              <AlertDescription className="text-sm font-medium text-destructive truncate">
                {error}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      </div>
    </div>
  );
};
