import {TopBar} from "@shopify/polaris";
import UserMenuMarkup from "../UserMenuMarkup/UserMenuMarkup";
import {useCallback} from "react";
import './TopBar.css';

const TopBarMarkup = () => {
    const handleNavigationToggle = useCallback(() => {
        console.log('toggle navigation visibility');
    }, []);
    const renderedUserMenuMarkup = <UserMenuMarkup />;
    return (<TopBar
        showNavigationToggle
        userMenu={renderedUserMenuMarkup}
        onNavigationToggle={handleNavigationToggle}
    />)

}

export default TopBarMarkup