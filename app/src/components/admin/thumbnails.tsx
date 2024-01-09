const Thumbnails = ({ data, onSelectImage }) => {
  return (
    <div
      className="flex overflow-x-auto mt-2 mx-auto"
      style={{ height: "10vh" }}
    >
      {data.map((item: { url: string }, index: number) => (
        <img
          key={index}
          src={item.url}
          alt={`Thumbnail ${index}`}
          className="w-24 h-24 mr-2 cursor-pointer object-cover"
          onClick={() => onSelectImage(item.url)}
        />
      ))}
    </div>
  );
};

export default Thumbnails;
