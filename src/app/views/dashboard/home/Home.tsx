import { Col, Row } from "react-bootstrap"
import storeItems from "../../../data/items.json"
import { StoreItem } from "../../auth/components/StoreItem"


export function Home(){
    return (
    <>
        <h1> ¡Bienvenido, Cliente!</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
            {storeItems.map(item => (
                <Col key={item.id}>
                    <StoreItem {...item} />
                </Col>
            ))}
            
        </Row>
    </>
    )


}