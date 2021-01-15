import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CssBaseline from '@material-ui/core/CssBaseline';
import Slide from '@material-ui/core/Slide';


function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const headersData = [
    {
        label: "List Property",
        href: "/add_property",
    },
    {
        label: "List Preference",
        href: "/add_request",
    },
    {
        label: "Search",
        href: "/aqivah_search",
    },
    {
        label: "About",
        href: "/aqivah_info",
    },
];

const useStyles = makeStyles((theme) => ({
    header: {
        //backgroundColor: "transparent",
        backgroundColor: 'hsl(0,0%,0%, 0.6)',
        paddingRight: "5px",
        paddingLeft: "5px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    // toolbar: {
    //   display: "flex",
    //   justifyContent: "space-between",
    //   background:'transparent',
    // },
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'white',
        color: 'white',
        zIndex: 400
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
        backgroundColor: 'white',
        color: 'white',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    drawerContainer: {
        padding: "20px 30px",
    },
}));

const Header = (props) => {
    const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();
    const classes = useStyles();

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    const { mobileView, drawerOpen } = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    const displayDesktop = () => {
        return (
            <>
                    <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                        <a href={'/'}>
                        <img alt={'logo'} style={{height:'50px', width:'auto'}} src={"https://www.vineyardvines.com/on/demandware.static/-/Sites-Vineyard-Vines-Library/default/dw9f11cce3/images/logos/logo@2.6x.png"} />
                        </a>
                        {sections.map((section) => (
                            <Link
                                //color="primary"
                                noWrap
                                key={section.title}
                                variant="body2"
                                href={section.url}
                                className={classes.toolbarLink}
                                style={{color:'#002b5c', textTransform:'uppercase'}}
                            >
                                {section.title}
                            </Link>
                        ))}
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </Toolbar>
            </>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar>
                <IconButton
                    {...{
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>

                <div>
                    <a href={'/'}>
                    <img alt={'logo'} style={{height:'50px', width:'auto'}} src={"https://www.vineyardvines.com/on/demandware.static/-/Sites-Vineyard-Vines-Library/default/dw9f11cce3/images/logos/logo@2.6x.png"} />
                    </a>
                </div>
            </Toolbar>
        );
    };

    const getDrawerChoices = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Link
                    {...{
                        component: RouterLink,
                        to: href,
                        color: "inherit",
                        style: { textDecoration: "none" },
                        key: label,
                    }}
                >
                    <MenuItem>{label}</MenuItem>
                </Link>
            );
        });
    };

    const femmecubatorLogo = (
        <Typography variant="h6" component="h1" className={logo}>
            Femmecubator
        </Typography>
    );

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: RouterLink,
                        className: menuButton,
                    }}
                >
                    {label}
                </Button>
            );
        });
    };

    return (
        <header>
            <AppBar className={header}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
    );
}

export default Header

const sections = [
    { title: 'New', url: '/#' },
    { title: 'Men', url: '/#' },
    { title: 'Women', url: '/#' },
    { title: 'Boys', url: '/#' },
    { title: 'Girls', url: '/#' },
    { title: 'More Sizes', url: '/#' },
    { title: 'Ties', url: '/#' },
    { title: 'Cart', url: '/cart' },

];
