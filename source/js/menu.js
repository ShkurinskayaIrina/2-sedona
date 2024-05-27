const navSiteMenu = document.querySelector('.page-header__nav');
const menuToggler = navSiteMenu.querySelector('.page-header__toggler');

navSiteMenu.classList.remove('page-header__nav--nojs');

export const handleClickMenuToggler = () => {
  navSiteMenu.classList.toggle('page-header__nav--close');
  navSiteMenu.classList.toggle('page-header__nav--open');
};

if (window.matchMedia('(max-width: 767px)').matches) {
  menuToggler.addEventListener('click', handleClickMenuToggler);
}

window.addEventListener('resize', () => {
  if (window.matchMedia('(max-width: 767px)').matches) {
    menuToggler.addEventListener('click', handleClickMenuToggler);
  } else {
    menuToggler.removeEventListener('click', handleClickMenuToggler);
  }
});
