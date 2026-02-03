function MenuItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 w-full rounded-lg hover:bg-slate-800 cursor-pointer transition">
      {icon}
      <span>{label}</span>
    </div>
  );
}

export default MenuItem