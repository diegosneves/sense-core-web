import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Form, Input, Button, Typography, Alert } from "antd";

const { Title } = Typography;

type LoginFormValues = {
  username: string;
  password: string;
};

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Se já estiver logado, ir para /home
  if (user) {
    return <Navigate to="/home" replace />;
  }

  const onFinish = async (values: LoginFormValues) => {
    setSubmitting(true);
    setError(null);
    try {
      await login(values.username, values.password);
      navigate("/home", { replace: true });
    } catch {
      setError("Credenciais inválidas. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const onFinishFailed = () => {
    // opcional: tratar validação do formulário
  };

  return (
    <div style={{ maxWidth: 380, margin: "80px auto", padding: 24 }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
        Login
      </Title>

      {error && (
        <Alert
          type="error"
          message={error}
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ username: "", password: "" }}
        disabled={submitting}
      >
        <Form.Item
          label="Usuário"
          name="username"
          rules={[{ required: true, message: "Informe o usuário" }]}
        >
          <Input placeholder="seu.usuario" autoFocus />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Informe a senha" }]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item style={{ marginTop: 8 }}>
          <Button type="primary" htmlType="submit" block loading={submitting}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
