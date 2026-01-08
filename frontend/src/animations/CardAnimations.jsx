import gsap from "gsap"

export const CardAnimations = (container)=>{
  if (!container) return
 
  const ctx= gsap.context(()=>{

    gsap.from(".card",{
        opacity:0,
        x:-100,
        duration:2
    })

  })
  return () => ctx.revert();
}