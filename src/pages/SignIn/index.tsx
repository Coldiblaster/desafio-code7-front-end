import React from 'react';
import { Form, Input, Button, Col } from 'antd';

import { Container, ContentSignIn } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const onFinish = (values: SignInFormData) => {
    console.log('Success:', values);
  };

  return (
    <Container>
      <ContentSignIn>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
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
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Entrar
            </Button>
            Ou <a href="#/">registrar agora!</a>
          </Form.Item>
        </Form>
      </ContentSignIn>
    </Container>
  );
};

export default SignIn;
