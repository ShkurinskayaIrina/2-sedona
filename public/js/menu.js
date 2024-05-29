import { isEscEvent } from './util.min.js';

const navSiteMenu = document.querySelector('.page-header__nav');
const menuToggler = navSiteMenu.querySelector('.page-header__toggler');

navSiteMenu.classList.remove('page-header__nav--nojs');

const toggleClasses = () => {
  navSiteMenu.classList.toggle('page-header__nav--open');
  navSiteMenu.classList.toggle('page-header__nav--close');
};

const closeMenu = () => {
  toggleClasses();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onMenuEscKeydown);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', onPageCloseMenu);
};

const onMenuEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMenu();
  }
};

const onPageCloseMenu = (evt) => {
  if (navSiteMenu.classList.contains('page-header__nav--open') && evt.target !== menuToggler) {
    closeMenu();
  }
};

const openMenu = () => {
  toggleClasses();
  document.addEventListener('keydown', onMenuEscKeydown);
  document.addEventListener('click', onPageCloseMenu);
};

const handleClickMenuToggler = () => {
  // eslint-disable-next-line no-unused-expressions
  navSiteMenu.classList.contains('page-header__nav--close') ? openMenu() : closeMenu();
};

if (window.matchMedia('(max-width: 767px)').matches) {
  menuToggler.addEventListener('click', handleClickMenuToggler);
}

window.addEventListener('resize', () => {
  // eslint-disable-next-line no-unused-expressions
  window.matchMedia('(max-width: 767px)').matches ? menuToggler.addEventListener('click', handleClickMenuToggler) : menuToggler.removeEventListener('click', handleClickMenuToggler);
});
