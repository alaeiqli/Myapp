import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class MyToast extends Component {
    render() {
        const toastCss = {
            position: 'fixed',
            top: '80px', // Descendu à 80px pour ne pas être caché derrière votre barre de navigation
            right: '20px',
            zIndex: '9999', // Augmenté pour passer au-dessus de TOUS les autres éléments
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            minWidth: '250px'
        };

        return (
            <div style={this.props.children.show ? toastCss : { display: 'none' }}>
                <Toast 
                    className={`text-white ${this.props.children.type === "success" ? "bg-success border-success" : "bg-danger border-danger"}`} 
                    show={this.props.children.show}
                >
                    <Toast.Header className="bg-dark text-white border-secondary" closeButton={false}>
                        {/* me-auto est la syntaxe correcte pour l'alignement dans les versions récentes */}
                        <strong className="me-auto">Notification</strong>
                        <small>À l'instant</small>
                    </Toast.Header>
                    {/* p-3 ajoute de l'espace interne (padding) pour que le texte soit bien visible */}
                    <Toast.Body className="p-3 fw-bold">
                        {this.props.children.message}
                    </Toast.Body>
                </Toast>
            </div>
        );
    }
}