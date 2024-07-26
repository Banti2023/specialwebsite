document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "/images/a.jpg",
    "/images/i.jpg",
    "/images/j.jpg",
    "/images/a.jpg",
    "/images/i.jpg",
    "/images/h.jpg",
    "/images/c.jpg"
    // Add more URLs here
  ];

  const container = document.getElementById("animation-container");

  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    const imgIndex = Math.floor(Math.random() * images.length);
    heart.style.backgroundImage = `url(${images[imgIndex]})`;
    heart.style.rotate = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 10 + 10}s`;
    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10000);
  }

  setInterval(createHeart, 900);

  /*--------------------
  Vars
  --------------------*/
  let progress = 50;
  let startX = 0;
  let active = 0;
  let isDown = false;

  /*--------------------
  Constants
  --------------------*/
  const speedWheel = 0.02;
  const speedDrag = -0.1;

  /*--------------------
  Get Z
  --------------------*/
  const getZindex = (array, index) => (
    array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i))
  );

  /*--------------------
  Items
  --------------------*/
  const $items = document.querySelectorAll('.carousel-item');
  const $cursors = document.querySelectorAll('.cursor');

  const displayItems = (item, index, active) => {
    const zIndex = getZindex([...$items], active)[index];
    item.style.setProperty('--zIndex', zIndex);
    item.style.setProperty('--active', (index - active) / $items.length);
  };

  /*--------------------
  Animate
  --------------------*/
  const animate = () => {
    progress = Math.max(0, Math.min(progress, 100));
    active = Math.floor(progress / 100 * ($items.length - 1));
    $items.forEach((item, index) => displayItems(item, index, active));
  };
  animate();

  /*--------------------
  Click on Items
  --------------------*/
  $items.forEach((item, i) => {
    item.addEventListener('click', () => {
      progress = (i / $items.length) * 100 + 10;
      animate();
    });
  });

  /*--------------------
  Handlers
  --------------------*/
  const handleWheel = e => {
    const wheelProgress = e.deltaY * speedWheel;
    progress = progress + wheelProgress;
    animate();
  };

  const handleMouseMove = (e) => {
    if (e.type === 'mousemove') {
      $cursors.forEach(($cursor) => {
        $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    }
    if (!isDown) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX) * speedDrag;
    progress = progress + mouseProgress;
    startX = x;
    animate();
  };

  const handleMouseDown = e => {
    isDown = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  /*--------------------
  Listeners
  --------------------*/
  document.addEventListener('mousewheel', handleWheel);
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('touchstart', handleMouseDown);
  document.addEventListener('touchmove', handleMouseMove);
  document.addEventListener('touchend', handleMouseUp);

  // Bubble creation logic
  const bubbleContainer = document.querySelector(".bubble-container");
  const numberOfBubbles = 10;
  const bubbleImages = [
    "/images/j.jpg",
    "/images/g.jpg",
    "/images/j.jpg",
    "/images/e.jpg",
    "/images/a.jpg",
    "/images/g.jpg"
    // Add paths to your images
  ];

  for (let i = 0; i < numberOfBubbles; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    const randomImage = bubbleImages[Math.floor(Math.random() * bubbleImages.length)];
    bubble.style.backgroundImage = `url(${randomImage})`;
    bubble.style.width = `${Math.random() * 100 + 50}px`;
    bubble.style.height = bubble.style.width;
    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.animationDelay = `${Math.random() * 20}s`;
    bubbleContainer.appendChild(bubble);
  }
});
