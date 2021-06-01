import React from 'react';
import IMP from 'iamport-react-native';

//import Loading from '../Loading';

export default ({ navigation, route }) => {
  const { params } = route.params;
  console.log("parmas",params);
  console.log("params2222:", params);
  console.log("pg:", params.pg);
  const { pg } = params;
  // const data = {
  //   ...params,
  //   app_scheme: 'expba40064ef55f4312b9da861780a9b781',
  // };

  //console.log("data:", params.pg);
  
  return (
    <IMP.Payment
      userCode={getUserCode(pg)}
    //  loading={<Loading />}
      data={params}
      callback={response => navigation.replace('PaymentResult', { response, amount:params.amount })}
    />
  );   
}


export function getUserCode(pg) {
  return 'imp09408477';
}
