import * as React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default class CreateOrFindGroup extends React.Component {
  public render() {
    return (
      <div>
        <Button size="large">
          <Link to="/groups">Find group</Link>
        </Button>
        <Button size="large">
          <Link to="/create">Create group</Link>
        </Button>
      </div>
    );
  }
}
