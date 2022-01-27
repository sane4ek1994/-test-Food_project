function rotatePepper() {

    const pepper = document.querySelector('.pepper');

    pepper.animate([
        // keyframes
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(360deg)' }
      ], {
        // timing options
        duration: 3000,
        iterations: Infinity
      });
}

export default rotatePepper;