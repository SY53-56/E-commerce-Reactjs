function StateCard({ title, value }) {
  return (
    <div className="bg-white w-40 lg:w-52 rounded-2xl p-3 lg:p-6 shadow">
      <p className="text-gray-500 ">{title}</p>
      <h3 className=" text-2xl lg:text-3xl text-gray-600 font-bold mt-2">{value}</h3>
    </div>
  );
}
export default StateCard