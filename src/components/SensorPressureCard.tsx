import React from "react";
import { Card, Statistic, Space, Typography } from "antd";
import {
  DashboardOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export type PressureCardKind = "current" | "daily" | "weekly";

type SensorPressureCardProps = {
  name: string; // Nome do sensor
  value: number; // Valor numérico
  unit?: string; // Unidade (ex.: "bar")
  kind?: PressureCardKind; // Tipo do card (define ícone/sugestão)
  extra?: React.ReactNode; // Elemento extra (opcional)
};

const kindIconMap: Record<PressureCardKind, React.ReactNode> = {
  current: <DashboardOutlined />,
  daily: <FieldTimeOutlined />,
  weekly: <CalendarOutlined />,
};

export default function SensorPressureCard({
  name,
  value,
  unit = "bar",
  kind = "current",
  extra,
}: SensorPressureCardProps) {
  return (
    <Card
      size="small"
      title={
        <Space size={8}>
          {kindIconMap[kind]}
          <Text strong>{name}</Text>
        </Space>
      }
      extra={extra}
      style={{ width: "100%" }}
    >
      <Statistic
        value={value}
        precision={2}
        suffix={` ${unit}`}
        valueStyle={{ fontWeight: 600 }}
      />
      <Text type="secondary">
        {kind === "current" && "Pressão atual"}
        {kind === "daily" && "Média de pressão diária"}
        {kind === "weekly" && "Média de pressão semanal"}
      </Text>
    </Card>
  );
}
