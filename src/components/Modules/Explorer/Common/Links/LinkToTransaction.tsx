import {Link} from "@mui/material";
import React from "react";
import {ellipseString} from "../../../../../packages/core-sdk/utils";

function LinkToTransaction({id, strip = 0, sx = {}}): JSX.Element {
    return <Link href={"/explorer/transaction/" + id} sx={sx}>{strip ? ellipseString(id, strip) : id}</Link>;
}

export default LinkToTransaction;