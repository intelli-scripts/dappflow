import {Link} from "@mui/material";
import React from "react";

function LinkToAsset({id, name = ''}): JSX.Element {
    if (!name) {
        name = id;
    }

    return <Link href={"/explorer/asset/" + id}>{name}</Link>;
}

export default LinkToAsset;