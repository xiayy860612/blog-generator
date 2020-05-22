import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

const ShareCommon: React.FC = () => {
  return (
    <Typography style={{textAlign: "center"}}>
      <Paragraph>
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
          <img alt="知识共享许可协议" src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
        </a>
      </Paragraph>
      <Paragraph>
      本作品采用
      <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>进行许可。
      </Paragraph>
    </Typography>
  )
}

export default ShareCommon;