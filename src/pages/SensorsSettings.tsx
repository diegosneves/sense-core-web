import { useMemo } from "react";
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
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import AppHeader from "../components/AppHeader";
import {
  useSensors,
  type Sensor,
  type SensorType,
  type SensorLine,
} from "../sensors";

const { Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

type FormValues = {
  name: string;
  type: SensorType;
  line: SensorLine;
};

const typeColor: Record<SensorType, string> = {
  pressao: "geekblue",
  temperatura: "volcano",
  vazao: "green",
  umidade: "cyan",
};

export default function SensorsSettings() {
  const [form] = Form.useForm<FormValues>();
  const { sensors, addSensor, removeSensor } = useSensors();

  const columns: ColumnsType<Sensor> = useMemo(
    () => [
      { title: "Nome do Sensor", dataIndex: "name", key: "name" },
      {
        title: "Tipo",
        dataIndex: "type",
        key: "type",
        render: (t: SensorType) => <Tag color={typeColor[t]}>{t}</Tag>,
      },
      { title: "Linha", dataIndex: "line", key: "line" },
      {
        title: "Ações",
        key: "actions",
        render: (_, record) => (
          <Space>
            <Popconfirm
              title="Excluir sensor"
              description={`Tem certeza que deseja excluir ${record.name}?`}
              okText="Excluir"
              cancelText="Cancelar"
              onConfirm={() => {
                removeSensor(record.id);
                message.success("Sensor excluído");
              }}
            >
              <Button danger>Excluir</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [removeSensor]
  );

  const onAdd = async () => {
    try {
      const values = await form.validateFields();
      addSensor({
        name: values.name.trim(),
        type: values.type,
        line: values.line,
      });
      form.resetFields();
      message.success("Sensor cadastrado com sucesso");
    } catch {
      // Validação falhou; o Form já mostra erros
    }
  };

  return (
    <App>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader title="Sensecore - Configurações" />

        <Content style={{ padding: 24 }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <Title level={3} style={{ margin: "8px 0 16px" }}>
              Configurações de Sensores
            </Title>

            <Card style={{ marginBottom: 24 }}>
              <Form form={form} layout="vertical">
                <Form.Item
                  label="Nome do Sensor"
                  name="name"
                  rules={[
                    { required: true, message: "Informe o nome do sensor" },
                    { min: 2, message: "Mínimo de 2 caracteres" },
                  ]}
                >
                  <Input placeholder="Ex.: Sensor de Pressão (Linha A)" />
                </Form.Item>

                <Form.Item
                  label="Tipo de Sensor"
                  name="type"
                  rules={[{ required: true, message: "Selecione o tipo" }]}
                >
                  <Select placeholder="Selecione o tipo">
                    <Option value="pressao">Pressão</Option>
                    <Option value="temperatura">Temperatura</Option>
                    <Option value="vazao">Vazão</Option>
                    <Option value="umidade">Umidade</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Linha do Sensor"
                  name="line"
                  rules={[{ required: true, message: "Selecione a linha" }]}
                >
                  <Select placeholder="Selecione a linha">
                    <Option value="Linha A">Linha A</Option>
                    <Option value="Linha B">Linha B</Option>
                    <Option value="Linha C">Linha C</Option>
                    <Option value="Linha D">Linha D</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" onClick={onAdd}>
                      Cadastrar
                    </Button>
                    <Button onClick={() => form.resetFields()}>Limpar</Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>

            <Card>
              <Table<Sensor>
                rowKey="id"
                dataSource={sensors}
                columns={columns}
                pagination={{ pageSize: 8 }}
                locale={{ emptyText: "Nenhum sensor cadastrado" }}
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
