

//IMG LOADING/USED PROJECT


const images = document.getElementsByClassName("image");

let globalIndex = 0,
    last = { x: 0, y: 0 };

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = "active";

  last = { x, y };
}

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
}

const handleOnMove = e => {
  if(distanceFromLast(e.clientX, e.clientY) > (window.innerWidth / 20)) {
    const lead = images[globalIndex % images.length],
          tail = images[(globalIndex - 5) % images.length];

    activate(lead, e.clientX, e.clientY);

    if(tail) tail.dataset.status = "inactive";
    
    globalIndex++;
  }
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

// DELAY ELEMENT LOADING

document.addEventListener('DOMContentLoaded', function() {
  const topElements = document.querySelectorAll('.top-element');
  const bottomElements = document.querySelectorAll('.bottom-element');
  const centerElements = document.querySelectorAll('.center-element');

  // Function to add fade-in class to center elements
  function fadeInCenterElements() {
      centerElements.forEach(element => {
          element.classList.remove('fade-out-element');
          element.classList.add('fade-in-element');
      });
  }

  // Function to add fade-out class to center elements
  function fadeOutCenterElements() {
      centerElements.forEach(element => {
          element.classList.remove('fade-in-element');
          element.classList.add('fade-out-element');
      });
  }

  // Initial animation
  setTimeout(() => {
      topElements.forEach(element => {
          element.classList.add('slide-in-top');
      });
  
      bottomElements.forEach(element => {
          element.classList.add('slide-in-bottom');
      });

      fadeInCenterElements(); // Initial fade-in animation for center elements
  }, 500);

  // Function to handle navigation and animation
  function handleNavigation(url) {
      fadeOutCenterElements(); // Fade out the current center elements

      // Slide out top and bottom elements
      topElements.forEach(element => {
          element.classList.add('slide-out-top');
      });

      bottomElements.forEach(element => {
          element.classList.add('slide-out-bottom');
      });

      // Navigate to the new page after animations complete
      setTimeout(() => {
          window.location.href = url;
      }, 1000);
  }

  // Add click event listeners to navigation links
  const navLinks = document.querySelectorAll('.title-button');
  navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();
          const url = link.getAttribute('href');
          handleNavigation(url);
      });
  });
});


// ------

document.addEventListener('DOMContentLoaded', () => {
  const parts = document.querySelectorAll('.part');
  const pauseResumeButton = document.getElementById('pause-resume-button');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  let currentIndex = 0;
  let intervalId;
  let isPaused = false;

  const showPart = (index) => {
    parts.forEach((part, i) => {
      if (i === index) {
        part.classList.add('active');
      } else {
        part.classList.remove('active');
      }
    });
  };

  const startSlideshow = () => {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % parts.length;
      showPart(currentIndex);
    }, 6000); // Change every 10 seconds
  };

  const pauseSlideshow = () => {
    clearInterval(intervalId);
    isPaused = true;
    pauseResumeButton.textContent = 'Resume';
  };

  const resumeSlideshow = () => {
    isPaused = false;
    pauseResumeButton.textContent = 'Pause';
    startSlideshow();
  };

  pauseResumeButton.addEventListener('click', () => {
    if (isPaused) {
      resumeSlideshow();
    } else {
      pauseSlideshow();
    }
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + parts.length) % parts.length;
    showPart(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % parts.length;
    showPart(currentIndex);
  });

  // Start the slideshow initially
  showPart(currentIndex);
  startSlideshow();
});

