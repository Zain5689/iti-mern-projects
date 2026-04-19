const InputField = ({ label, register, type, name, placeholder, error }) => {
  return (
    <div>
      <label className="block mb-1.5 text-sm font-medium">{label}</label>
      <input
        type={type}
        {...register(name)}
        className={`w-full px-4 py-2.5 bg-[var(--color-surface)] border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all ${
          error
            ? "border-[var(--color-primary)]"
            : "border-[var(--color-border)]"
        }`}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-xs text-[var(--color-primary)] mt-1 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};
export default InputField;
