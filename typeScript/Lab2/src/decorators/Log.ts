export function Timestamp(constructor: Function) {
  const now = new Date();
  console.log(
    `Class ${constructor.name} was created at ${now.toLocaleString()}`,
  );
}
