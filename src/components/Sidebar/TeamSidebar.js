import React from 'react';
import './TeamSidebar.css';

const TeamSidebar = () => {
    const members = ['Jiena Wu', 'Ruimeng Zhang']; // Static list for now

    return (
        <div className="sidebar">
            <h3>Team Members</h3>
            <ul>
                {members.map((member, index) => (
                    <li key={index}>{member}</li>
                ))}
            </ul>
            <button className="invite-button">+ Invite</button>
        </div>
    );
};

export default TeamSidebar;
