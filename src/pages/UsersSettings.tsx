import { useMemo, useState } from "react";
import {
  App,
  Layout,
  Typography,
  Card,
  Form,
  Input,
  Button,
  Select,
  Space,
  Table,
  Popconfirm,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import AppHeader from "../components/AppHeader";

const { Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

// Tipo do usuário
type Role = "admin" | "manager" | "operator" | "viewer";
type UserRow = {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  username: string;
};

export default function UsersSettings() {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<UserRow[]>([
    // opcional: inicializar mocks lista preenchida
    // { key: "u1", id: "u1", name: "...", email: "...", phone: "...", role: "admin", username: "..." },
  ]);

  const columns: ColumnsType<UserRow> = useMemo(
    () => [
      { title: "Nome", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Telefone", dataIndex: "phone", key: "phone" },
      { title: "Cargo", dataIndex: "role", key: "role" },
      { title: "Usuário", dataIndex: "username", key: "username" },
      {
        title: "Ações",
        key: "actions",
        render: (_, record) => (
          <Space>
            {/* Espaço reservado para futura edição */}
            <Popconfirm
              title="Excluir usuário"
              description={`Tem certeza que deseja excluir ${record.name}?`}
              okText="Excluir"
              cancelText="Cancelar"
              onConfirm={() => removeUser(record.key)}
            >
              <Button danger>Excluir</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );

  const addUser = async () => {
    try {
      const values = await form.validateFields();
      const newUser: UserRow = {
        key: crypto.randomUUID(),
        id: crypto.randomUUID(),
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        role: values.role,
        username: values.username.trim(),
      };
      setUsers((prev) => [newUser, ...prev]);
      form.resetFields();
      message.success("Usuário adicionado com sucesso");
    } catch {
      // validação falhou; mensagens já são exibidas pelo Form
    }
  };

  const removeUser = (key: string) => {
    setUsers((prev) => prev.filter((u) => u.key !== key));
    message.success("Usuário excluído");
  };

  return (
    <App>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader title="Sensecore - Configurações" />

        <Content style={{ padding: 24 }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <Title level={3} style={{ margin: "8px 0 16px" }}>
              Configurações de Usuários
            </Title>

            <Card style={{ marginBottom: 24 }}>
              <Form form={form} layout="vertical">
                <Form.Item
                  label="Nome"
                  name="name"
                  rules={[
                    { required: true, message: "Informe o nome" },
                    { min: 2, message: "Mínimo de 2 caracteres" },
                  ]}
                >
                  <Input placeholder="Nome completo" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Informe o e-mail" },
                    { type: "email", message: "E-mail inválido" },
                  ]}
                >
                  <Input placeholder="nome.sobrenome@empresa.com" />
                </Form.Item>

                <Form.Item
                  label="Telefone"
                  name="phone"
                  rules={[
                    { required: true, message: "Informe o telefone" },
                    {
                      pattern: /^[+()0-9\s-]{6,}$/,
                      message:
                        "Informe um telefone válido (aceita +, (), -, espaço)",
                    },
                  ]}
                >
                  <Input placeholder="+55 (11) 99999-9999" />
                </Form.Item>

                <Form.Item
                  label="Cargo (Role)"
                  name="role"
                  rules={[{ required: true, message: "Selecione o cargo" }]}
                >
                  <Select placeholder="Selecione o cargo">
                    <Option value="admin">Administrador</Option>
                    <Option value="manager">Gestor</Option>
                    <Option value="operator">Operador</Option>
                    <Option value="viewer">Visualizador</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Usuário (username)"
                  name="username"
                  rules={[
                    { required: true, message: "Informe o username" },
                    { min: 3, message: "Mínimo de 3 caracteres" },
                  ]}
                >
                  <Input placeholder="ex.: ana.costa" />
                </Form.Item>

                {/* Opcional: campo de senha inicial (somente para mock/seed) */}
                {/* <Form.Item
                  label="Senha (opcional)"
                  name="password"
                  rules={[{ min: 6, message: "Mínimo de 6 caracteres" }]}
                >
                  <Input.Password placeholder="Defina uma senha inicial" />
                </Form.Item> */}

                <Form.Item>
                  <Space>
                    <Button type="primary" onClick={addUser}>
                      Adicionar
                    </Button>
                    <Button onClick={() => form.resetFields()}>Limpar</Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>

            <Card>
              <Table<UserRow>
                rowKey="key"
                dataSource={users}
                columns={columns}
                pagination={{ pageSize: 8 }}
                locale={{ emptyText: "Nenhum usuário cadastrado" }}
              />
            </Card>
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} Sensecore - o núcleo dos sensores.
        </Footer>
      </Layout>
    </App>
  );
}
