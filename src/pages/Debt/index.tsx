import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Row, Col, Input, Form, DatePicker, Button, Select } from 'antd';
import moment from 'moment';

import formatValue from '../../utils/formatValue';
import Header from '../../components/Header';
import { api, apiExtern } from '../../services/api';

import {
  Container,
  ContentDebts,
  CardContainer,
  Card,
  ContentForm,
  ContentCreate,
} from './styles';

const { Option } = Select;

interface Debt {
  id: string;
  idUser: number;
  name: string;
  debtReason: string;
  debtDate: Date;
  value: number;
}

interface User {
  id: number;
  name: string;
}

const Debt: React.FC = () => {
  const [form] = Form.useForm();

  const [debts, setDebts] = useState<Debt[]>([]);
  const [users, setUser] = useState<User[]>([]);
  const [idDebt, setDebtId] = useState('');

  const onFinish = async (values: Debt) => {
    if (idDebt.length > 0) {
      const response = await api.put(`/debts/${idDebt}`, values);
      const debtData = response.data;

      const [{ name }] = users.filter(
        (user: User) => user.id === debtData.idUser,
      );

      debtData.name = name;

      const updateData = debts.map(debt => {
        if (debt.id === debtData.id) return debtData;

        return debt;
      });

      setDebts(updateData);
    } else {
      const response = await api.post('/debts', values);
      const debtData = response.data;

      const [{ name }] = users.filter(
        (user: User) => user.id === debtData.idUser,
      );

      debtData.name = name;

      setDebts([...debts, debtData]);
    }

    form.resetFields();
    setDebtId('');
  };

  const editForm = ({ id, idUser, debtDate, debtReason, value }: Debt) => {
    form.setFieldsValue({
      idUser,
      debtReason,
      value,
      debtDate: moment(debtDate),
    });

    setDebtId(id);
  };

  const deleteDebt = () => {
    api.delete(`/debts/${idDebt}`);

    const newDebts = debts.filter(debt => debt.id !== idDebt && debt);

    setDebts(newDebts);
    setDebtId('');
    form.resetFields();
  };

  useEffect(() => {
    async function loadDebt() {
      const response = await api.get('/debts');
      const responseUsers = await apiExtern;

      const debtsData = response.data;
      const usersData = responseUsers.data;

      const debtsFormat = debtsData.map((debt: Debt) => {
        const [{ name }] = usersData.filter(
          (user: User) => user.id === debt.idUser,
        );

        return { ...debt, name };
      });

      setUser(usersData);
      setDebts(debtsFormat);
    }

    loadDebt();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <ContentDebts cardExist={debts.length > 0}>
          <CardContainer>
            {debts.map(debt => (
              <Card key={debt.id}>
                <header>
                  <p>{debt.name}</p>
                  <FaEdit size={25} onClick={() => editForm(debt)} />
                </header>
                <h2>{formatValue(debt.value)}</h2>
              </Card>
            ))}
          </CardContainer>
        </ContentDebts>
        <ContentForm>
          <Form
            layout="vertical"
            form={form}
            autoComplete="off"
            onFinish={onFinish}
          >
            <h1>Cadastro de Dívidas</h1>
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                <Form.Item
                  name="idUser"
                  label="Cliente"
                  rules={[{ required: true, message: 'Selecione um cliente!' }]}
                >
                  <Select
                    placeholder="Selecione um cliente"
                    // onChange={this.onGenderChange}
                    allowClear
                  >
                    {users.map(user => (
                      <Option key={user.id} value={user.id}>
                        {user.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item
                  label="Motivo"
                  name="debtReason"
                  rules={[
                    { required: true, message: 'Insira o motivo da dívida!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={8} xl={4}>
                <Form.Item
                  label="Valor"
                  name="value"
                  rules={[{ required: true, message: 'Insira o valor!' }]}
                >
                  <Input type="number" min={0} step="0.010" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                <Form.Item
                  label="Data"
                  name="debtDate"
                  rules={[{ required: true, message: 'Insira a data!' }]}
                >
                  <DatePicker
                    style={{
                      width: '100%',
                    }}
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={6} lg={4} xl={4}>
                <Form.Item>
                  <Button
                    disabled={!idDebt.length && true}
                    onClick={() => deleteDebt()}
                  >
                    Excluir
                  </Button>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={6} lg={4} xl={4}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {idDebt.length > 0 ? 'Alterar' : 'Salvar'}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ContentForm>
        {/* <ContentCreate>
          <button type="button">Novo</button>
        </ContentCreate> */}
      </Container>
    </>
  );
};

export default Debt;
