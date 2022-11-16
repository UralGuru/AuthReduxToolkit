import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.email}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>AcssessToken: </strong> {currentUser.acssessToken}
            </p>
            <p>
                <strong>Refresh Token: </strong> {currentUser.refreshToken}
            </p>
            <strong>Message: </strong>{currentUser.message}
            <p>
                <strong>{currentUser.isSuccess ? 'Is success' : 'Not success'}</strong>
            </p>
            <p>
                <strong>Errors: </strong>{currentUser.errors}
            </p>
        </div>
    );
};

export default Profile;
