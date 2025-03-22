const Wrapper = ({ children }) => {
  return (
    <>
      <div className="flex flex-col flex-1 min-h-dvh lg:min-h-0 lg:h-[calc(100vh-20px)] bg-widgetBlack-500 rounded-lg overflow-scroll">
        {children}
        <div className="p-5 text-center text-sm h-32 flex flex-col justify-end">
          <p className="text-center">Nova 2</p>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
