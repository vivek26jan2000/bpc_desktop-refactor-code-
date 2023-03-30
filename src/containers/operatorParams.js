import React, { useEffect, useState } from "react";

import { Form, Input, Button } from "antd";
import { operatorUploadAction } from "../utils/action";

const OperatorParamsScreen = ({ initialValues, onSubmit }) => {
  const [selectedParams, setSelectedParams] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchData = async () => {
    const data = await operatorUploadAction(user.username);
    setSelectedParams(data.data.selectedParameters);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };

  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 20,
    },
  };
  return (
    <div className="pt-5">
      <h2 className="pb-5 text-center">Operator Parameter Config</h2>
      <Form
        onFinish={onFinish}
        {...layout}
        layout="horizontal"
        className="w-3/4">
        {selectedParams.map((item, index) => (
          <Form.Item
            key={index}
            name={["items", index]}
            label={`${item}`}
            rules={[
              {
                required: true,
                message: `Please enter a value for Item ${index + 1}`,
              },
            ]}
            className="min-w-full">
            <Input className="min-w-full rounded-xl pt-2 pb-2" />
          </Form.Item>
        ))}
        <Form.Item
          wrapperCol={{
            offset: 14,
            span: 14,
          }}
          className="min-w-full">
          <Button
            type="primary"
            htmlType="submit"
            className=" text-white hover:bg-green-300 mt-2 uppercase">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OperatorParamsScreen;
