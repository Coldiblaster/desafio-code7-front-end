import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

import Logo from '../../assets/logo-code7.svg';

import { Container, ContentSignUp } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const onFinish = async (data: SignInFormData) => {
    try {
      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu logon!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
      });
    }
  };

  return (
    <Container>
      <ContentSignUp>
        <div className="logo">
          <img src={Logo} alt="desafioCode7" />
        </div>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[
              {
                required: true,
                message: 'Nome obrigatório!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'E-mail obrigatório!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              {
                required: true,
                message: 'No mínimo 6 dígitos!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Cadastrar
            </Button>
          </Form.Item>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Voltar para logon
        </Link>
      </ContentSignUp>
    </Container>
  );
};

export default SignIn;
