import React from 'react';

// import Logo from '../../../Logo/Logo';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.menuToogled}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;
