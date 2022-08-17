import {IconButton, Link, Tooltip} from "@mui/material";
import React from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';

function LinkToGroup({id, blockId, icon = false}): JSX.Element {

    return <Link href={"/explorer/group/" + encodeURIComponent(id) + '/' + blockId}>{icon ? <Tooltip title="This is one of the group transaction. Click to view all the groups transactions.">
        <IconButton size={"small"}>
            <AttachFileIcon style={{fontSize: 16, color: '#000'}}></AttachFileIcon>
        </IconButton>
    </Tooltip> : id}</Link>;
}

export default LinkToGroup;