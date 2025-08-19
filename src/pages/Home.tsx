import React, { useMemo } from "react";
import { App, Layout, Typography, Row, Col } from "antd";
import AppHeader from "../components/AppHeader";
import SensorPressureCard from "../components/SensorPressureCard";
import { useSensors } from "../sensors/useSensors";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

function randomAround(base: number, delta = 0.6) {
  const r = (Math.random() - 0.5) * 2 * delta;
  return Math.max(0, base + r);
}

export default function Home() {
  const { sensors } = useSensors();

  // Filtra apenas sensores de pressão
  const pressureSensors = useMemo(
    () => sensors.filter((s) => s.type === "pressao"),
    [sensors]
  );

  return (
    <App>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />

        <Content style={{ padding: 24 }}>
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              background: "#fff",
              padding: 24,
              borderRadius: 8,
            }}
          >
            <Title level={3} style={{ marginTop: 0 }}>
              Home
            </Title>
            <Text>Bem-vindo! Esta é a sua página inicial.</Text>

            {/* Para cada sensor de pressão, mostramos 3 cards */}
            <div style={{ marginTop: 24 }}>
              <Row gutter={[16, 16]}>
                {pressureSensors.map((sensor) => {
                  // MOCK: gere valores aproximados (substituir por dados reais da API)
                  const base = 12.0;
                  const current = randomAround(base, 0.8);
                  const daily = randomAround(base - 0.4, 0.5);
                  const weekly = randomAround(base - 1.0, 0.4);

                  return (
                    <React.Fragment key={sensor.id}>
                      <Col xs={24} md={8}>
                        <SensorPressureCard
                          name={sensor.name}
                          value={current}
                          unit="bar"
                          kind="current"
                        />
                      </Col>
                      <Col xs={24} md={8}>
                        <SensorPressureCard
                          name={sensor.name}
                          value={daily}
                          unit="bar"
                          kind="daily"
                        />
                      </Col>
                      <Col xs={24} md={8}>
                        <SensorPressureCard
                          name={sensor.name}
                          value={weekly}
                          unit="bar"
                          kind="weekly"
                        />
                      </Col>
                    </React.Fragment>
                  );
                })}
              </Row>
            </div>
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} Sensecore - o núcleo dos sensores.
        </Footer>
      </Layout>
    </App>
  );
}
