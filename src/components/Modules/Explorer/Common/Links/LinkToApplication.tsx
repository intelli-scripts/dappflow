import {Link} from "@mui/material";
import React from "react";

function LinkToApplication({id, name = ''}): JSX.Element {
    if (!name) {
        name = id;
    }
    return <Link href={"/explorer/application/" + id}>{name}</Link>;
}

export default LinkToApplication;