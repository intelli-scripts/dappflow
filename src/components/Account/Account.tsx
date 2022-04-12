import './Account.scss';
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadAccount} from "../../redux/actions/account";
import {RootState} from "../../redux/store";


function Account(): JSX.Element {
    const dispatch = useDispatch();
    const params = useParams();
    const {address} = params;

    const account = useSelector((state: RootState) => state.account);
    console.log(account);

    useEffect(() => {
        dispatch(loadAccount(address));
    }, [dispatch, address]);

    return (<div className={"account-wrapper"}>
        <div className={"account-container"}>
            <div className="account-body">
                Account
            </div>
        </div>
    </div>);
}

export default Account;
