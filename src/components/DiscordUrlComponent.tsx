import { Icon, Popover, Button } from 'antd';
import * as React from 'react';

interface State {
    clicked: boolean,
    hovered: boolean
}

export default class DiscordUrlComponent extends React.Component<any, State> {

    private discordURL : string;

    constructor(props) {
        super(props);

        this.discordURL = "https://discord.gg/E56b3fk";
    }

    public state = {
        clicked: false,
        hovered: false,
    };

    public render() {
        return (
            <Popover
                style={{ width: 500 }}
                content={this.discordURL}
                title="Click to copy Discord Server URL to clipboard"
                trigger="hover"
                visible={this.state.hovered}
                onVisibleChange={this.handleHoverChange}
            >
                <Popover
                    content={this.discordURL}
                    title="Copied to clipboard!"
                    trigger="click"
                    visible={this.state.clicked}
                    onVisibleChange={this.handleClickChange}
                >
                    <Button style={{ marginLeft: "5px" }} type="primary" onMouseLeave={this.hide} onClick={this.copyToClipboard}><p>Press to copy Discord link <Icon type="message" style={{ color: 'rgba(255,255,255)' }} /> </p></Button>
                </Popover>
            </Popover>
        );
    }

    private copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = this.discordURL;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    private hide = () => {
        this.setState({
            clicked: false,
            hovered: false,
        });
    }

    private handleHoverChange = (visible: boolean) => {
        this.setState({
            hovered: visible,
            clicked: false,
        });
    }

    private handleClickChange = (visible: boolean) => {
        this.setState({
            clicked: visible,
            hovered: false,
        });
    }
}
