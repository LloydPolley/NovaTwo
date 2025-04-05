const Header = ({ title }) => {
  return (
    <div className="px-5 pt-5 lg:pt-10">
      <h1 className="text-4xl lg:text-6xl font-black">{title}</h1>
    </div>
  );
};

export default Header;
