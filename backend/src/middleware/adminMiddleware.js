async function isAdmin(req,res,next){
   try{
      if(!req.user){
      return  res.status(400).json({message:"anautherized"})
      }
      if(req.user.role !== "admin"){
        return res.status(403).json({message:"only admin can add"})
      }
      next()
   }catch(e){
 res.status(400).json({message:e})
   }

}
module.exports = isAdmin