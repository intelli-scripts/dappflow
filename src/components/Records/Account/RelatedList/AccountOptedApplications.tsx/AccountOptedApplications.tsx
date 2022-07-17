import './AccountOptedApplications.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import ApplicationsList from "../../../../Lists/ApplicationsList/ApplicationsList";

function AccountOptedApplications(): JSX.Element {
    const account = useSelector((state: RootState) => state.account);
    const {optedApplications} = account;

    return (<div className={"account-opted-applications-wrapper"}>
        <div className={"account-opted-applications-container"}>
            <div className="account-opted-applications-body">
                <ApplicationsList applications={optedApplications} fields={['id']}></ApplicationsList>
            </div>
        </div>
    </div>);
}

export default AccountOptedApplications;
