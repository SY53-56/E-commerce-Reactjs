import gsap from "gsap";

export const productPageAnimation = (container) => {
  if (!container) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline();

    tl.from(".product ", {
      opacity: 0,
      y: 100,
      duration: 1,
      ease:"power2.out"
    })
    
      .from(
        ".related-product",
        {
          opacity: 0,
          x: -40,
          duration: 1,
        },
        "-=0.3"
      )
     
      .from(
        ".related-product > div",
        {
          opacity: 0,
          x: -30,
          stagger: 0.15,
          duration: 0.4,
        },
      
      );
  }, container);

  return () => ctx.revert();
};
