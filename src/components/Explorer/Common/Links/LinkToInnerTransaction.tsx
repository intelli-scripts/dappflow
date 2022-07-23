import {Link} from "@mui/material";
import React from "react";

function LinkToInnerTransaction({id, index, name}): JSX.Element {
    return <Link href={"/explorer/transaction/" + id + "/inner-txn/" + index}>{name}</Link>;
}

export default LinkToInnerTransaction;