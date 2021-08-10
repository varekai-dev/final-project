import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { firstLettersUpperCase } from '../../utils/helpers';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChangePassword from '../../components/ChangePassword';
import s from './SettingsScreen.module.scss';
import UserAccount from '../../components/UserAccount';
import FavoriteBlock from '../../components/FavoriteBlock';
import { useLocation } from 'react-router-dom';

const tabs = ['account', 'history', 'favorites'];

const SettingsScreen = () => {
	const { search } = useLocation();
	const tabFromLink = search.split('tab=')[1];
	const indexTabFromLink = tabs.findIndex((item) => item === tabFromLink);
	const [activeTab, setActiveTab] = React.useState(indexTabFromLink || 0);
	const history = useHistory();
	const user = useSelector((state) => state.user.userData);
	const userExist = localStorage.getItem('user');
	React.useEffect(() => {
		if (!userExist) {
			history.push('/');
		}
	}, [userExist, history]);

	React.useEffect(() => {
		history.push(`?tab=${tabs[activeTab]}`);
	}, [activeTab, history]);
	const changeTab = (tabIndex) => {
		setActiveTab(tabIndex);
	};

	return (
		<>
			{userExist && user && (
				<div className={s.settings}>
					<div className={s.user}>
						<div className={s.userBlock}>{firstLettersUpperCase(user.account.fullName)}</div>
						<div className={s.userName}>{user.account.fullName}</div>
					</div>

					<Tabs selectedIndex={activeTab} onSelect={(tabIndex) => changeTab(tabIndex)} className={s.tabs} selectedTabClassName={s.selectedTab}>
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
							<FavoriteBlock />
						</TabPanel>
					</Tabs>
				</div>
			)}
		</>
	);
};

export default SettingsScreen;
