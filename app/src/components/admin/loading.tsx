const Loading = () => (
  <div className="absolute top-0 right-0 bottom-0 left-0 bg-black animate-fade-in-.5 flex justify-center items-center">
    <div
      className="animate-spin inline-block w-2 h-2 rounded-full text-white border-t-white"
      role="status"
    >
      {/* Visually hidden text for accessibility */}
      <span className="visually-hidden">@Spracto</span>
    </div>
    <p className="text-4xl text-white">Loading...</p>
  </div>
);

export default Loading;
