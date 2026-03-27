import Image from "next/image";

type MediaCardProps = {
  picture: string;
  title: string;
};

const MediaCard = ({ picture, title }: MediaCardProps) => {
  return (
    <div className="relative w-40 aspect-2/3 overflow-hidden rounded-lg transform transition-transform duration-200 hover:-translate-y-1">
      <Image
        src={picture}
        alt={title}
        fill
        sizes="(max-width: 640px) 50vw, 200px"
        className="object-cover"
        loading="eager"
      />
    </div>
  );
};

export default MediaCard;
