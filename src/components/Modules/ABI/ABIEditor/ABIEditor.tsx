import './ABIEditor.scss';
import React, {} from "react";
import {alpha, styled} from "@mui/material/styles";
import TreeItem, {treeItemClasses} from "@mui/lab/TreeItem";
import {Chip} from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import {
    MinusSquare,
    PlusSquare
} from "../../Explorer/Records/Transaction/Types/AppCallTransaction/Sections/AppCallTxnInnerTxns/AppCallTxnInnerTxns";
import {A_ABI, A_ABI_Arg, A_ABI_Method} from "../../../../packages/core-sdk/types";



function ABIEditor(props): JSX.Element {
    

    let contract: A_ABI = props.contract;

    if (!contract) {
        contract = {methods: [], name: ""};
    }

    console.log(contract);

    function getThemeStyling(theme) {
        return {
            [`& .${treeItemClasses.iconContainer}`]: {
                '& .close': {
                    opacity: 0.3,
                },
            },
            [`& .${treeItemClasses.group}`]: {
                marginLeft: 15,
                paddingLeft: 30,
                borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
            }
        };
    }

    const StyledArgNode = styled((props: any) => {

        const id: string = props.id;
        const arg: A_ABI_Arg = props.arg;


        return <TreeItem {...props} nodeId={id} label={<div className="arg-row">
            <div className="arg-name">
                {arg.name}
            </div>
            <div className="arg-param">
                {arg.type}
            </div>
            <div className="arg-param">
                {arg.desc}
            </div>
        </div>}/>;
    })(({ theme }) => (getThemeStyling(theme)));

    const StyledMethodNode = styled((props: any) => {

        const id: string = props.id;
        const method: A_ABI_Method = props.method;


        return <TreeItem {...props} nodeId={id} label={<div className="method-row">
            <div>
                <Chip color={"primary"} label={method.name} size={"medium"} variant={"outlined"}></Chip>
            </div>
            <div className="desc">
                <span>{method.desc}</span>
            </div>
        </div>}>
            <div className="args-header">Arguments</div>
            {method.args.map((arg, index) => {
                const argId = id + "_arg_" + index;
                return <StyledArgNode id={argId} arg={arg} key={argId}></StyledArgNode>;
            })}
            <div className="returns-header">Returns</div>
            <TreeItem nodeId={id+ "_returns"} label={<div className="returns-row">
                <div className="type">
                    {method.returns.type}
                </div>
                <div className="desc">
                    <span>{method.returns.desc}</span>
                </div>
            </div>}></TreeItem>
        </TreeItem>;
    })(({ theme }) => (getThemeStyling(theme)));


    return (<div className={"abi-editor-wrapper"}>
        <div className={"abi-editor-container"}>

            <div className={"abi-editor-body"}>


                <TreeView
                    defaultExpanded={[]}
                    defaultCollapseIcon={<MinusSquare />}
                    defaultExpandIcon={<PlusSquare />}
                >

                    <TreeItem nodeId="contract" label={<div className="contract-row">
                        <div>
                            {contract.name}
                        </div>
                        <div className="desc">
                            <span>{contract.desc}</span>
                        </div>
                    </div>}>
                        {contract.methods.map((method, index) => {
                            const id = "method_" + index;
                            return <StyledMethodNode id={id} method={method} key={id}></StyledMethodNode>;
                        })}
                    </TreeItem>

                </TreeView>


            </div>

        </div>
    </div>);
}

export default ABIEditor;
