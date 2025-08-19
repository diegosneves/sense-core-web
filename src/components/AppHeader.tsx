import { useMemo, useCallback } from "react";
import { useAuth } from "../auth/useAuth";
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

  const openUserSettings = useCallback(
    () => navigate("/settings/users"),
    [navigate]
  );
  const openSensorSettings = useCallback(
    () => navigate("/settings/sensors"),
    [navigate]
  );
  const onLogout = useCallback(async () => {
    await logout();
    navigate("/");
  }, [logout, navigate]);
  const home = useCallback(() => navigate("/home"), [navigate]);

  const canSeeSettings = (role?: string | null) => {
    if (!role) return false;
    return role === "admin" || role === "manager";
  };

  const menuItems: MenuProps["items"] = useMemo(() => {
    const items: NonNullable<MenuProps["items"]> = [];

    if (canSeeSettings(user?.role)) {
      items.push(
        {
          key: "go-home",
          label: "Home",
          icon: <TeamOutlined />,
          onClick: home,
        },
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
        { type: "divider" } as NonNullable<MenuProps["items"]>[number]
      );
    }

    items.push({
      key: "logout",
      label: "Sair",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: onLogout,
    });

    return items;
  }, [user?.role, home, openUserSettings, openSensorSettings, onLogout]);

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
