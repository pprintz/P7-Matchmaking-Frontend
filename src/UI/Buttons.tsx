import styled from 'styled-components';
// styling for buttons
export const Button = styled.button`
    background-color: white;
    border-style: hidden;
    margin: 5px;
    padding: .25em;
    box-shadow: 0 5px 10px rgba(0,0,0, .25);
`

export const LeaveBtn = styled(Button)`
    position: fixed;
    bottom: 20px;
    right: 20px;
    font-size: 20px;
    font-weight: bold;
`