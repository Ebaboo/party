import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import logoImg from '../../../assests/logo.png';

const Toolbar = (props) => {
  let toolbarClasses = [classes.Toolbar, classes[props.drawerStatus]];
  return (
    <div className={[toolbarClasses.join(" ")]}>
      <DrawerToggle clicked={props.drawerToggleClick} />
      <img src={logoImg} alt="logo" />
    </div>
  )
}

export default Toolbar
