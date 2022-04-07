import './Accounts.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadAccounts} from "../../redux/actions/accounts";
import {RootState} from "../../redux/store";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {microalgosToAlgos} from "algosdk";

function Accounts(): JSX.Element {
    const dispatch = useDispatch();
    const accounts = useSelector((state: RootState) => state.accounts);
    const {list} = accounts;
    console.log(list);

    useEffect(() => {
        dispatch(loadAccounts());
    }, [dispatch]);

    return (<div className={"accounts-wrapper"}>
        <div className={"accounts-container"}>
            <div className="accounts-header">Accounts</div>
            <div className="accounts-body">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align={"center"}>Assets created</TableCell>
                                <TableCell align={"center"}>Apps created</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((account) => (
                                <TableRow
                                    key={account.address}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {account.address}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {microalgosToAlgos(account.amount)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {account.status}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align={"center"}>
                                        {account['total-created-assets']}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align={"center"}>
                                        {account['total-created-apps']}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    </div>);
}

export default Accounts;
