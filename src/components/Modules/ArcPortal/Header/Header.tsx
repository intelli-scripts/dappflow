import './Header.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {ARC} from "../../../../packages/arc-portal/classes/ARC";


function Header(): JSX.Element {

    const navigate = useNavigate();
    const arcs = useSelector((state: RootState) => state.arcs);

    const {list} = arcs;
    const params = useParams();
    const {id} = params;

    return (<div className={"arc-header-wrapper"}>
        <div className={"arc-header-container"}>

            <div>
                <FormControl style={{width: 400}}>
                    <InputLabel id="arcs">Select ARC</InputLabel>
                    <Select
                        fullWidth
                        labelId="arcs"
                        id="arc"
                        value={id}
                        label="Select ARC"
                        sx={{
                            fieldset: {
                                borderRadius: "10px"
                            }
                        }}
                        onChange={(ev) => {
                            navigate('/arc-portal/arc/' + ev.target.value);
                        }}>

                        {list.map((arc) => {
                            const arcInstance = new ARC(arc);
                            return <MenuItem value={arcInstance.getId()} key={arcInstance.getId()}>{arcInstance.getName()}</MenuItem>;
                        })}

                    </Select>
                </FormControl>
            </div>



        </div>
    </div>);
}

export default Header;
