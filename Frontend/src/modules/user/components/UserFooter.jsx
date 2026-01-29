import React from 'react';
import { Container } from 'react-bootstrap';

const UserFooter = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <Container className="text-center">
                <p className="mb-0">&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default UserFooter;
