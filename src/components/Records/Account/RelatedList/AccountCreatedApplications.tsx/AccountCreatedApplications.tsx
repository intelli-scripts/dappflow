import './AccountCreatedApplications.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import ApplicationsList from "../../../../Lists/ApplicationsList/ApplicationsList";

function AccountCreatedApplications(): JSX.Element {
    const account = useSelector((state: RootState) => state.account);
    const {createdApplications} = account;

    return (<div className={"account-created-applications-wrapper"}>
        <div className={"account-created-applications-container"}>
            <div className="account-created-applications-body">
                <ApplicationsList applications={createdApplications}></ApplicationsList>
            </div>
        </div>
    </div>);
}

export default AccountCreatedApplications;
