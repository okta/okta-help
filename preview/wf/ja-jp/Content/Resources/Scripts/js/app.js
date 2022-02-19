document.addEventListener('DOMContentLoaded', function() {
  /*** Add search-bar visibility functionality ***/
  /** Add .hide-search class if page do not include the search bar **/
  if (!document.querySelector('.coveo-headline-wrapper')) {
    document.querySelector('.main-section').classList.add('hide-search');
  } else {
    const navbar = document.querySelector('.navbar');
    /** create search button **/
    let searchButtonDesktop = document.createElement('button');
    searchButtonDesktop.className = "search-btn";
    navbar.append(searchButtonDesktop);
    
    /** check for a click event on desktop search-button (toggle .hide-search class) **/
    searchButtonDesktop.addEventListener('click', function() {
      const input = document.querySelector('.coveo-headline-wrapper #standaloneSearchbox .magic-box .magic-box-input > input');
      const mainSection = document.querySelector('.main-section');

      if(input && mainSection && mainSection.classList.contains('hide-search')) {
        mainSection.classList.remove('hide-search');
        input.focus();
      } else if(input && mainSection && !mainSection.classList.contains('hide-search')){
        mainSection.classList.add('hide-search');
        input.blur();
      }
    });

    const menuBtn = document.querySelector('button.menu-icon');
    /** create search button **/
    let searchButtonMobile = document.createElement('button');
    searchButtonMobile.className = "search-btn search-btn-mobile";
    menuBtn.before(searchButtonMobile);

    /** check for a click event on mobile search-button (toggle .hide-search class) **/
    searchButtonMobile.addEventListener('click', function() {
      const input = document.querySelector('.coveo-headline-wrapper #standaloneSearchbox .magic-box .magic-box-input > input');
      const mainSection = document.querySelector('.main-section');

      if(input && mainSection && mainSection.classList.contains('hide-search')) {
        mainSection.classList.remove('hide-search');
        input.focus();
      } else if(input && mainSection && !mainSection.classList.contains('hide-search')){
        mainSection.classList.add('hide-search');
        input.blur();
      }
    });
  }

  /*** Makes tiles(cards) fully clickable, even if you don’t change the code(html). ***/
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

$(document).foundation()
