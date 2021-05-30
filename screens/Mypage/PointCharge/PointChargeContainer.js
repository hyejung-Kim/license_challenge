import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../../api";
import styled from "styled-components/native";
import NumericTextInput from "../../../components/NumericTextInput";
import RedButton from "../../../components/RedButton";

export default ({ navigation,loading }) => {
  const [isLoading, setIsLoading] = useState(loading);
  const [userData, setUserData] = useState();
  const [pointData, setPointData] = useState();

  const getMyPoint = async () => {
    const response = await Api.getMyPoint();
    setMyPoint(response.data.point);
  };

  const chargePoint = async () => {
    const response = await Api.getMyPoint();
    if (response.status == 200) {
      setPointData(response.data);
    } else {
      navigation.goback();
    }
  };

  const getData = async () => {
    const response = await Api.getUserInfo();
    if (response.status == 200) {
      setUserData(response.data[0]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="small" color="purple" />
    </View>
  ) : (
    <Container>
      <Content>
        <Title>충전할 금액을 입력해주세요.</Title>
        <RowContent>
          <NumericTextInput
            onChange={(text) => {
              if (text == "" || (0 < parseInt(text))) {
                setPointData(text);
              }
            }}
          />
          <Title>P</Title>
        </RowContent>
        <Notice>* 1000원 단위로 충전 가능합니다.</Notice>
      </Content>

      <PointWrap>
        <RowContent>
          <Text>현재 포인트</Text>
          <Text>{userData.point} P</Text>
        </RowContent>
        <RowContent>

          <Text>충전 후 포인트</Text>
          <Text>{userData.point} P</Text>
        </RowContent>

      </PointWrap>


      <Profile>
        <UserInfo>
          <TextWrap>
            <Text>닉네임</Text>
            <Text>{userData.nickname}</Text>
          </TextWrap>
          <TextWrap>
            <Text>이메일</Text>
            <Text>{userData.email}</Text>
          </TextWrap>
          <TextWrap>
            <Text>전화번호</Text>
            <Text>{userData.phoneNumber}</Text>
          </TextWrap>
          <TextWrap>
            <Text>포인트</Text>
            <Text>{userData.point}</Text>
          </TextWrap>
        </UserInfo>
      </Profile>

      <Footer>
        <RedButton fc={chargePoint} name={"충전하기"} />
      </Footer>
    </Container>
  )
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 20px;
`;

const Content = styled.View`
  margin: 20px 0px;
`;

const RowContent = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #3b1464;
  font-family: "nanumBold";
  margin-bottom: 5px;
`;

const Notice = styled.Text`
  font-size: 16px;
  color: #3b1464;
  font-family: "nanumReguler";
  margin: 5px 5px 0px 0px;
  text-align: right;
`;

const PointWrap = styled.View`
  padding: 20px;
  width: 100%;
  background-color: #f2e7fe;
  align-items: center;
  border-radius: 20px;
`;

const Text = styled.Text`
  font-family: "nanumBold";
  color: #3b1464;
  font-size: 20px;
  margin: 2px;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 0;
  height: 7%;
  width: 100%;
  background-color: white;
  border-top-color: #cacaca;
  border-top-width: 0.2px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Profile = styled.TouchableOpacity`
  width: 100%;
  height: 180px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f2e7fe;
  margin-bottom: 15px;
`;

const UserInfo = styled.View`
  width: 70%;
  align-items: flex-end;
`;

const TextWrap = styled.View`
  width: 80%;
  margin: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

