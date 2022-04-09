import './Transactions.scss';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
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
import {loadTransactions} from "../../redux/actions/transactions";
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

function Transactions(): JSX.Element {
    const dispatch = useDispatch();
    const transactions = useSelector((state: RootState) => state.transactions);
    const {list} = transactions;
    console.log(list);

    useEffect(() => {
        dispatch(loadTransactions());
    }, [dispatch]);

    return (<div className={"transactions-wrapper"}>
        <div className={"transactions-container"}>
            {/*<div className="transactions-header">Accounts</div>*/}
            <div className="transactions-body">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Txn ID</StyledTableCell>
                                <StyledTableCell>Block</StyledTableCell>
                                <StyledTableCell>Fee</StyledTableCell>
                                <StyledTableCell>From</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((transaction) => (
                                <StyledTableRow
                                    key={transaction.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        <Link href="/">{ellipseString(transaction.id, 10)}</Link>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {transaction["confirmed-round"]}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <NumberFormat
                                            value={microalgosToAlgos(transaction.fee)}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                        ></NumberFormat>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <Link href="/">{ellipseString(transaction.sender, 10)}</Link>
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

export default Transactions;
