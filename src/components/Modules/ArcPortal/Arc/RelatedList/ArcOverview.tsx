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
                    forceBlock: true,
                    overrides: {
                        h1: {
                            component: "h1",
                            props: {
                                style: {
                                    "padding-top": "0.5em",
                                    "padding-bottom": "0.5em",
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
                                    "padding-top": "0.5em",
                                    "padding-bottom": "0.5em",
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
                                    "padding-top": "0.5em",
                                    "padding-bottom": "0.5em",
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
                                    "padding-top": "0.5em",
                                    "padding-bottom": "0.5em",
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
                                    "line-height": "1.5em",
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
                        ol: {
                            component: "ol",
                            props: {
                                style: {
                                    "padding-left": "2em",
                                    "margin-top": 0,
                                    "margin-bottom": "16px",
                                    "font-size": "16px",
                                    "line-height": "2em",
                                    "list-style": "decimal"
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
                        div: {
                            props: {
                                className: 'MuiPaper-root',
                                style: {
                                    "background": "#f6f6f6",
                                    "border-radius": "0px",
                                    "margin-top": "1em",
                                    "margin-bottom": "1em",
                                    "border-color": "rebeccapurple"
                                }
                            }
                        }
                    }
                }}
                >{arcInstance.getMarkdown()}</MuiMarkdown>
        </div>
    </div>);
}

export default ArcOverview;
