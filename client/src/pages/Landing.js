import React from "react";
import { Layout, Breadcrumb, Button } from "antd";
import {
  contentStyle,
  centerContent,
  Context1,
  Context2,
  breadcrumbStyle,
  buttonLogin,
  buttonSignup,
} from "../stylesheets/layout";
import { Link } from "react-router-dom";

const { Content } = Layout;

function Landing() {
  return (
      <div>
          <Layout>
              <Content style={contentStyle}>
                  <Breadcrumb style={breadcrumbStyle}>
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item>List</Breadcrumb.Item>
                      <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
                  <div style={centerContent}>
                      <h1 style={Context1}>Welcome to Our Website</h1>
                      <p style={Context2}>Explore amazing content and more!!</p>
                      <div>
                          <Link to="/login">
                              <Button
                                  ghost
                                  size="large"
                                  style={buttonLogin}
                                  as={Link}
                                  to="/login"
                              >
                                  Log In
                              </Button>
                          </Link>
                          <Link to="/registration">
                              <Button
                                  type="primary"
                                  size="large"
                                  htmlType="submit"
                                  style={buttonSignup}
                                  as={Link}
                                  to="/registration"
                              >
                                  Sign Up
                              </Button>
                          </Link>
                      </div>
                  </div>
              </Content>
          </Layout>
      </div>
  );
}

export default Landing;
