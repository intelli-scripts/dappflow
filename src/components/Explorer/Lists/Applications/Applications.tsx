import './Applications.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {loadApplications} from "../../../../redux/actions/applications";
import ApplicationsList from "../ApplicationsList/ApplicationsList";


function Applications(): JSX.Element {
    const dispatch = useDispatch();
    const applications = useSelector((state: RootState) => state.applications);
    const {list} = applications;


    useEffect(() => {
        dispatch(loadApplications());
    }, [dispatch]);

    function reachedLastPage() {
        dispatch(loadApplications());
    }

    return (<div className={"applications-wrapper"}>
        <div className={"applications-container"}>
            <div className="applications-body">
                <ApplicationsList applications={list} loading={applications.loading} reachedLastPage={reachedLastPage}></ApplicationsList>
            </div>
        </div>
    </div>);
}

export default Applications;
