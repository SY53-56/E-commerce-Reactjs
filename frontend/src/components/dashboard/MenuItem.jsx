import {Link} from "react-router-dom"
function MenuItem({ icon, label, to }) {
  return (
   
    <Link to={to} className="flex items-center gap-3 px-6 py-3 w-full rounded-lg hover:bg-slate-800 cursor-pointer transition" >
      {icon}
      <span>{label}</span>
    </Link>
  
  );
}

export default MenuItem