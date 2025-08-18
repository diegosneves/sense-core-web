import { App, Layout, Typography, Button, Space } from "antd";
import AppHeader from "../components/AppHeader";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Home() {
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

            <div style={{ marginTop: 24 }}>
              <Space wrap>
                <Button type="primary">Ação principal</Button>
                <Button>Outra ação</Button>
              </Space>
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
