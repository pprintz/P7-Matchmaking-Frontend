import * as React from 'react';
import { Card } from 'antd';


export default class NotAllowedHere extends React.Component {

    public render() {
        return (
            <Card>
                <h2>You are not allowed here!</h2>
            </Card>
        )
    }

}