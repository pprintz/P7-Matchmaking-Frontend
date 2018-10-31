// The tests are correct. But we need to extract all API calls out of our components so we can test them in isolation.
// Comment the tests back in when we have refactored

// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import App from '../App';
// import JoinGroup from '../components/JoinGroup';
// import CreateGroupForm from '../components/CreateGroupForm';
// import GroupList from '../components/GroupList';
// import GroupPageContainer from '../components/GroupPageContainer';
// import GroupCardComponent from '../components/GroupCardComponent';
// import InviteUrlComponent from '../components/InviteUrlComponent';
// import LeaveGroup from '../components/LeaveGroup';
// import MenuBar from '../components/MenuBar';

// it('Test renders without crashing', () => {
//     const div = document.createElement('div');
//     const Test = () => <div>Sofa</div>
//     ReactDOM.render(<Test />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });

// it('App renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

// it('CreateGroupForm renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<CreateGroupForm />, div);
// });

// it('GroupList renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<GroupList />, div);
// });

// it('GroupPageContainer renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<GroupPageContainer />, div);
// // });

// it('JoinGroup renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<JoinGroup />, div);
// });

// it('GroupCardComponent renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<GroupCardComponent />, div);
// });

// it('GroupsPageContainer renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<GroupsPageContainer />, div);
// });

// it('InviteUrlComponent renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<InviteUrlComponent />, div);
// });

// it('LeaveGroup renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<LeaveGroup />, div);
// });

// it('MenuBar renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<MenuBar />, div);
// });