type FormTypes = {
  title?: string;
  para?: string;
  children: React.ReactNode;
  classForm?: string;
  loading?: boolean;
};

function Form({ title, children, loading = false }: FormTypes) {
  return (
    <div className="form p-5 lg:bg-widgetBlack-700 lg:p-10 rounded-xl max-w-[600px] min-h-[500px] m-auto w-full flex flex-col lg:shadow-2xl">
      {title && (
        <h1 className="text-4xl lg:text-6xl font-bold my-5">{title}</h1>
      )}
      <div className="flex flex-col flex-grow">{children}</div>
    </div>
  );
}

export default Form;
