import React from "react";

function UserCard(props) {
    return (
        <>
        <div className="userCard">
            <h1 className="userName">{props.user.name}</h1>
            <p className="userEmail">Email: {props.user.email}</p>
            <p className="userDate">Joined: {props.user.createdAt}</p>
        </div>
        </>
    )

}

export default UserCard;
