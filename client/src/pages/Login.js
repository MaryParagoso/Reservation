import React from "react";
import { Button, Form, Input, Layout } from "antd";
import {
  design,
  sectionTitle,
  contentStyle,
  headerStyle,
  footerStyle,
  formStyle,
  inputStyle,
  formItem,
  buttonLogin,
  buttonSignup,
  labelStyle,
} from "../stylesheets/mainUI";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function Login() {

  const [error, setError] = React.useState("");

  const onFinish = async (values) => {
      try {
          const response = await fetch(
              "http://localhost:5000/api/users/login",
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
              }
          );

          if (response.ok) {
              console.log("Login successful");
              window.location.href = "/menu";
          } else {
              console.error("Login failed");
              setError(
                  "Login failed. Please check your username and password."
              );
          }
      } catch (error) {
          // Handle network or other errors
          console.error("Error:", error);

          // Example: Display a generic error message
          //  setError("An error occurred. Please try again later.");
      }
  };

  return (
      <div>
          <Layout>
              <Content style={contentStyle}>
                  <div style={design}>
                      <Header style={headerStyle}>
                          Movie Reservation System
                      </Header>
                      <Form
                          style={formStyle}
                          initialValues={{
                              remember: true,
                          }}
                          onFinish={onFinish}
                      >
                          <h1 style={sectionTitle}>Log In to Your Account</h1>
                          <Form.Item
                              style={formItem}
                              label={<span style={labelStyle}>Username</span>}
                              name="username"
                              rules={[
                                  {
                                      required: true,
                                      message: "Please input your username!",
                                  },
                              ]}
                          >
                              <Input size="large" style={inputStyle} />
                          </Form.Item>
                          <Form.Item
                              style={formItem}
                              label={<span style={labelStyle}>Password</span>}
                              name="password"
                              rules={[
                                  {
                                      required: true,
                                      message: "Please input your password!",
                                  },
                              ]}
                          >
                              <Input.Password size="large" style={inputStyle} />
                          </Form.Item>
                          <Form.Item
                              style={{
                                  display: "flex",
                                  justifyContent: "center",
                              }}
                          >
                              <Link to="/registration">
                                  <Button
                                      ghost
                                      size="large"
                                      style={buttonSignup}
                                  >
                                      Sign Up
                                  </Button>
                              </Link>
                              <Button
                                  type="primary"
                                  size="large"
                                  htmlType="submit"
                                  style={buttonLogin}
                              >
                                  Log In
                              </Button>
                          </Form.Item>
                      </Form>
                  </div>
              </Content>
              <Footer style={footerStyle}>
                  Ant Design ©2023 Created by We Bare Bears
              </Footer>
          </Layout>
      </div>
  );
}

export default Login;
