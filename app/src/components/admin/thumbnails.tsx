const Thumbnails = ({ data, onSelectImage }) => {
  return (
    <div
      className="flex overflow-x-auto  mx-auto bg-blue-200"
      style={{ height: "10vh" }}
    >
      {data.map((item: { url: string }, index: number) => (
        <img
          key={index}
          src={item.url}
          alt={`Thumbnail ${index}`}
          className="w-24 h-24 m-2 cursor-pointer object-cover"
          onClick={() => onSelectImage(item.url)}
        />
      ))}
    </div>
  );
};

export default Thumbnails;
