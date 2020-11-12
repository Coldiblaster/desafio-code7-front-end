import React from 'react';
import { Form, Input, Button, Col } from 'antd';

import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import Logo from '../../assets/logo-code7.svg';

import { Container, ContentSignIn } from './styles';

interface SignInFormData {
  email: string;
  password: string;
  name: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const onFinish = async (data: SignInFormData) => {
    try {
      const response: any = await signIn({
        email: data.email,
        password: data.password,
      });

      addToast({
        type: 'success',
        title: 'Login realizado com sucesso',
        description: `Seja bem-vindo(a) ${response.name}.`,
      });

      history.push('/debt');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
      });
    }
  };

  return (
    <Container>
      <ContentSignIn>
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Insira um email!',
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
                message: 'Insira uma senha!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Entrar
            </Button>
            Ou <Link to="/signup">registrar agora!</Link>
          </Form.Item>
        </Form>
      </ContentSignIn>
    </Container>
  );
};

export default SignIn;
