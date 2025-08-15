import { useAuth } from "../auth";
import {
  App,
  Layout,
  Typography,
  Button,
  Space,
  Dropdown,
  type MenuProps,
  message,
} from "antd";
import {
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  const { user, logout } = useAuth();

  const openUserSettings = () => {
    // navigate("/settings/users");
    message.info("Abrindo configurações de usuários...");
  };

  const openSensorSettings = () => {
    // navigate("/settings/sensors");
    message.info("Abrindo configurações de sensores...");
  };

  const onLogout = async () => {
    await logout();
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "users-settings",
      label: "Configurações de Usuários",
      icon: <TeamOutlined />,
      onClick: openUserSettings,
    },
    {
      key: "sensors-settings",
      label: "Configurações de Sensores",
      icon: <DeploymentUnitOutlined />,
      onClick: openSensorSettings,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Sair",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: onLogout,
    },
  ];

  return (
    <App>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingInline: 16,
          }}
        >
          <Title level={4} style={{ color: "#fff", margin: 0 }}>
            Sensecore - o núcleo dos sensores.
          </Title>

          <Space>
            <Text style={{ color: "#fff" }}>
              {user ? `Olá, ${user.name}` : "Olá!"}
            </Text>

            <Dropdown menu={{ items: menuItems }} trigger={["click"]} arrow>
              <Button type="default" icon={<UserOutlined />}>
                Conta <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        </Header>

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
            <Text>
              Bem-vindo{user ? `, ${user.name}` : ""}! Esta é a sua página
              inicial.
            </Text>

            <div style={{ marginTop: 24 }}>
              <Space wrap>
                <Button type="primary">Ação principal</Button>
                <Button>Outra ação</Button>
              </Space>
            </div>
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} Minha Aplicação
        </Footer>
      </Layout>
    </App>
  );
}
