import { Icon, Popover, Button} from 'antd';
import * as React from 'react';

export default class InviteUrlComponent extends React.Component<
    {invite_id : string},
    {clicked : boolean, hovered : boolean}>{
    public state = {
        clicked: false,
        hovered: false,
    };
    public render(){
        return (
            <Popover
              style={{ width: 500 }}
              content={this.props.invite_id}
              title="Invite URL"
              trigger="hover"
              visible={this.state.hovered}
              onVisibleChange={this.handleHoverChange}
            >
              <Popover
                content={(
                  <div>
                    <p>{this.props.invite_id}</p>
                    <p>Copied to clipboard!</p>
                  </div>
                )}
                title="Invite URL"
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
        const el = document.createElement('textarea');
        el.value = this.props.invite_id;
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