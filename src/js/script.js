const workTitleLinks = document.querySelectorAll('.work-title-link');
const workItems = document.querySelectorAll('.work-item');
let activeIndex = null;

workTitleLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      const clickedTitleLinkWrap = link.parentElement.parentElement.parentElement;
      e.preventDefault();
  
      if (activeIndex === index) {
        return;
      }
      
      workItems.forEach((item, itemIndex) => {
        if (item === clickedTitleLinkWrap) {
          item.classList.add('u-pointer');
          gsap.to(item, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to(clickedTitleLinkWrap, {
            opacity: 0, 
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          item.classList.remove('u-pointer');
          gsap.to(item, {
            opacity: 1, 
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to(workTitleLinks[itemIndex].parentElement.parentElement, {
            opacity: 1, 
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
      activeIndex = index;
      console.log(index)
    });
  });