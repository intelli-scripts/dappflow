import './Accounts.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadAccounts} from "../../redux/actions/accounts";
import {RootState} from "../../redux/store";
import {
    Link, Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {microalgosToAlgos} from "algosdk";
import NumberFormat from 'react-number-format';
import {ellipseString} from "../../packages/explorer-sdk/utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function Accounts(): JSX.Element {
    const dispatch = useDispatch();
    const accounts = useSelector((state: RootState) => state.accounts);
    const {list} = accounts;

    useEffect(() => {
        dispatch(loadAccounts());
    }, [dispatch]);

    return (<div className={"accounts-wrapper"}>
        <div className={"accounts-container"}>
            {/*<div className="accounts-header">Accounts</div>*/}
            <div className="accounts-body">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Address</StyledTableCell>
                                <StyledTableCell>Balance</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell align={"center"}>Assets created</StyledTableCell>
                                <StyledTableCell align={"center"}>Apps created</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((account) => (
                                <StyledTableRow
                                    key={account.address}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        <Link href="/">{ellipseString(account.address, 15)}</Link>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <NumberFormat
                                            value={microalgosToAlgos(account.amount)}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                        ></NumberFormat>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {account.status}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align={"center"}>
                                        {account['total-created-assets']}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align={"center"}>
                                        {account['total-created-apps']}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    </div>);
}

export default Accounts;
