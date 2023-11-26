/* eslint-disable react/prop-types */
export default function AboutCard({ title, children }) {
  return (
    // <div className="w-[30%]">
    <div className="w-1/2">
      <h1 className="text-xl font-bold">{title}</h1>
      <p>{children}</p>
    </div>
  );
}
