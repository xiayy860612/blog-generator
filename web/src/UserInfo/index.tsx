import React from 'react';
import { Card, Button } from 'antd';
import avatar from './avatar.png';
import Meta from 'antd/lib/card/Meta';
import { SearchOutlined, GithubOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';

const UserInfoCard: React.FC = () => {
  const coverElement = <img src={avatar} />
  return (
    <Card 
      cover={coverElement}
      actions={
        [
          <Button type="link" href="http://amos.s2u2m.com:10080" icon={<HomeOutlined translate />} />,
          <Button type="link" href="mailto:xiayy860612@126.com" icon={<MailOutlined translate />} />,
          <Button type="link" href="https://github.com/xiayy860612" target="_blank" icon={<GithubOutlined translate />} />
        ]
      }
    >
      <Meta title="Username" description="hello" />
    </Card>
  );
}

export default UserInfoCard;