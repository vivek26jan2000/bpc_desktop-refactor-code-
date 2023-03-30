import { Button, Form, Input } from "antd";
import React, {  useContext } from "react";
import { useNavigate } from "react-router-dom";


import AuthContext from "../store/auth-context";
import { agentConfigAction } from "../utils/action";



const LabManualScreen = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const onFinish = async (val) => {
    const obj = {
      username: val.userName,
      siteID: val.siteId,
      siteName: val.siteName,
      frequency: val.frequency,
      password: val.password,
      databaseIP: val.dpIP,
      databasePort: val.dpPort,
    };

    ctx.setAgentConfig(obj); // set the obj data by calling the handler function

    await agentConfigAction(obj);
    
    navigate("/parameters");
  };
  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 20,
    },
  };
  // const tailLayout = {
  //   wrapperCol: {
  //     offset: 8,
  //     span: 16,
  //   },
  // };
  return (
    <div className="pt-5">
      <h2 className="pb-5 text-center">Agent Configuration</h2>
      <Form
        {...layout}
        name="agentConfig"
        layout="horizontal"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-3/4">
        <Form.Item
          name="siteName"
          label="Site Name"
          rules={[
            {
              required: true,
              message: "Please input Site Name!",
            },
          ]}
          className="min-w-full">
          <Input
            placeholder="Enter Site Name"
            className="min-w-full rounded-xl pt-2 pb-2"
          />
        </Form.Item>
        <Form.Item
          name="siteId"
          label="Site Id"
          rules={[
            {
              required: true,
              message: "Please input Site Id!",
            },
          ]}
          className="min-w-full">
          <Input
            placeholder="Enter Site Id"
            className="min-w-full rounded-xl pt-2 pb-2"
          />
        </Form.Item>
        <Form.Item
          name="frequency"
          label="Frequency"
          rules={[
            {
              required: true,
              message: "Please input Frequency!",
            },
          ]}
          className="min-w-full">
          <Input
            placeholder="Enter Frequency"
            className="min-w-full rounded-xl pt-2 pb-2"
          />
        </Form.Item>
        <Form.Item
          name="userName"
          label="User Name"
          rules={[
            {
              required: true,
              message: "Please input User Name!",
            },
          ]}
          className="min-w-full">
          <Input
            placeholder="Enter User Name"
            className="min-w-full rounded-xl pt-2 pb-2"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input password!",
            },
          ]}>
          <Input.Password
            placeholder="Password"
            className="min-w-full rounded-xl pt-2 pb-2"
          />
        </Form.Item>
        <Form.Item
          name="dbIP"
          label="Database IP"
          rules={[
            {
              required: true,
              message: "Please input Database IP!",
            },
          ]}
          className="min-w-full">
          <Input
            placeholder="Enter database IP"
            className="min-w-full rounded-xl pt-2 pb-2"
          />
        </Form.Item>
        <Form.Item
          name="dbPort"
          label="Database Port"
          rules={[
            {
              required: true,
              message: "Please input Database Port!",
            },
          ]}
          className="min-w-full">
          <Input
            placeholder="Enter Database Port"
            className="min-w-full rounded-xl pt-2 pb-2"
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 16,
            span: 16,
          }}>
          <Button
            type="primary"
            className=" text-white hover:bg-green-300 mt-2 uppercase"
            htmlType="submit"
            style={{
              backgroundColor: "#2E3D55",
              paddingTop: 6,
            }}>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LabManualScreen;
