$(document).foundation()

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  let searchButtonDesktop = document.createElement('button');
  searchButtonDesktop.className = "search-btn";
  navbar.append(searchButtonDesktop);
  
  searchButtonDesktop.addEventListener('click', function() {
    const input = document.querySelector('.coveo-headline-wrapper #standaloneSearchbox .magic-box .magic-box-input > input');
    const mainSection = document.querySelector('.main-section');

    if(input && mainSection && !mainSection.classList.contains('show-search') && !mainSection.classList.contains('hide-search')) {
      mainSection.classList.add('show-search');
      input.focus();
    } else if(input && mainSection && mainSection.classList.contains('show-search')) {
      mainSection.classList.remove('show-search');
      mainSection.classList.add('hide-search');
      input.blur();
    } else if(input && mainSection && mainSection.classList.contains('hide-search')) {
      mainSection.classList.remove('hide-search');
      mainSection.classList.add('show-search');
      input.focus();
    }
  });
  
  const menuBtn = document.querySelector('button.menu-icon');
  let searchButtonMobile = document.createElement('button');
  searchButtonMobile.className = "search-btn search-btn-mobile";
  menuBtn.before(searchButtonMobile);

  searchButtonMobile.addEventListener('click', function() {
    const input = document.querySelector('.coveo-headline-wrapper #standaloneSearchbox .magic-box .magic-box-input > input');
    const mainSection = document.querySelector('.main-section');

    if(input && mainSection && !mainSection.classList.contains('show-search') && !mainSection.classList.contains('hide-search')) {
      mainSection.classList.add('show-search');
      input.focus();
    } else if(input && mainSection && mainSection.classList.contains('show-search')) {
      mainSection.classList.remove('show-search');
      mainSection.classList.add('hide-search');
      input.blur();
    } else if(input && mainSection && mainSection.classList.contains('hide-search')) {
      mainSection.classList.remove('hide-search');
      mainSection.classList.add('show-search');
      input.focus();
    }
  });

  const tiles = document.querySelectorAll('.tiles > div');
  tiles.forEach(function(tile) {
    const link = tile.querySelector('a');
    if(link) {
      tile.addEventListener('click', function(e) {
        link.click();
      });
    }
  });
});
