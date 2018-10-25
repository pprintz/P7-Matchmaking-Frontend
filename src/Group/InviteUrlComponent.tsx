import { Icon, Popover, Button} from 'antd';
import * as React from 'react';

export default class InviteUrlComponent extends React.Component<
    {invite_id : string},
    {clicked : boolean, hovered : boolean}> {

    public state = {
        clicked: false,
        hovered: false,
    };
    
    public render() {
        return (
            <Popover
              style={{ width: 500 }}
              content={this.props.invite_id}
              title="Click to copy invite URL to clipboard"
              trigger="hover"
              visible={this.state.hovered}
              onVisibleChange={this.handleHoverChange}
            >
              <Popover
                content={this.props.invite_id}
                title="Copied to clipboard!"
                trigger="click"
                visible={this.state.clicked}
                onVisibleChange={this.handleClickChange}
              >
                <Button type="primary" onMouseLeave={this.hide} onClick={this.copyToClipboard}>{<Icon type="user-add" style={{ color: 'rgba(255,255,255)' }} />}</Button>
              </Popover>
            </Popover>
          );
    }

    private copyToClipboard = () => {
        const hrefmatch = document.location ? document.location.href.match(/.*\/groups\/[0-9a-zA-Z]*\/?/g) : null ;
        let href : string;
        if(hrefmatch === null){
            href = "";
        } else {
            href = hrefmatch[0].endsWith("/") ? hrefmatch[0] : hrefmatch[0] + "/";
        }
        
        const el = document.createElement('textarea');
        el.value = href + this.props.invite_id;
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

    private handleHoverChange = (visible : boolean) => {
        this.setState({
            hovered: visible,
            clicked: false,
        });
    }

    private handleClickChange = (visible : boolean) => {
        this.setState({
            clicked: visible,
            hovered: false,
        });
    }
}