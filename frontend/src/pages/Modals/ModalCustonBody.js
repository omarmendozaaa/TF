import { Col, Form, FormGroup, Input, Label, ModalBody, Row } from "reactstrap";

import React from "react";

function ModalCustomBody({ SetRegistro, registro, canedit, empty }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetRegistro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <ModalBody>
      <Form>
        <FormGroup>
          <Label for="exampleDate">Fecha</Label>
          <Input
            type="text"
            bsSize="sm"
            placeholder="Fecha"
            name="fecha"
            value={registro && registro.fecha}
            disabled={!canedit}
            onChange={handleChange}
          />
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Monóxido de Carbono (CO) </Label>
              <Input
                type="number"
                placeholder="Monóxido de Carbono"
                bsSize="sm"
                name="co"
                value={registro && registro.co}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ácido Sulfírico(H2S) </Label>
              <Input
                type="number"
                placeholder="Ácido Sulfírico"
                bsSize="sm"
                name="h2s"
                value={registro && registro.h2s}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Dióxido de nitrógeno (NO2) </Label>
              <Input
                type="number"
                placeholder="Ácido Sulfírico"
                bsSize="sm"
                name="no2"
                value={registro && registro.no2}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ozono(O3) </Label>
              <Input
                type="number"
                placeholder="Ozono"
                bsSize="sm"
                name="o3"
                value={registro && registro.o3}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Particular Material (PM10)</Label>
              <Input
                type="number"
                placeholder="Particular Material (PM10)"
                bsSize="sm"
                name="pm10"
                value={registro && registro.pm10}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Particular Material (PM25)</Label>
              <Input
                type="number"
                placeholder="Particular Material (PM25)"
                bsSize="sm"
                name="pm25"
                value={registro && registro.pm25}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Dióxido de azufre (SO2) </Label>
              <Input
                type="number"
                placeholder="Dióxido de azufre"
                bsSize="sm"
                name="so2"
                value={registro && registro.so2}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ruido</Label>
              <Input
                type="number"
                placeholder="Ruido"
                bsSize="sm"
                name="ruido"
                value={registro && registro.ruido}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ultra Violeta (UV) </Label>
              <Input
                type="number"
                placeholder="Ultra Violeta"
                bsSize="sm"
                name="uv"
                value={registro && registro.uv}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Humedad</Label>
              <Input
                type="number"
                placeholder="Humedad"
                bsSize="sm"
                name="humedad"
                value={registro && registro.humedad}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Presión</Label>
              <Input
                type="number"
                placeholder="Presion"
                bsSize="sm"
                name="presion"
                value={registro && registro.presion}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Temperatura</Label>
              <Input
                type="number"
                placeholder="Temperatura"
                bsSize="sm"
                name="temperatura"
                value={registro && registro.temperatura}
                disabled={!canedit}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </ModalBody>
  );
}

export default ModalCustomBody;
