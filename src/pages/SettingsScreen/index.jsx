import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useLocation } from "react-router-dom";

import { firstLettersUpperCase } from "../../utils/helpers";
import UserAccount from "../../components/UserAccount";
import FavoriteBlock from "../../components/FavoriteBlock";
import OrderHistory from "../../components/OrderHistory";

import s from "./SettingsScreen.module.scss";

const tabs = ["account", "history", "favorites"];

const SettingsScreen = () => {
  const { search } = useLocation();
  const tabFromLink = search.split("tab=")[1];
  const indexTabFromLink = tabs.findIndex((item) => item === tabFromLink);
  const [activeTab, setActiveTab] = React.useState(
    indexTabFromLink !== -1 ? indexTabFromLink : 0
  );
  const history = useHistory();
  const user = useSelector((state) => state.user.userData);
  const isAuthenticated = localStorage.getItem("user");

  React.useEffect(() => {
    if (isAuthenticated) {
      history.push(`?tab=${tabs[activeTab]}`);
    }
  }, [activeTab, history, isAuthenticated]);
  const changeTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className={s.settings}>
      <div className={s.user}>
        <div className={s.userBlock}>
          {firstLettersUpperCase(user?.account?.fullName)}
        </div>
        <div className={s.userName}>{user?.account?.fullName}</div>
      </div>

      <Tabs
        selectedIndex={activeTab}
        onSelect={(tabIndex) => changeTab(tabIndex)}
        className={s.tabs}
        selectedTabClassName={s.selectedTab}
      >
        <TabList className={s.tabList}>
          <Tab className={s.tab}>Edit Account</Tab>
          <Tab className={s.tab}>Orders History</Tab>
          <Tab className={s.tab}>Favourites</Tab>
        </TabList>
        <TabPanel className={s.tabPanel}>
          <UserAccount />
        </TabPanel>
        <TabPanel className={s.tabPanel}>
          <OrderHistory />
        </TabPanel>
        <TabPanel className={s.tabPanel}>
          <FavoriteBlock />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default SettingsScreen;
