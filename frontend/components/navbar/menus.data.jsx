import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const menus = [
    {
        name: "Home",
        path: "/",
        icon: <HomeIcon />
    },
    {
        name: "Markets",
        path: "/markets",
        icon: <StorefrontIcon />
    },
    {
        name: "About",
        path: "/about",
        icon: <InfoIcon />
    },
    {
        name: "Contact",
        path: "/contact",
        icon: <ContactMailIcon />
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <AccountCircleIcon />
    },
    {
        name: "Help",
        path: "/help",
        icon: <HelpOutlineIcon />
    }
];

export default menus;
