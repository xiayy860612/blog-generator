import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

const FooterView: React.FC = () => {
  return (
    <Typography>
      <Paragraph>
        Copyright© 2018-2020 <Text strong>s2u2m</Text>
      </Paragraph>
      <Paragraph>
        <a href="http://www.miitbeian.gov.cn/">
          <Text>蜀ICP备18013492号</Text>
        </a>
      </Paragraph>
    </Typography>
  )
}

export default FooterView;