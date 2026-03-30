import Image from "next/image";

interface BannerProps {
  imageUrl: string;
  title: string;
}

const Banner = ({ imageUrl, title }: BannerProps) => {
  return (
    <div className="w-full h-64 relative">
      <Image
        src={imageUrl}
        alt={`${title} image`}
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/75" />
      <h1 className="absolute inset-0 flex items-center justify-center text-white text-7xl font-bold z-10 text-center">
        {title}
      </h1>
    </div>
  );
};

export default Banner;
