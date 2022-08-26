import './Arc16Alert.scss';
import React from "react";
import {A_Arc16_Metadata} from "../../../../../../../../packages/arc-portal/types";
import {ARC16} from "../../../../../../../../packages/arc-portal/classes/ARC16/ARC16";
import {Alert} from "@mui/lab";
import LinkToArc from "../../../../../Common/Links/LinkToArc";



function Arc16Alert(props): JSX.Element {

   const metadata: A_Arc16_Metadata = props.metadata;

    return (<div className={"arc16-alert-wrapper"}>
        <div className={"arc16-alert-container"}>

            {new ARC16(metadata as A_Arc16_Metadata).hasTraits() ? <Alert color={"success"}>
                Traits are defined as per <LinkToArc id={16} name="ARC16"></LinkToArc>
            </Alert> : <Alert color={"warning"} sx={{marginTop: '10px'}} icon={false}>
                Traits are not defined as per <LinkToArc id={16} name="ARC16"></LinkToArc>
            </Alert>}


        </div>
    </div>);
}

export default Arc16Alert;
