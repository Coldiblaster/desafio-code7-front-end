import React, { useState, useEffect, useCallback } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Row, Col, Input, Form, DatePicker, Button, Select } from 'antd';
import moment from 'moment';

import formatValue from '../../utils/formatValue';
import Header from '../../components/Header';
import { useToast } from '../../hooks/toast';
import { api, apiExtern } from '../../services/api';

import {
  Container,
  ContentDebts,
  CardContainer,
  Card,
  ContentForm,
} from './styles';

const { Option } = Select;

interface Debt {
  id: string;
  idUser: number;
  debtReason: string;
  debtDate: Date;
  value: number;
}

interface UserDebt {
  id: number;
  name: string;
  amount: number;
}

interface User {
  id: number;
  name: string;
}

const Debt: React.FC = () => {
  const [form] = Form.useForm();

  const { addToast } = useToast();

  const [usersDebts, setUsersDebts] = useState<UserDebt[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [users, setUser] = useState<User[]>([]);
  const [debtId, setDebtId] = useState('');
  const [userId, setUserId] = useState(-1);

  const handleInsert = useCallback(
    async (data: Debt) => {
      try {
        const response = await api.post('/debts', data);

        const debtData = response.data;

        const [{ name }] = users.filter(
          (user: User) => user.id === debtData.idUser,
        );

        debtData.name = name;

        setDebts([...debts, debtData]);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description:
            'Você já pode visualizar a dívida no canto esquerdo da tela.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na gravação',
          description:
            'Ocorreu um erro ao tentar efetuar o cadastro, cheque os dados e tente novamente.',
        });
      }
    },
    [debts, users, addToast],
  );

  const handleUpdate = useCallback(
    async (data: Debt) => {
      try {
        const response = await api.put(`/debts/${debtId}`, data);
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
        setDebts([]);
        setUserId(-1);

        addToast({
          type: 'success',
          title: 'Alteração realizado!',
          description:
            'Você já pode visualizar alteração no canto esquerdo da tela.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na alteração',
          description:
            'Ocorreu um erro ao tentar efetuar a alteração, cheque os dados e tente novamente.',
        });
      }
    },
    [debts, users, debtId, addToast],
  );

  const onFinish = async (values: Debt) => {
    if (debtId.length > 0) {
      await handleUpdate(values);
    } else {
      await handleInsert(values);
    }

    form.resetFields();
  };

  const editForm = (id: string) => {
    const [{ debtDate, debtReason, value, idUser }] = debts.filter(
      (debt: Debt) => debt.id === id,
    );

    form.setFieldsValue({
      idUser,
      debtReason,
      value,
      debtDate: moment(debtDate),
    });

    setDebtId(id);
  };

  const deleteDebt = async () => {
    try {
      await api.delete(`/debts/${debtId}`);

      const newDebts = debts.filter(debt => debt.id !== debtId && debt);

      setDebts(newDebts);

      setDebts([]);
      setUserId(-1);

      form.resetFields();

      addToast({
        type: 'success',
        title: 'Exclusão realizado!',
        description: 'Dívida excluida com sucesso',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na exclusão',
        description:
          'Ocorreu um erro ao tentar efetuar a exclusão, cheque os dados e tente novamente.',
      });
    }
  };

  const openDebts = async (idUser: number) => {
    const response = await api.get(`/debts/user/${idUser}`);

    const debtsData = response.data;

    setDebts(debtsData);
    setUserId(idUser);

    addToast({
      type: 'info',
      title: 'Dívida(s) carregada(s) com sucesso!',
      description:
        'Clique no campo de dívidas cadastradas e selecione uma dívida para alteração',
    });

    form.resetFields();
  };

  const resetForm = () => {
    setDebtId('');
    setDebts([]);
    setUserId(-1);
  };

  useEffect(() => {
    async function loadDebt() {
      const response = await api.get('/debts');
      const responseUsers = await apiExtern;

      const debtsData = response.data;
      const usersData = responseUsers.data;

      const usersDebtsData: UserDebt[] = [];

      usersData.forEach(({ id, name }: User) => {
        let amount = 0;

        debtsData.filter((debt: Debt) => {
          if (id === debt.idUser) {
            amount += Number(debt.value);
            return amount;
          }

          return false;
        });

        if (amount > 0) usersDebtsData.push({ amount, id, name });
      });

      setUsersDebts(usersDebtsData);
      setUser(usersData);
    }

    loadDebt();
  }, [debts]);

  return (
    <>
      <Header />
      <Container>
        <ContentDebts cardExist={usersDebts.length > 0}>
          <CardContainer>
            {usersDebts.map(user => (
              <Card key={user.id}>
                <header>
                  <p>{user.name}</p>
                  <FaEdit size={25} onClick={() => openDebts(user.id)} />
                </header>
                <h2>{formatValue(user.amount)}</h2>
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
            {userId >= 0 ? (
              <h1>Alteração de dívida</h1>
            ) : (
              <h1>Cadastro de Dívidas</h1>
            )}

            <Row gutter={[16, 0]}>
              {userId >= 0 && (
                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                  <Form.Item name="valueDebt" label="Dívidas cadastradas">
                    <Select
                      placeholder="Selecione uma dívida"
                      autoFocus
                      onChange={(id: string) => editForm(id)}
                    >
                      {debts.map(user => (
                        <Option key={user.id} value={user.id}>
                          {formatValue(user.value)}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                <Form.Item
                  name="idUser"
                  label="Cliente"
                  rules={[{ required: true, message: 'Selecione um cliente!' }]}
                >
                  <Select placeholder="Selecione um cliente" allowClear>
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

              <Col xs={24} sm={24} md={24} lg={16} xl={6}>
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

              <Col xs={24} sm={8} md={8} lg={4} xl={4}>
                <Form.Item>
                  <Button
                    disabled={!debtId.length && true}
                    onClick={() => deleteDebt()}
                    style={{ background: '#d4616d', color: '#fff' }}
                  >
                    Excluir
                  </Button>
                </Form.Item>
              </Col>

              <Col xs={24} sm={8} md={8} lg={4} xl={4}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {debtId.length > 0 ? 'Alterar' : 'Salvar'}
                  </Button>
                </Form.Item>
              </Col>

              <Col xs={24} sm={8} md={8} lg={4} xl={4}>
                <Form.Item>
                  <Button
                    className="buttonNew"
                    style={{ background: '#28a745', color: '#fff' }}
                    onClick={() => resetForm()}
                  >
                    Novo
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ContentForm>
      </Container>
    </>
  );
};

export default Debt;
