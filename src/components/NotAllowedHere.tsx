import * as React from 'react';
import { Card, Row, Col } from 'antd';


export default class NotAllowedHere extends React.Component {

    public render() {
        return (
            <Row>
                <Col span={8} />
                <Col span={8}>
                    <Card>
                        <p>WARNING:</p>
                        <p>You are not allowed here!</p>
                    </Card>
                </Col>
                <Col span={8} />
            </Row>
        )
    }

}