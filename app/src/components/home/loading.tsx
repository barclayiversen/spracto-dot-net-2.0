const Loading = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-black">
    {/* Spinner animation */}
    <div
      className="animate-spin inline-block w-2 h-2 rounded-full text-white border-t-white"
      role="status"
    >
      {/* Visually hidden text for accessibility */}
      <span className="visually-hidden">@Spracto</span>
    </div>

    {/* Static text */}
    <div className="mt-20 text-white">Loading...</div>
  </div>
);

export default Loading;
