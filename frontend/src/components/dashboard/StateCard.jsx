function StateCard({ title, value }) {
  return (
    <div className="bg-white w-52 rounded-2xl p-6 shadow">
      <p className="text-gray-500 ">{title}</p>
      <h3 className="text-3xl text-gray-600 font-bold mt-2">{value}</h3>
    </div>
  );
}
export default StateCard