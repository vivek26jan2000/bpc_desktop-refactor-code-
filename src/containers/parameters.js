import { Button, Checkbox, message } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

import "../styles/login.css";
import {
  selectedParametersAction,
  siteModuleParamAction,
} from "../utils/action";

const CheckboxGroup = Checkbox.Group;
const ParametersScreen = () => {
  const navigate = useNavigate();

  const [checkedList, setCheckedList] = useState([]);
  const [data, setData] = useState([]);
  const [selectedParams, setSelectedParams] = useState([]);

  const ctx = useContext(AuthContext);
  // access the obj data
  const agentConfig = ctx.agentConfig;

  // fetch data(parametrts) from sitemoduleparam database
  useEffect(() => {
    const fetchData = async () => {
      const response = await siteModuleParamAction(ctx.agentConfig.siteID);
      setData(response.data.parameterColumns);
    };

    fetchData();
  }, []);

  const checkboxData = data.map((el, i) => {
    return {
      id: i,
      label: el,
    };
  });

  const handleCheckboxChange = (checkedValues) => {
    setCheckedList(checkedValues);
  };

  const saveAgentConfigParameter = () => {
    const selectedInputParams = data.filter((el, i) => checkedList.includes(i));
    setSelectedParams(selectedInputParams);
    return selectedInputParams;
  };

  // save selected Parameters into selectedparameter database
  useEffect(() => {
    const obj = {
      username: agentConfig.username,
      password: agentConfig.password,
      selectedParams,
    };
    const postData = async () => {
      await selectedParametersAction(obj);
    };
    try {
      if (obj.selectedParams.length > 0) postData();
    } catch (error) {
      console.error("Error saving selected parameters:", error);
      // handle error here (e.g. display an error message to the user)
    }
  }, [selectedParams, agentConfig]);

  const handleSaveClick = () => {
    const selectedInputParams = saveAgentConfigParameter();
    if (selectedInputParams.length > 0) {
      message.success("Save AgentConfig Parameter Successfully!");
      setTimeout(() => {
        navigate("/labManual");
      }, 1000);
    } else {
      message.warning("Please select at least one parameter");
    }
  };

  return (
    <div className="pt-5">
      <h2 className="pb-5 text-center">Parameters Configuration</h2>
      <CheckboxGroup
        className="checkbox-container"
        options={checkboxData.map((option) => ({
          label: option.label,
          value: option.id,
        }))}
        value={checkedList}
        onChange={handleCheckboxChange}
      />
      <div className="flex flex-row items-center justify-center pt-5">
        <Button
          onClick={() => navigate("/labManual")}
          type="primary"
          className=" text-white hover:bg-green-300 mt-2 uppercase"
          style={{
            backgroundColor: "#2E3D55",
            paddingTop: 6,
            marginRight: 10,
          }}>
          Back
        </Button>
        <Button
          onClick={handleSaveClick}
          type="primary"
          className=" text-white hover:bg-green-300 mt-2 uppercase"
          style={{ backgroundColor: "#2E3D55", paddingTop: 6 }}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default ParametersScreen;
