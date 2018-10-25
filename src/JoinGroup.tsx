import * as React from 'react'

export class JoinGroup extends React.Component {
  public handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e);
  }

  public render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          JOIN GROUP
        </button>
      </div>
    )
  }
}

export default JoinGroup
