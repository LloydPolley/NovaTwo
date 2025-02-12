import classNames from "classnames/bind";

const Wrapper = ({ children }) => {
  return (
    <>
      <div className="flex flex-col flex-1 min-h-dvh bg-widgetBlack-500 rounded-lg">
        {children}
        <div className="p-5 text-center text-sm h-32 flex flex-col justify-end">
          <p className="text-center">Nova 2</p>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
