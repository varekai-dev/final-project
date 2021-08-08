import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { firstLettersUpperCase } from "../../utils/helpers";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ChangePassword from "../../components/ChangePassword";
import s from "./SettingsScreen.module.scss";
import UserAccount from "../../components/UserAccount";

const SettingsScreen = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.userData);
  console.log(user);
  React.useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);
  return (
    <>
      {user && (
        <div className={s.settings}>
          <div className={s.user}>
            <div className={s.userBlock}>
              {firstLettersUpperCase(user.account.fullName)}
            </div>
            <div className={s.userName}>{user.account.fullName}</div>
          </div>

          <Tabs className={s.tabs} selectedTabClassName={s.selectedTab}>
            <TabList className={s.tabList}>
              <Tab className={s.tab}>Edit Account</Tab>
              <Tab className={s.tab}>Orders History</Tab>
              <Tab className={s.tab}>Favourites</Tab>
            </TabList>
            <TabPanel className={s.tabPanel}>
              <UserAccount />
              <ChangePassword />
            </TabPanel>
            <TabPanel className={s.tabPanel}>
              <h2>Orders History</h2>
            </TabPanel>
            <TabPanel className={s.tabPanel}>
              <h2>Favourites</h2>
            </TabPanel>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default SettingsScreen;
