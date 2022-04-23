import {Link} from "@mui/material";
import React from "react";

function LinkToBlock({id, name = ''}): JSX.Element {
    if (!name) {
        name = id;
    }

    return <Link href={"/block/" + id}>{name}</Link>;
}

export default LinkToBlock;