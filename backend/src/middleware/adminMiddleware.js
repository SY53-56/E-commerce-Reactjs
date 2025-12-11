async function idAdmin(req,res,next){
   try{
      if(!req.user){
        res.status(400).json({message:"anautherized"})
      }
      if(req.user.role !== "admin"){
          res.status(400).json({message:"only admin can add"})
      }
   }catch(e){

   }

}