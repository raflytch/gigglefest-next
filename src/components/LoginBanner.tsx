import Image from "next/image";
import AuthBanner from "../../public/auth-banner.webp";

export const LoginBanner = () => {
  return (
    <div className="bg-primary h-full w-full relative">
      <Image
        src={AuthBanner}
        alt="Auth Banner"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};
