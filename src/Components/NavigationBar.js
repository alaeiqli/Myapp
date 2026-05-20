import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Link to={""} className="navbar-brand d-flex align-items-center">
                    {/* Insertion de la photo choisie depuis internet */}
                    <img
                        src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=200&auto=format&fit=crop"
                        width="25"
                        height="25"
                        className="d-inline-block align-top me-2 rounded-circle"
                        alt="logo-voiture"
                    />
                    {' '}Gestion Automobile
                </Link>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={"add"} className="nav-link">Ajouter une Voiture</Link>
                        <Link to={"list"} className="nav-link">Liste des Voitures</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}