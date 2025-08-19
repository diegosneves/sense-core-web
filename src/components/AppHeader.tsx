import { useMemo } from "react";
import { useAuth } from "../auth";
import {
  Layout,
  Typography,
  Button,
  Space,
  Dropdown,
  type MenuProps,
} from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title, Text } = Typography;

type AppHeaderProps = {
  title?: string;
};

export default function AppHeader({
  title = "Sensecore - o núcleo dos sensores.",
}: AppHeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const openUserSettings = () => navigate("/settings/users");
  const openSensorSettings = () => {
    navigate("/settings/sensors");
  };
  const onLogout = async () => {
    await logout();
    navigate("/");
  };

  // Função de checagem de permissão
  const canSeeSettings = (role?: string | null) => {
    if (!role) return false;
    return role === "admin" || role === "manager";
  };

  const menuItems: MenuProps["items"] = useMemo(() => {
    const items: MenuProps["items"] = [];

    // Adiciona itens de configurações apenas se permitido
    if (canSeeSettings(user?.role)) {
      items.push(
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
        { type: "divider" } as MenuProps["items"][number]
      );
    }

    // Item de sair sempre visível
    items.push({
      key: "logout",
      label: "Sair",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: onLogout,
    });

    return items;
  }, [user?.role]);

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 16,
      }}
    >
      <Title level={4} style={{ color: "#fff", margin: 0 }}>
        {title}
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
  );
}
