import './ArcHome.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {Box, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ARC} from "../../../../packages/arc-portal/classes/ARC";


function ArcHome(): JSX.Element {

    const navigate = useNavigate();
    const arcs = useSelector((state: RootState) => state.arcs);

    const {list} = arcs;



    return (<div className={"arc-home-wrapper"}>
        <div className={"arc-home-container"}>

            <Grid container spacing={2}>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className="arc-list">
                        {list.map((arc) => {
                            const arcInstance = new ARC(arc);
                            return <Box className="arc" sx={{color: 'primary.main'}} key={arcInstance.getId()} onClick={(ev) => {
                                navigate('/arc-portal/arc/' + arcInstance.getId());
                            }}>
                                {arcInstance.getName()}
                            </Box>;
                        })}
                    </div>
                </Grid>

                {/*<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>*/}
                {/*    <div className="arc-intro">*/}
                {/*        <Alert*/}
                {/*            sx={{fontSize: '15px'}}*/}
                {/*            color={"warning"}*/}
                {/*            icon={false}>*/}

                {/*            <br/>*/}
                {/*            <div className="question">What is ARC ?</div>*/}
                {/*            <br/>*/}
                {/*            <div className="answer">*/}
                {/*                ARC stands for Algorand Request for Comments*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                <div>*/}
                {/*                    An ARC is a design document providing information to the Algorand community or describing a new feature for Algorand or its processes or environment. The ARC should provide a concise technical specification and a rationale for the feature. The ARC author is responsible for building consensus within the community and documenting dissenting opinions.*/}
                {/*                </div>*/}
                {/*                <br/>*/}
                {/*                <div>*/}
                {/*                    We intend ARCs to be the primary mechanisms for proposing new features and collecting community technical input on an issue. We maintain ARCs as text files in a versioned repository. Their revision history is the historical record of the feature proposal.*/}
                {/*                </div>*/}
                {/*                <br/>*/}
                {/*                <div>*/}
                {/*                    You can read more about ARC on*/}
                {/*                    <Button*/}
                {/*                        style={{marginTop: '-3px'}}*/}
                {/*                        onClick={() => {*/}
                {/*                            window.open('/arc-portal/arc/0', "");*/}
                {/*                        }*/}
                {/*                        }*/}
                {/*                    >ARC0000</Button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </Alert>*/}
                {/*    </div>*/}
                {/*</Grid>*/}
            </Grid>





        </div>
    </div>);
}

export default ArcHome;
