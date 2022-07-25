import './ArcOverview.scss';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {ARC} from "../../../../../packages/arc-portal/classes/ARC";
import MuiMarkdown from 'mui-markdown';

function ArcOverview(): JSX.Element {

    const arc = useSelector((state: RootState) => state.arc);
    const arcInstance = new ARC(arc.information);



    return (<div className={"arc-overview-wrapper"}>
        <div className={"arc-overview-container"}>
            <MuiMarkdown
                options={{
                    overrides: {
                        h1: {
                            component: "h1",
                            props: {
                                style: {
                                    "padding-top": "1em",
                                    "padding-bottom": "1em",
                                    "font-size": "2em",
                                    "borderBottom": "1px solid #f2f2f2",
                                    "margin-top": "24px",
                                    "margin-bottom": "16px",
                                    "font-weight": 600,
                                    "line-height": "1.25em",
                                }
                            },
                        },
                        h2: {
                            component: "h2",
                            props: {
                                style: {
                                    "padding-top": "1em",
                                    "padding-bottom": "1em",
                                    "font-size": "1.5em",
                                    "borderBottom": "1px solid #f2f2f2",
                                    "margin-top": "24px",
                                    "margin-bottom": "16px",
                                    "font-weight": 600,
                                    "line-height": "1.25em",
                                }
                            },
                        },
                        h3: {
                            component: "h3",
                            props: {
                                style: {
                                    "padding-top": "1em",
                                    "padding-bottom": "1em",
                                    "font-size": "1.5em",
                                    "borderBottom": "1px solid #f2f2f2",
                                    "margin-top": "24px",
                                    "margin-bottom": "16px",
                                    "font-weight": 600,
                                    "line-height": "1.25em",
                                }
                            },
                        },
                        h4: {
                            component: "h4",
                            props: {
                                style: {
                                    "padding-top": "1em",
                                    "padding-bottom": "1em",
                                    "font-size": "1.5em",
                                    "borderBottom": "1px solid #f2f2f2",
                                    "margin-top": "24px",
                                    "margin-bottom": "16px",
                                    "font-weight": 600,
                                    "line-height": "1.25em",
                                }
                            },
                        },
                        p: {
                            component: "p",
                            props: {
                                style: {
                                    "margin-bottom": "16px",
                                    "font-size": "16px",
                                    "line-height": "2em",
                                }
                            },
                        },
                        ul: {
                            component: "ul",
                            props: {
                                style: {
                                    "padding-left": "2em",
                                    "margin-top": 0,
                                    "margin-bottom": "16px",
                                    "font-size": "16px",
                                    "line-height": "2em",
                                    "list-style": "disc"
                                }
                            },
                        },
                        strong: {
                            component: "strong",
                            props: {
                                style: {
                                    "font-weight": "600",
                                }
                            },
                        },
                    }
                }}
                >{arcInstance.getMarkdown()}</MuiMarkdown>
        </div>
    </div>);
}

export default ArcOverview;
