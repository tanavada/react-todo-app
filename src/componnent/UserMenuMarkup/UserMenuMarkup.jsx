import {TopBar} from "@shopify/polaris";
import {ArrowLeftMinor} from "@shopify/polaris-icons";
import {useCallback, useState} from "react";
import './UserMenu.css'

const UserMenuMarkup = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const toggleIsUserMenuOpen = useCallback(
        () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
        [],
    );
    return (
        <TopBar.UserMenu
            actions={[
                {
                    items: [{content: 'Log out', icon: ArrowLeftMinor}],
                },
            ]}
            name="Xquenda Andreev"
            initials="XA"
            open={isUserMenuOpen}
            onToggle={toggleIsUserMenuOpen}
        />

    )
};
export default UserMenuMarkup