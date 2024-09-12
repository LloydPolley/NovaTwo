"use client";

function Input({ classNames, placeholder, id, onInputFunc, register }) {
  return (
    <input
      className={classNames}
      id={id}
      required
      placeholder={placeholder}
      {...register}
      onInput={onInputFunc}
    />
  );
}

export default Input;
