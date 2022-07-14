import './Assets.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import AssetsList from "../AssetsList/AssetsList";
import {loadAssets} from "../../../redux/actions/assets";


function Assets(): JSX.Element {
    const dispatch = useDispatch();
    const assets = useSelector((state: RootState) => state.assets);
    const {list} = assets;


    useEffect(() => {
        dispatch(loadAssets());
    }, [dispatch]);

    function reachedLastPage() {
        dispatch(loadAssets());
    }

    return (<div className={"assets-wrapper"}>
        <div className={"assets-container"}>
            <div className="assets-body">
                <AssetsList assets={list} loading={assets.loading} reachedLastPage={reachedLastPage}></AssetsList>
            </div>
        </div>
    </div>);
}

export default Assets;
