import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import shoppingCart from '../../../assets/img/shoppingCart.svg';

export function Navbar() {
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to="/dashboard/home" as={NavLink}>
                        Inicio
                    </Nav.Link>
                    <Nav.Link to="/store" as={NavLink}>
                        Servicio
                    </Nav.Link>
                    <Nav.Link to="/profile" as={NavLink}>
                        Perfil
                    </Nav.Link>
                    <Nav.Link to="/report" as={NavLink}>
                        Reportes
                    </Nav.Link>
                    <Nav.Link to="/reservation" as={NavLink}>
                        Reservas para los clientes
                    </Nav.Link>
                </Nav>
                <NavLink to="/auth/login">
                    <Button
                        style={{ width: "3rem", height: "3rem", position: "relative" }}
                        variant="outline-primary"
                        className="rounded-circle"
                    >
                        <img
                            className="img-fluid"
                            src={shoppingCart}
                            alt="Cerrar Sesión"
                            title="Cerrar Sesión"
                        />
                        <div
                            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                            style={{
                                color: "white",
                                width: "1.5rem",
                                height: "1.5rem",
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                transform: "translate(25%, 25%)",
                            }}
                        >
                        </div>
                    </Button>
                </NavLink>
            </Container>
        </NavbarBs>
    );
}
