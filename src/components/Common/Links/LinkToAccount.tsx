import {Link} from "@mui/material";
import React from "react";
import {ellipseString} from "../../../packages/core-sdk/utils";

function LinkToAccount({address, strip = 0}): JSX.Element {
    return <Link href={"/account/" + address}>{strip ? ellipseString(address, strip) : address}</Link>;
}

export default LinkToAccount;