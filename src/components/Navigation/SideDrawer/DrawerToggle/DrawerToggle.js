import React from 'react';

// import Logo from '../../../Logo/Logo';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div 
        className={classes.Logo}
        onClick={props.menuToogled}>
        Menu
    </div>
);

export default drawerToggle;
