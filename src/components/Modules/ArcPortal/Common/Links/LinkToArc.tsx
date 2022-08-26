import {Link} from "@mui/material";
import React from "react";

function LinkToArc({id, name = ''}): JSX.Element {
    if (!name) {
        name = id;
    }

    return <Link href={"/arc-portal/arc/" + id}>{name}</Link>;
}

export default LinkToArc;