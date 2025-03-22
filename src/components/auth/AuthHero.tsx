import Image from "next/image";
import RegisterBanner from "../../../public/auth-banner.webp";

export const AuthHero = () => {
  return (
    <div className="w-full md:w-1/2 hidden md:block bg-black relative overflow-hidden">
      <Image
        src={RegisterBanner}
        alt="Register Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-8">
        <h1 className="text-4xl font-bold text-white mb-2">GiggleFest</h1>
        <p className="text-white/90 text-lg">
          Your gateway to unforgettable festival experiences!
        </p>
      </div>
    </div>
  );
};
