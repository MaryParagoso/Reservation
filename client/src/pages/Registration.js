import React, { useState } from "react";
import { Button, Form, Input, Layout } from "antd";
import {
  sectionTitle,
  headerStyle,
  contentStyle,
  footerStyle,
  formStyle,
  inputStyle,
  formItem,
  buttonStyle,
  buttonLoginR,
  buttonSignupR,
} from "../stylesheets/mainUI";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function Registration() {
  
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
      try {
          const response = await fetch(
              "http://localhost:5000/api/users/signup",
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
              }
          );

          if (response.ok) {
              console.log("Signup successful");
              window.location.href = "/login";
          } else {
              const data = await response.json();
              setError(data.message || "Signup failed");
          }
      } catch (error) {
          console.error("Error:", error);
      }
  };

  return (
      <div>
          <Layout>
              <Header style={headerStyle}>Movie Reservation System</Header>
              <Content style={contentStyle}>
                  <Form
                      style={formStyle}
                      initialValues={{
                          remember: true,
                      }}
                      onFinish={onFinish}
                  >
                      <h1 style={sectionTitle}>Create Your Account</h1>
                      <Form.Item
                          style={formItem}
                          label="Valid Email"
                          name="email"
                          rules={[
                              {
                                  required: true,
                                  message: "Please input your Email Address!",
                              },
                          ]}
                      >
                          <Input size="large" style={inputStyle} />
                      </Form.Item>
                      <Form.Item
                          style={formItem}
                          label="Username"
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
                          label="Password"
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
                          style={formItem}
                          label="Confirm Password"
                          name="confirmPassword"
                          rules={[
                              {
                                  required: true,
                                  message: "Please input your password!",
                              },
                          ]}
                      >
                          <Input.Password size="large" style={inputStyle} />
                      </Form.Item>
                      <Form.Item style={buttonStyle}>
                          <Link to="/login">
                              <Button ghost size="large" style={buttonLoginR}>
                                  Log In
                              </Button>
                          </Link>
                          <Button
                              type="primary"
                              size="large"
                              htmlType="submit"
                              style={buttonSignupR}
                          >
                              Sign Up
                          </Button>
                      </Form.Item>
                  </Form>
              </Content>
              <Footer style={footerStyle}>Created by We Bare Bears.</Footer>
          </Layout>
      </div>
  );
}

export default Registration;
