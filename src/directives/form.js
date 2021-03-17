export default {
  mounted: (el) => {
    function headAnim() {
      [...el.elements]
        .filter((ell) => ell.type !== "submit")
        .forEach((elem) => elem.classList.add("inputAnim"));
    }

    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          headAnim();
          observer.unobserve(el);
        }
      });
    }

    function createIntersectObserver() {
      const options = {
        root: null,
        threshold: 0,
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(el);
    }

    if (window["IntersectionObserver"]) {
      createIntersectObserver();
    } else {
      console.log(window["IntersectionObserver"]);
    }
  },
};
