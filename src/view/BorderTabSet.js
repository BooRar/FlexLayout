import React from "react";
import ReactDOM from "react-dom";
import Rect from "../Rect.js";
import Actions from "../model/Actions.js";
import Border from "../model/BorderNode.js";
import BorderButton from "./BorderButton.js";
import DockLocation from "../DockLocation.js";

class BorderTabSet extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const border = this.props.border;
        const style = border.getTabHeaderRect().styleWithPosition({});
        const tabs = [];
        if (border.getLocation() != DockLocation.LEFT) {
            for (let i = 0; i < border.getChildren().length; i++) {
                let isSelected = border.getSelected() === i;
                let child = border.getChildren()[i];
                tabs.push(<BorderButton layout={this.props.layout}
                                        border={border}
                                        node={child}
                                        key={child.getId()}
                                        selected={isSelected}
                                        height={border.getBorderBarSize()}
                                        pos={i}/>);
            }
        }
        else {
            for (let i = border.getChildren().length - 1; i >= 0; i--) {
                let isSelected = border.getSelected() === i;
                let child = border.getChildren()[i];
                tabs.push(<BorderButton layout={this.props.layout}
                                        border={border}
                                        node={child}
                                        key={child.getId()}
                                        selected={isSelected}
                                        height={border.getBorderBarSize()}
                                        pos={i}/>);
            }
        }

        let borderClasses = "flexlayout__border_" + border.getLocation().getName();
        if (this.props.border.getClassNameBorder() != null) {
            borderClasses += " " + this.props.border.getClassNameBorder();
        }

        // allow customization of tabset right/bottom buttons
        let buttons = [];
        const renderState = {buttons: buttons};
        this.props.layout.customizeTabSet(border, renderState);
        buttons = renderState.buttons;

        //buttons.push(<button
        //    key="1"
        //    className={"flexlayout__tab_toolbar_button-min"}></button>);

        const toolbar = <div
            key="toolbar"
            ref="toolbar"
            className={"flexlayout__border_toolbar_" + border.getLocation().getName()}>
            {buttons}
        </div>;

        return <div
            style={style}
            className={borderClasses}>
            <div className={"flexlayout__border_inner_" + border.getLocation().getName()}>
                {tabs}
            </div>
            {toolbar}
        </div>;
    }
}


export default BorderTabSet;

