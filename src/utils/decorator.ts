import Vue from 'vue';

/**
 * 
 * @export
 * @param {number} [delay=500] 
 * @returns {Function} 
 */
export function debounce(delay: number = 500): Function {
  return (target: Vue, name: string, descriptor: any) => {
    let fn = descriptor.value;
    let timer: any;
    descriptor.value = function(...args: any[]) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  };
}
